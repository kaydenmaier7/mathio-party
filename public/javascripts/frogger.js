$(document).ready(function(){
  froggerButtonClick()
  modeListener()
  window.setInterval(function(){
    updateEquationText();
  }, 200);
})

var modeListener = function(){
  $('#mode').on('change', function(){
    selectedMode = $('#mode option:selected').text()
    $('#mode :first-child').attr('disabled', 'disabled')
    if (! $('#frogger-button').is(':visible')){
      $('#frogger-button').slideToggle(1000)
    }
  })
}

var froggerButtonClick = function(){
  $('#frogger-button').on('click', function(){
    $(this).remove()

      load3()

  })
}

var load3 = function(){
  $('#frogger').css('background', 'black').html('<h1>3</h1>')
  setTimeout(function(){
      load2()
    }, 1000)
}

var load2 = function(){
  $('#frogger').html('<h1>2</h1>')
  setTimeout(function(){
      load1()
    }, 1000)
}

var load1 = function(){
  $('#frogger').html('<h1>1</h1>')
  setTimeout(function(){
      loadGame()
    }, 1000)
}

var loadGame = function(){
  $('#frogger').html('')
  game = new Phaser.Game(1000, 600, Phaser.AUTO, 'frogger', { preload: preload, create: create, update: update });
}



var updateEquationText = function(){
  if (!gameIsOver && current_equation){
  $('#equation_text_div').html(current_equation.problem)
  }
}


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


var equations;

var additionEquations = [
new problem('2 + 2 = 4', 'true'),
new problem('1 + 1 = 8', 'false'),
new problem('4 + 6 = 10', 'true'),
new problem('5 + 7 = 15', 'false'),
new problem('1 + 8 = 9', 'true'),
new problem('3 + 5 = 5', 'false'),
new problem('9 + 12 = 21', 'true'),
new problem('4 + 8 = 16', 'false')
]

var subtractionEquations = [
new problem('6 - 2 = 4', 'true'),
new problem('8 - 1 = 8', 'false'),
new problem('14 - 4 = 10', 'true'),
new problem('7 - 6 = 1', 'false'),
new problem('100 - 48 = 52', 'true'),
new problem('17 - 8 = 11', 'false'),
new problem('11 - 5 = 6', 'true'),
new problem('20 - 12 = 6', 'false')
]

var multiplicationEquations = [
new problem('2 * 2 = 4', 'true'),
new problem('7 * 1 = 8', 'false'),
new problem('5 * 5 = 25', 'true'),
new problem('3 * 5 = 25', 'false'),
new problem('12 * 3 = 36', 'true'),
new problem('9 * 3 = 36', 'false'),
new problem('12 * 10 = 120', 'true'),
new problem('3 * 7 = 24', 'false')
]

var divisionEquations = [
new problem('12 / 4 = 3', 'true'),
new problem('8 / 1 = 1', 'false'),
new problem('20 / 4 = 5', 'true'),
new problem('15 / 3 = 3', 'false'),
new problem('24 / 8 = 3', 'true'),
new problem('40 / 8 = 6', 'false'),
new problem('35 / 7 = 5', 'true'),
new problem('18 / 9 = 3', 'false')
]


var current_equation

var playerOneScore = 0;
var playerTwoScore = 0;
var playerOneCorrect = [];
var playerOneWrong = [];
var playerTwoCorrect = [];
var playerTwoWrong = [];

function preload() {
  game.load.image('tux', '/images/frog.png');
  game.load.image("background", "/images/street.jpg");
  game.load.image('bug', '/images/bug.png')
  game.load.image('car1', '/images/car1.png');
  game.load.image('car3', '/images/car3.png');
  game.load.image('police1', '/images/police1.png')
  game.load.image('hummer1', '/images/limo1.png')
  game.load.audio('carhorn1', '/sounds/carhorn1.wav')
  game.load.audio('croak1', '/sounds/croak1.wav')
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
    one = game.input.keyboard.addKey(Phaser.Keyboard.A);
    two = game.input.keyboard.addKey(Phaser.Keyboard.S);
    three = game.input.keyboard.addKey(Phaser.Keyboard.W);
    four = game.input.keyboard.addKey(Phaser.Keyboard.D);
    cursors = game.input.keyboard.createCursorKeys();

    // Cars
    cars = game.add.group();
    cars.enableBody = true;
    createCar(game.width/2, 250, 'police1', -200)
    createCar(game.width + 300, 0, 'police1', -200)

    // Math problems
    determineMode()
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

function determineMode(){
  console.log(selectedMode)
  if (selectedMode === 'Addition'){
    equations = additionEquations
  } else if (selectedMode === 'Subtraction'){
    equations = subtractionEquations
  } else if (selectedMode === 'Multiplication'){
    equations = multiplicationEquations
  } else if (selectedMode === 'Division'){
    equations = divisionEquations
  } else {
    equations = additionEquations.concat(subtractionEquations).concat(multiplicationEquations).concat(divisionEquations)
  }
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
        if (playerOneScore === 2){
            createCar(1000, 225, 'hummer1', 200);
           }
        playerOneText.text = 'Player 1: ' + playerOneScore
        playerOneCorrect.push(current_equation.problem)
      } else if (player.player_id === 2) {
        playerTwoScore += 1;
        playerTwoText.text = 'Player 2: ' + playerTwoScore
        playerTwoCorrect.push(current_equation.problem)
      }
  } else {
    if (player.player_id === 1){
        playerTwoScore += 1;
        playerTwoText.text = 'Player 2: ' + playerTwoScore;
        playerOneWrong.push(current_equation.problem)
    } else if (player.player_id === 2){
        playerOneScore += 1;
        playerOneText.text = 'Player 1: ' + playerOneScore;
        playerTwoWrong.push(current_equation.problem)
    }
    player.x = 0
    player.y = 0
  }
  current_equation = equations[Math.floor(Math.random()*(equations.length - 0))]
  questionTimer = 0
}

function go_fullscreen(){
  game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
  game.scale.startFullScreen();
}

// End game
function gameOver(){
  if (!gameIsOver){
    if (playerOneScore >= 5 || playerTwoScore >= 5){
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

  var data = {
    player1correct: playerOneCorrect,
    player1wrong: playerOneWrong,
    player2correct: playerTwoCorrect,
    player2wrong: playerTwoWrong,
    skill: selectedMode,
    game_id: 1
  }

  var request = $.ajax({
    url: '/results',
    type: 'post',
    data: data
  })

  request.done(function(response){
    console.log(response)
    console.log('success')
    $('#equation_text_div').html('').append($('#hidden_match_button').slideToggle(1000))
  })

  request.fail(function(response){
    console.log(response)
    console.log('failed')
  })


}
