var player;
var platforms;
var cursors;
var spaceKey;

var game = new Phaser.Game(700, 300, Phaser.AUTO, 'game');
game.state.add('init', initState);
game.state.add('main', mainState);
game.state.add('intro', introState);
game.state.add('over', overState);