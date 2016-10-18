$(document).ready(function(){
  loadGame();
})


var loadGame = function(){
  $('#invasion').html('')
  game = new Phaser.Game(1000, 600, Phaser.AUTO, 'invasion', {preload: preload, create: create});
}

function preload() {
  game.load.image("background", "/assets/invasion/farm.png");
  game.load.image('cow', '/assets/invasion/cow.png');
  game.load.image('ufo1', '/assets/invasion/ufo1.png');
  game.load.image('ufo2', '/assets/invasion/ufo2.png');
  game.load.image('beam', '/assets/invasion/beam.png');
}

function create(){
    game.add.tileSprite(0, 0, 1000, 600, 'background');
    game.physics.startSystem(Phaser.Physics.ARCADE);
}

