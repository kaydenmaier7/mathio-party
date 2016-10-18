$(document).ready(function(){
  loadGame();
})

// add game window to page
var loadGame = function(){
  $('#invasion').html('');
  game = new Phaser.Game(1000, 600, Phaser.AUTO, 'invasion', {preload: preload, create: create});
};

// declare static assets
var assets = [
  ["background", "/assets/invasion/farm.png"],
  ['cow', '/assets/invasion/cow.png'],
  ['ufo1', '/assets/invasion/ufo1.png'],
  ['ufo2', '/assets/invasion/ufo2.png'],
  ['beam', '/assets/invasion/beam.png']
];

// load static assets
function preload() {
  assets.forEach(function(asset){
    var name = asset[0];
    var location = asset[1];
    game.load.image(name, location);
  });
};

// add background to the game
function create(){
    game.add.tileSprite(0, 0, 1000, 600, 'background');
};
