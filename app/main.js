var mainState = {
    preload: function() {
        game.load.image('city-light', 'assets/city-light.png');
        game.load.image('city-dark', 'assets/city-dark.png');
        game.load.image('front', 'assets/front.png');
        game.load.image('particle', 'assets/pixel.png');
        game.load.audio('jump', 'assets/jump.wav');
        game.load.audio('attack', 'assets/attack.mp3');
        game.load.audio('task', 'assets/task.mp3');
        game.load.audio('task-burned', 'assets/task_burned.mp3');
        game.load.spritesheet('ground', 'assets/platform.png', 1000, 1000);
        game.load.spritesheet('ninja', 'assets/ninja.png', 72, 72);
        game.load.spritesheet('attack', 'assets/attack.png', 24, 24);
        game.load.spritesheet('task1', 'assets/task1.png', 45, 15);
        game.load.spritesheet('task2', 'assets/task2.png', 60, 15);
        game.load.spritesheet('task3', 'assets/task3.png', 90, 15);
    },

    // #d9e0e3

    create: function() {
        var self = this;
        game.stage.backgroundColor = '#fafafa';

        game.physics.startSystem(Phaser.Physics.ARCADE);

        // var graphics = game.add.graphics(0, 0);
        // graphics.moveTo(0,290);
        // graphics.lineStyle(20, 0x33FF00);
        // graphics.lineTo(700, 290);


        spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this);

        enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        enterKey.onDown.add(this.fire, this);

        this.front = game.add.group();
        this.bgCityDark = game.add.group();
        this.bgCityLight = game.add.group();
        this.timer = game.time.events.loop(3000, this.addRowOfPipes, this);

        this.score = 0;
        this.labelScore = game.add.text(20, 20, "0", { font: "60px Proggy", fill: "#999999" });

        this.jumpSound = game.add.audio('jump');
        this.attackSound = game.add.audio('attack');
        this.taskSound = game.add.audio('task');
        this.taskSoundBurned = game.add.audio('task-burned');

        this.attacks = game.add.group();

        platforms = game.add.group();
        platforms.enableBody = true;

        this.ground = platforms.create(0, game.world.height - 10, 'ground');
        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        this.ground.scale.setTo(10, 2);
        //  This stops it from falling away when you jump on it
        this.ground.body.immovable = true;





        this.ninja = game.add.sprite(150, 72, 'ninja');
        this.ninja.anchor.setTo(0.5, 0.5);
        game.physics.arcade.enable(this.ninja);
        this.ninja.body.bounce.y = .3;
        this.ninja.body.gravity.y = 1000;

        this.ninja.body.collideWorldBounds = true;
        this.ninja.animations.add('right', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
        this.ninja.animations.play('right');

        this.jumpCount = 0;
        this.isJumped = false;




        this.bullets = game.add.group();
        this.weapon = game.add.weapon(1, 'attack');
        game.physics.arcade.enable(this.weapon);
        this.weapon.onFire.add(function (bullet) {
            self.attackSound.play();
            self.bullets.add(bullet);
        }, this);
        this.weapon.fireRate = 1;
        this.weapon.autoExpandBulletsGroup = true;
        this.weapon.bulletSpeed = 500;
        this.weapon.bulletAngleOffset = 180;
        this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        this.weapon.trackSprite(this.ninja, 0, 0, true);
        this.weapon.addBulletAnimation('spin', [0, 1, 2, 3], 10, true);


        this.tasks = game.add.group();
        this.tasks.enableBody = true;
        this.taskTimer = game.time.events.loop(1500, this.addTasks, this);

        this.taskVelocity = -200;
        this.gameSpeed = 1;

        this.particlesTimer = game.time.events.loop(300, this.addParticles, this);
        // this.frontTimer = game.time.events.loop(2000, this.addFrontBg, this);
    },

    update: function() {
        var self = this;
        game.physics.arcade.collide(this.ninja, platforms);
        game.physics.arcade.collide(platforms, this.attacks);
        game.physics.arcade.overlap(this.bullets, this.tasks, this.destroyTask, null, this);

        // game.physics.arcade.overlap(this.ninja, this.pipes, this.restartGame, null, this);

        if (this.ninja.body.touching.down) {
            this.jumpCount = 0;
            this.isJumped = false;
        }

        game.physics.arcade.overlap(this.ninja, this.bgCityLight, this.hitPipe, null, this);

        if (this.isJumped) {
            this.ninja.animations.sprite.frame = 1;
        }
        else {
            this.ninja.animations.play('right');
        }

        this.tasks.children.forEach(function (e, i) {
            if (e.exists && e.isDestroyable && !e.isDestroyed) {
                if (e.x < 150) {
                    e.isDestroyable = false;
                    e.animations.sprite.animations.add('hide', [10, 11, 12, 13, 14, 15], 10, false);
                    e.animations.sprite.animations.play('hide', 10, false);
                    //e.animations.sprite.animations.sprite.frame = 15;
                    self.updateScore(-1);
                    self.taskSoundBurned.play();
                }
            }
        });

        if (this.score == 5) {
            this.taskTimer.delay = 800;
        }

        if (this.score == 10) {
            this.taskTimer.delay = 500;
        }

        if (this.score == 15) {
            this.taskTimer.delay = 400;
            this.taskVelocity = -500;
            this.gameSpeed = 7;
        }

        if (this.score == 30) {
            this.taskTimer.delay = 300;
            this.taskVelocity = -800;
            this.gameSpeed = 9;
        }
    },

    addParticles: function () {
        var particles = game.add.sprite(700, this.getRandomInt(50, 299), 'particle');
        this.front.add(particles);
        game.physics.arcade.enable(particles);
        particles.body.velocity.x = -600;
        particles.checkWorldBounds = true;
        particles.outOfBoundsKill = true;
    },

    addFrontBg: function () {
        var frontBg = game.add.sprite(700, 245, 'front');
        this.front.add(frontBg);
        game.physics.arcade.enable(frontBg);
        frontBg.body.velocity.x = -250;
        frontBg.checkWorldBounds = true;
        frontBg.outOfBoundsKill = true;
    },

    destroyTask: function(a, b) {
        var self = this;
        if (!b.isDestroyed && b.isDestroyable) {
            b.isDestroyed = true;
            this.updateScore(1);
            b.animations.sprite.animations.add('hide', [1, 2, 3, 4, 5, 6, 7, 8, 9], 10, false);
            b.animations.sprite.animations.play('hide', 10 * this.gameSpeed, false, true);
            self.taskSound.play();
        }
    },

    jump: function() {
        if (this.jumpCount <= 1) {
            this.ninja.body.velocity.y = -480;
            //var animation = game.add.tween(this.ninja);
            //animation.to({angle: -20}, 100);
            //animation.start();
            if (this.ninja.alive == false) {
                return;
            }
            this.jumpSound.play();
            this.jumpCount++;
            this.isJumped = true;
        }
    },

    fire: function() {
        this.weapon.fire();

        //weapon.body.velocity.x = 500;
        //weapon.checkWorldBounds = true;
        //weapon.outOfBoundsKill = true;

        //weapon.animations.play('spin');
    },

    restartGame: function() {
        game.state.start('main');
    },

    addOnePipe: function() {
        var cityLight = game.add.sprite(700, 100, 'city-light');
        var cityDark = game.add.sprite(700, 150, 'city-dark');
        this.bgCityLight.add(cityLight);
        game.physics.arcade.enable(cityLight);
        cityLight.body.velocity.x = -100;
        cityLight.checkWorldBounds = true;
        cityLight.outOfBoundsKill = true;
        this.bgCityDark.add(cityDark);
        game.physics.arcade.enable(cityDark);
        cityDark.body.velocity.x = -50;
        cityDark.checkWorldBounds = true;
        cityDark.outOfBoundsKill = true;
    },

    addRowOfPipes: function() {
        this.addOnePipe();
    },

    getRandomInt: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },

    addTasks: function() {
        var task = game.add.sprite(700, this.getRandomInt(50, 250), 'task' + this.getRandomInt(1, 3));
        this.tasks.add(task);
        game.physics.arcade.enable(task);
        task.body.velocity.x = this.taskVelocity;
        task.checkWorldBounds = true;
        task.outOfBoundsKill = true;
        task.isDestroyable = true;
    },

    updateScore: function (val) {
        this.score = this.score + parseInt(val);
        if (this.score < 0) {
            this.gameOver();
        }
        this.labelScore.text = this.score;
    },

    gameOver: function () {
        game.state.start('over');
    }

};