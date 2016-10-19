$(document).ready(function(){
  loadGame();
})

// declare all object types
var cow, players, beams, question1, question2, answer1, answer2;

// cow movement parameters
var cowValues = [];
var questions = [];
var startingCows = 4;
var timer = 0;
setInterval(function(){ timer = timer + 1 }, 1000);
var cowSpeedOptions = [100, -100, 150, -150];
var cowMovementIntervals = [2, 3, 4];
function setCowSpeed(){
  cow.forEach(function(c){ c.speed = cowSpeedOptions[Math.floor(Math.random()*cowSpeedOptions.length)] })
}
setInterval(setCowSpeed, 1000);

// locations
var player1Location, player2Location, beamPosition;

// declare static assets
var assets = [
  ["background", "/images/invasion/farm.png"],
  ['cow', '/images/invasion/cow.png'],
  ['ufo1', '/images/invasion/ufo1.png'],
  ['ufo2', '/images/invasion/ufo2.png'],
  ['beam', '/images/invasion/beam.png']
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

  // make the two starting equations
  generateEquation();
  generateEquation();

  // make question1 and question2
  assignQuestion1();
  assignQuestion2();

  // display question1 and question2
  displayEquations();

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
  removeBeams();
  playerMovement();
  playerBeam();
  moveCow();
  removeCow();

  game.physics.arcade.overlap(players, cow, playerCowCollision, null, this);
};

// create a cow
function spawnCow(x, y){
  var newCow = cow.create(x, y, 'cow');
  newCow.value = Math.floor( Math.random() * 11 );
  newCow.speed = cowSpeedOptions[Math.floor(Math.random()*cowSpeedOptions.length)];
  newCow.interval = cowMovementIntervals[Math.floor(Math.random()*cowMovementIntervals.length)];
  newCow.body.collideWorldBounds = true;
  newCow.area = newCow.getBounds();
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

function removeBeams(){
  beams.forEach(function(b){
    if (b){
      b.kill();
      b.destroy();
      beamPosition = null;
    }
  });
};

function shootBeam(x, id){
  if (id === 'ufo1'){
    var beam = beams.create(x - 39, 120, 'beam');
  } else if (id === 'ufo2'){
    var beam = beams.create(x -11, 145, 'beam');
  };
  beam.alpha = 0.4;
  beamPosition = x;
};

// move cow horizontally at intervals
function moveCow(){
  cow.forEach(function(c){
    c.body.velocity.x = 0;
    // move cow vertically if hit with a beam
    if (beamPosition &&
      beamPosition < c.position.x &&
      c.position.x < (beamPosition + 100) ){
        c.body.velocity.y = -200;
    } else if (timer % c.interval == 0) {
      c.body.velocity.x = c.speed;
      c.area = c.getBounds();
    };
  });
};

function removeCow() {
  cow.forEach(function(c){
    if (c.position.y < 50){

      c.kill();
      c.destroy();
      setTimeout(function(){spawnCow(Math.random()*(game.width - 100) , Math.random()*(game.height/2) + game.height* 0.3)}, 2500);
    };
  });
};

// make an equation which solves to a cow value
function generateEquation(){
  cowValues = []
  cow.forEach(function(c){
    cowValues.push(c.value);
  });
  var answer = cowValues[Math.floor(Math.random()*cowValues.length)];
  var invalid = true;
  // ensure that y is a positive number
  while(invalid){
    var x = Math.floor(Math.random() * 5);
    var y = answer - x;
    if (y >= 0) {
      invalid = false;
    };
  };
  // save the answers
  var answers = x + y;
  // add the question data to the questions array
  questions.push([x, y, answer]);
};

function displayEquations(){
  $('body').append('<div class="p1 equation"></div>');
  $('body').append('<div class="p2 equation"></div>');
  $('.p1').append('<p>' + question1 + '</p>');
  $('.p2').append('<p>' + question2 + '</p>');
};

function playerCowCollision(){
  console.log('collision');
};

function assignQuestion1(){
  question1 = questions[0][0] + " + " + questions[0][1]
  answer1 = questions[0][2]
};

function assignQuestion2(){
  question2 = questions[1][0] + " + " + questions[1][1]
  answer2 = questions[1][2]
};
