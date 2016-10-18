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

// make an array to track current cows
var herd = [];
var cow, player1, player2;

// load static assets
function preload() {
  assets.forEach(function(asset){
    var name = asset[0];
    var location = asset[1];
    game.load.image(name, location);
  });
};

function create(){
  // add background to the game
  game.add.tileSprite(0, 0, 1000, 600, 'background');

  // create cow group
  cow = game.add.group();
  spawnCow(Math.random()*(game.width - 100) , Math.random()*(game.height/2) + game.height* 0.3);

  // Player 1
  player1 = game.add.group();
  createPlayer1(400, 10, 'ufo1');

  // Player 2
  player2 = game.add.group();
  createPlayer2(200, 10, 'ufo2');
};

// create a cow
function spawnCow(x, y){
  var value = Math.floor( Math.random() * 11 )
  cow.create(x, y, 'cow', value)
};

function createPlayer1(x, y, id){
  var player = player1.create(x, y, id);
  player.player_id = id;
}

function createPlayer2(x, y, id){
  var player = player2.create(x, y, id);
  player.player_id = id;
}
