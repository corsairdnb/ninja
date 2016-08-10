var initState = {
    preload: function() {
        game.load.image('city-light', 'assets/city-light.png');
        game.load.spritesheet('ninja', 'assets/ninja-static.png', 72, 72);
        game.load.image('particle', 'assets/pixel.png');
    },

    create: function () {
        game.stage.backgroundColor = '#fafafa';

        this.particlesTimer = game.time.events.loop(100, this.addParticles, this);

        var enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        enter.onDown.add(this.start, this);

        var cityFront = game.add.sprite(150, 100, 'city-light');
        var cityFront2 = game.add.sprite(0, 100, 'city-light');
        game.physics.arcade.enable(cityFront);
        game.physics.arcade.enable(cityFront2);

        this.ninja = game.add.sprite(50, 223, 'ninja');
        this.ninja.animations.add('static', [0,0,0,0,0,0,0,1], 3, true);
        this.ninja.animations.play('static');

        this.title = game.add.text(50, 30, "Hey! It seems to be you are offline!", {
            font: "30px Arial",
            fill: "#000000",
            fontWeight: 300,
            align: 'center'
        });

        this.title = game.add.text(50, 80, "Wanna create tasks or maybe to play? :)", {
            font: "18px Arial",
            fill: "#000000",
            fontWeight: 400,
            align: 'center'
        });
    },

    start: function () {
        game.state.start('intro');
    },

    addParticles: function () {
        var particles = game.add.sprite(700, this.getRandomInt(50, 250), 'particle');
        game.physics.arcade.enable(particles);
        particles.body.velocity.x = -300;
        particles.checkWorldBounds = true;
        particles.outOfBoundsKill = true;
    },

    getRandomInt: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
};