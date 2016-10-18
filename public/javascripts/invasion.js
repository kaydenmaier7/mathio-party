$(document).ready(function(){
  loadGame();
})

// add game window to page
var loadGame = function(){
  $('#invasion').html('');
  game = new Phaser.Game(1000, 600, Phaser.AUTO, 'invasion', {preload: preload, create: create, update: update});
};

// declare static assets
var assets = [
  ["background", "/assets/invasion/farm.png"],
  ['cow', '/assets/invasion/cow.png'],
  ['ufo1', '/assets/invasion/ufo1.png'],
  ['ufo2', '/assets/invasion/ufo2.png'],
  ['beam', '/assets/invasion/beam.png']
];

// declare all object types
var cow, players;

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

  // add physics engine
  game.physics.startSystem(Phaser.Physics.ARCADE);

  // create cow group
  cow = game.add.group();
  spawnCow(Math.random()*(game.width - 100) , Math.random()*(game.height/2) + game.height* 0.3);

  // Player 1
  players = game.add.group();
  players.enableBody = true;
  createPlayer1(400, 10, 'ufo1');
  createPlayer2(200, 10, 'ufo2');

  //keyboard input
  keyboardInput = game.input.keyboard.createCursorKeys();
  one = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
  three = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
};

function update(){
  playerUpdate();
};

// create a cow
function spawnCow(x, y){
  var newCow = cow.create(x, y, 'cow');
  newCow.value = Math.floor( Math.random() * 11 );
};

function createPlayer1(x, y, id){
  var player = players.create(x, y, id);
  player.player_id = id;
}

function createPlayer2(x, y, id){
  var player = players.create(x, y, id);
  player.player_id = id;
}

function playerUpdate(){
  players.forEach(function(p){
    if (p.player_id === 'ufo1'){
      p.body.velocity.x = 0;
      if(keyboardInput.left.isDown){
        p.body.velocity.x = -200*p.alpha;
      }else if(keyboardInput.right.isDown){
        p.body.velocity.x = 200*p.alpha;
      };
    };
    if (p.player_id === 'ufo2'){
      p.body.velocity.x = 0;
      if(one.isDown){
        p.body.velocity.x = -200*p.alpha;
      }else if(three.isDown){
        p.body.velocity.x = 200*p.alpha;
      };
    };
  });
};
