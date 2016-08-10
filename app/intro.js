var introState = {
    preload: function() {
        game.load.image('intro', 'assets/intro.png');
    },

    create: function () {
        game.stage.backgroundColor = '#fafafa';

        var enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        enter.onDown.add(this.start, this);

        var introText = game.add.sprite(50, 100, 'intro');

        // this.updated = false;
    },

    // update: function () {
    //     if (!this.updated) {
    //
    //         this.updated = true;

            // setTimeout(function () {
            //     this.title = game.add.text(53, 70, "Productivity Ninja", {
            //         font: "60px Wasted",
            //         fill: "#000000",
            //         shadowStroke: 3,
            //         shadowColor: '#00a651',
            //         shadowFill: true,
            //         shadowOffsetX: 3,
            //         shadowOffsetY: 3
            //     });
            //
            //     this.subtitle = game.add.text(230, 160, "Press ENTER to start", {
            //         font: "32px Proggy",
            //         fill: "#000000",
            //         //shadowStroke: 1,
            //         //shadowColor: '#00a651',
            //         //shadowFill: true,
            //         //shadowOffsetX: 1,
            //         //shadowOffsetY: 1
            //     });
            // }, 3000);
    //     }
    // },

    start: function () {
        document.body.classList.add('game-started');
        game.state.start('main');
    }

    // update: function () {
    //     if (this.cursors.up.isDown) {
    //         game.state.start('main');
    //     }
    // }
};