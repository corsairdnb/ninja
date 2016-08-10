var overState = {
    preload: function() {
        game.load.image('gameover', 'assets/gameover.png');
    },
    create: function() {

        var enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        enter.onDown.add(this.start, this);

        var gameOverText = game.add.sprite(150, 100, 'gameover');

        // this.labelScore = game.add.text(150, 90, "Game Over", {
        //     font: "60px Wasted",
        //     fill: "#000000",
        //     shadowStroke: 3,
        //     shadowColor: '#00a651',
        //     shadowFill: true,
        //     shadowOffsetX: 3,
        //     shadowOffsetY: 3
        // });
        //
        // this.subtitle = game.add.text(220, 170, "Press ENTER to restart", {
        //     font: "32px Proggy",
        //     fill: "#000000",
        //     //shadowStroke: 1,
        //     //shadowColor: '#00a651',
        //     //shadowFill: true,
        //     //shadowOffsetX: 1,
        //     //shadowOffsetY: 1
        // });
    },

    start: function () {
        document.body.classList.add('game-started');
        game.state.start('main');
    }
};