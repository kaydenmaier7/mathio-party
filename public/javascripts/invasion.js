$(document).ready(function(){
  loadGame();
})

// declare all object types
var cow, players, beams;

// cow movement parameters
var startingCows = 4;
var timer = 0;
setInterval(function(){ timer = timer + 1 }, 1000);
var cowSpeedOptions = [100, -100, 150, -150];
var cowMovementIntervals = [2, 3, 4];
function setCowSpeed(){
  cow.forEach(function(c){ c.speed = cowSpeedOptions[Math.floor(Math.random()*cowSpeedOptions.length)] })
}
setInterval(setCowSpeed, 1000);

// declare static assets
var assets = [
  ["background", "/assets/invasion/farm.png"],
  ['cow', '/assets/invasion/cow.png'],
  ['ufo1', '/assets/invasion/ufo1.png'],
  ['ufo2', '/assets/invasion/ufo2.png'],
  ['beam', '/assets/invasion/beam.png']
];

// add game window to page
var loadGame = function(){
  $('#invasion').html('');
  game = new Phaser.Game(1000, 600, Phaser.AUTO, 'invasion', {preload: preload, create: create, update: update});
};

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
  cow.enableBody = true;
  // spawn starting cows
  for (var i = 0; i < startingCows; i++){
    spawnCow(Math.random()*(game.width - 100) , Math.random()*(game.height/2) + game.height* 0.3);
  }

  // create the players
  players = game.add.group();
  players.enableBody = true;
  createPlayer1(400, 10, 'ufo1');
  createPlayer2(200, 10, 'ufo2');

  // add beams group
  beams = game.add.group();

  //keyboard input
  keyboardInput = game.input.keyboard.createCursorKeys();
  one = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
  two = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
  three = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
};

function update(){
  playerMovement();
  playerBeam();
  moveCow();
};

// create a cow
function spawnCow(x, y){
  var newCow = cow.create(x, y, 'cow');
  newCow.value = Math.floor( Math.random() * 11 );
  newCow.speed = cowSpeedOptions[Math.floor(Math.random()*cowSpeedOptions.length)];
  newCow.interval = cowMovementIntervals[Math.floor(Math.random()*cowMovementIntervals.length)];
  newCow.body.collideWorldBounds = true;
};

function createPlayer1(x, y, id){
  var player = players.create(x, y, id);
  player.player_id = id;
}

function createPlayer2(x, y, id){
  var player = players.create(x, y, id);
  player.player_id = id;
}

function playerMovement(){
  players.forEach(function(p){
    if (p.player_id === 'ufo1'){
      p.body.velocity.x = 0;
      if(keyboardInput.left.isDown){
        p.body.velocity.x = -200;
      }else if(keyboardInput.right.isDown){
        p.body.velocity.x = 200;
      };
    };
    if (p.player_id === 'ufo2'){
      p.body.velocity.x = 0;
      if(one.isDown){
        p.body.velocity.x = -200;
      }else if(three.isDown){
        p.body.velocity.x = 200;
      };
    };
  });
};

function playerBeam(){
  players.forEach(function(p){
    if (p.player_id === 'ufo1'){
      if(keyboardInput.down.isDown){
        shootBeam(p.position.x, p.player_id)
      }
    };
    if (p.player_id === 'ufo2'){
      if(two.isDown){
        shootBeam(p.position.x, p.player_id)
      }
    };
  });
};

function shootBeam(x, id){
  if (id === 'ufo1'){
    beams.create(x - 15, 120, 'beam');
  } else if (id === 'ufo2'){
    beams.create(x + 10, 150, 'beam');
  };
};

function moveCow(){
  cow.forEach(function(c){
    c.body.velocity.x = 0;
    if (timer % c.interval == 0) {
      c.body.velocity.x = c.speed;
    };
  });
};
