$(document).ready(function(){
  window.setInterval(function(){
    updateEquationText();
  }, 200);
})

var updateEquationText = function(){
  if (!gameIsOver){
  $('#equation_text_div').html(current_equation.problem)
  }
}

var game = new Phaser.Game(1000, 600, Phaser.AUTO, 'frogger', { preload: preload, create: create, update: update });

var cursors;
var one;
var two;
var three;
var four;
var questionTimer;
var gameIsOver = false
var hummerSpawned = false
var hornNotPlaying = true
var hornTimer = 0

function problem(problem, truth){
  this.problem = problem;
  this.truth = truth;
}

var equations = [
new problem('2 + 2 = 4', 'true'),
new problem('1 + 1 = 8', 'false'),
new problem('10 / 2 = 5', 'true'),
new problem('12 + 4 = 18', 'false'),
new problem('6 * 2 = 12', 'true'),
new problem('9 + 6 = 13', 'false'),
new problem('1 + 5 = 6', 'true'),
new problem('3 * 4 = 16', 'false'),
new problem('2 / 2 = 1', 'true'),
new problem('4 + 4 = 16', 'false'),
new problem('1 * 8 = 8', 'true'),
new problem('128 + 1 = 128', 'false')
]

var current_equation

var playerOneScore = 0;
var playerTwoScore = 0;
var playerOneCorrect = 0;
var playerOneWrong = 0;
var playerTwoCorrect = 0;
var playerTwoWrong = 0;

function preload() {
  game.load.image('tux', '/assets/frog.png');
  game.load.image("background", "/assets/street.jpeg");
  game.load.image('bug', '/assets/bug.png')
  game.load.image('car1', '/assets/car1.png');
  game.load.image('car3', '/assets/car3.png');
  game.load.image('police1', '/assets/police1.png')
  game.load.image('hummer1', '/assets/limo1.png')
  game.load.audio('carhorn1', '/assets/carhorn1.wav')
  game.load.audio('croak1', '/assets/croak1.wav')
}

function create(){
    game.add.tileSprite(0, 0, 1000, 600, 'background');
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // Players
    players = game.add.group();
    players.enableBody = true;
    createPlayer(400, 10, 1);
    createPlayer(200, 200, 2);

    // Keyboard
    one = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
    two = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
    three = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
    four = game.input.keyboard.addKey(Phaser.Keyboard.FOUR);
    cursors = game.input.keyboard.createCursorKeys();

    // Cars
    cars = game.add.group();
    cars.enableBody = true;
    createCar(game.width/2, 250, 'police1', -200)
    createCar(game.width + 300, 0, 'police1', -200)

    // Math problems
    current_equation = equations[Math.floor(Math.random()*(equations.length - 0))]
    questionTimer = 0;

    // Bugs
    bugs = game.add.group();
    bugs.enableBody = true;
    createBug(Math.random()*(game.width - 20), Math.random()*(game.height - 20))

    // Sounds and screen
    game.input.onDown.add(go_fullscreen, this);
    hornSound = game.add.audio('carhorn1')
    croakSound = game.add.audio('croak1')

    // Text
    playerOneText = game.add.text(32, 550, 'Player 1: ' + playerOneScore, { font: '20px Arial', fill: '#ffffff', align: 'left'});
    playerTwoText = game.add.text(32, 500, 'Player 2: ' + playerTwoScore, { font: '20px Arial', fill: '#ffffff', align: 'left'});
    finalScoreText = game.add.text(200, 400, '', { font: '50px Arial', fill: '#ffffff', align: 'left'});
}

// Create Sprites
function createBug(x, y){
  var bug = bugs.create(x, y, 'bug')
}

function createPlayer(x, y, id){
  var player = players.create(x, y, 'tux');
  player.player_id = id;
  player.health = 'true';
  player.body.collideWorldBounds = true;
}

function createCar(x, y, image, velocity){
  var car = cars.create(x, y, image)
  car.body.immovable = true;
  car.velocity = velocity
}


// Update
function update(){
  playerUpdate();
  carUpdate();

  game.physics.arcade.overlap(players, bugs, playerBugCollisionHandler, null, this);
  game.physics.arcade.overlap(players, cars, playerCarCollisionHandler, null, this);
  game.physics.arcade.overlap(cars, bugs, carBugCollisionHandler, null, this);

  gameOver();

  questionTimer += 1
  if (questionTimer >= 250){
    questionTimer = 0
    current_equation = equations[Math.floor(Math.random()*(equations.length - 0))]
  }

  hornTimer += 1
  if (hornTimer >= 80){
    hornNotPlaying = true
  }
}

function playerUpdate(){
  players.forEach(function(p){
    if (p.player_id === 1){
          p.body.velocity.x = 0;
                if(cursors.left.isDown){
                  p.body.velocity.x = -200*p.alpha;
                }else if(cursors.right.isDown){
                  p.body.velocity.x = 200*p.alpha;
                }
                if(cursors.up.isDown){
                  p.body.velocity.y = -200*p.alpha;
                }else if(cursors.down.isDown){
                  p.body.velocity.y = 200*p.alpha;
                } else {
                  p.body.velocity.y = 0;
                }
    }
    if (p.player_id === 2){
          p.body.velocity.x = 0;
                if(one.isDown){
                  p.body.velocity.x = -200*p.alpha;
                }else if(four.isDown){
                  p.body.velocity.x = 200*p.alpha;
                }
                if(three.isDown){
                  p.body.velocity.y = -200*p.alpha;
                }else if(two.isDown){
                  p.body.velocity.y = 200*p.alpha;
                } else {
                  p.body.velocity.y = 0;
                }
    }
  })
}

function carUpdate(){
  cars.forEach(function(c){
    c.body.velocity.x = c.velocity;
    if (c.x < -400 ){
      var rand = (Math.floor(Math.random()*(3)))
      var heights = [0, 150, 300]
      c.x = game.width + 400;
      c.y = heights[rand]
    } else if (c.x > game.width + 600){
        c.x = -400
    }
  })
}

// Collision Handlers
function carBugCollisionHandler(car, bug){
  bug.x = Math.random()*(game.width - 20)
  bug.y = Math.random()*(game.height - 20)
}

function playerCarCollisionHandler(player, car){
  playerCarSoundAffect();
  player.alpha = .5
  player.health = 'false';
  setTimeout(function(){
    updatePlayerHealth(player);
  }, 5000);
}

function playerCarSoundAffect(){
  if (hornNotPlaying === true){
      hornSound.play()
      hornNotPlaying = false
      hornTimer = 0
  }
}

function updatePlayerHealth(player){
  player.alpha = 1;
  player.health = 'true';
}

function playerBugCollisionHandler(player, bug){
  bug.kill();
  croakSound.play();
  createBug(Math.random()*(game.width - 20), Math.random()*(game.height - 20))

  if (current_equation.truth === 'true'){

      if (player.player_id === 1){
        playerOneScore += 1;
        playerOneText.text = 'Player 1: ' + playerOneScore
        playerOneCorrect += 1
      } else if (player.player_id === 2) {
        playerTwoScore += 1;
        playerTwoText.text = 'Player 2: ' + playerTwoScore
        playerTwoCorrect += 1
      }
  } else {
    if (player.player_id === 1){
        playerTwoScore += 1;
        playerTwoText.text = 'Player 2: ' + playerTwoScore;
        playerOneWrong += 1
    } else if (player.player_id === 2){
        playerOneScore += 1;
        playerOneText.text = 'Player 1: ' + playerOneScore;
        playerTwoWrong += 1
    }
    if (playerOneScore === 1 || playerTwoScore === 1){
      createCar(1000, 225, 'hummer1', 200);
    }
    player.x = 0
    player.y = 0
  }
  current_equation = equations[Math.floor(Math.random()*(equations.length - 0))]
  // MathQuestionText.text = current_equation.problem
  questionTimer = 0
}

function go_fullscreen(){
  game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
  game.scale.startFullScreen();
}

// End game
function gameOver(){
  if (!gameIsOver){
    if (playerOneScore >= 1 || playerTwoScore >= 1){
      gameIsOver = true;
      players.forEach(function(p){
        p.kill();
      })
      cars.forEach(function(c){
        c.kill();
      })
      var winner;
      if (playerOneScore > playerTwoScore){
        winner = 'Player 1'
      } else {
        winner = 'Player 2'
      }
      finalScoreText.text = 'Game over, ' + winner +  ' wins!'
      froggerAjaxCall();
    }
  }
}

function froggerAjaxCall(){
  console.log('player 1 had ' + playerOneCorrect + ' correct answers and ' + playerOneWrong + ' incorrect answers.')
  console.log('player 2 had ' + playerTwoCorrect + ' correct answers and ' + playerTwoWrong + ' incorrect answers.')


  var data = { player1: 'player1', player2: 'player2', player1correct: playerOneCorrect, player1wrong: playerOneWrong, player2correct: playerTwoCorrect, player2wrong: playerTwoWrong, game_id: 1}

  var request = $.ajax({
    url: '/results',
    type: 'post',
    data: data
  })
}
