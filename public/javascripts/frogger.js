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

// function problem(problem, truth){
//   this.problem = problem;
//   this.truth = truth;
// }


var equations;

var randEquation = function(type, truth){

  var x = Math.floor(Math.random()*15);
  var y = Math.floor(Math.random()*10);
  var operation;
  var answer;
  var equation;

  if (type === 'addition'){
    operation = '+';
  } else if (type === 'subtraction'){
    operation = '-';
  } else if (type === 'multiplication'){
    operation = '*';
  } else if (type === 'division'){
    operation = '/';
  } else {
    var operations = ['+', '*', '-', '/'];
    operation = operations[Math.floor(Math.random()*(operations.length - 0))];
  }

  if (operation === '+'){
    answer = x + y;
  } else if (operation === '/'){
    x += 1;
    y += 1;
    var z = x*y;
    answer = y;

    if (truth === true){
      equation = z.toString() + ' ' + operation + ' ' + x.toString() + ' = ' + answer;
      return equation;
    } else {
      answer += Math.floor(Math.random()*5 + 1);
      equation = z.toString() + ' ' + operation + ' ' + x.toString() + ' = ' + answer;
    return equation;
    }

  } else if (operation === '-'){
    answer = x - y;
  } else {
    answer = x * y;
  }
  if (truth === true){
    equation = x.toString() + ' ' + operation + ' ' + y.toString() + ' = ' + answer;
      return equation;
  } else {
    answer += Math.floor(Math.random()*6 + 1);
    equation = x.toString() + ' ' + operation + ' ' + y.toString() + ' = ' + answer;
      return equation;
  }

};


function problem(type, truth){
  this.type = type;
  this.truth = truth === true ? true : false;
  this.problem = randEquation(this.type, this.truth);
}

var additionEquations = [
new problem('addition', true),
new problem('addition', true),
new problem('addition', true),
new problem('addition', true),
new problem('addition', true),
new problem('addition', true),
new problem('addition', true),
new problem('addition', true),
new problem('addition', true),
new problem('addition', true),
new problem('addition', true),
new problem('addition', true),
new problem('addition', true),
new problem('addition', true),
new problem('addition', true),
new problem('addition', true),
new problem('addition', false),
new problem('addition', false),
new problem('addition', false),
new problem('addition', false),
new problem('addition', false),
new problem('addition', false),
new problem('addition', false),
new problem('addition', false),
new problem('addition', false),
new problem('addition', false),
new problem('addition', false)
]

var subtractionEquations = [
new problem('subtraction', true),
new problem('subtraction', true),
new problem('subtraction', true),
new problem('subtraction', true),
new problem('subtraction', true),
new problem('subtraction', true),
new problem('subtraction', true),
new problem('subtraction', true),
new problem('subtraction', true),
new problem('subtraction', true),
new problem('subtraction', true),
new problem('subtraction', true),
new problem('subtraction', true),
new problem('subtraction', true),
new problem('subtraction', true),
new problem('subtraction', true),
new problem('subtraction', false),
new problem('subtraction', false),
new problem('subtraction', false),
new problem('subtraction', false),
new problem('subtraction', false),
new problem('subtraction', false),
new problem('subtraction', false),
new problem('subtraction', false),
new problem('subtraction', false),
new problem('subtraction', false),
new problem('subtraction', false)
]

var multiplicationEquations = [
new problem('multiplication', true),
new problem('multiplication', true),
new problem('multiplication', true),
new problem('multiplication', true),
new problem('multiplication', true),
new problem('multiplication', true),
new problem('multiplication', true),
new problem('multiplication', true),
new problem('multiplication', true),
new problem('multiplication', true),
new problem('multiplication', true),
new problem('multiplication', true),
new problem('multiplication', true),
new problem('multiplication', true),
new problem('multiplication', true),
new problem('multiplication', true),
new problem('multiplication', false),
new problem('multiplication', false),
new problem('multiplication', false),
new problem('multiplication', false),
new problem('multiplication', false),
new problem('multiplication', false),
new problem('multiplication', false),
new problem('multiplication', false)
]

var divisionEquations = [
new problem('division', true),
new problem('division', true),
new problem('division', true),
new problem('division', true),
new problem('division', true),
new problem('division', true),
new problem('division', true),
new problem('division', true),
new problem('division', true),
new problem('division', true),
new problem('division', true),
new problem('division', true),
new problem('division', true),
new problem('division', false),
new problem('division', false),
new problem('division', false),
new problem('division', false),
new problem('division', false),
new problem('division', false),
new problem('division', false),
new problem('division', false)
]


var current_equation

var playerOneScore = 0;
var playerTwoScore = 0;
var playerOneCorrect = [];
var playerOneWrong = [];
var playerTwoCorrect = [];
var playerTwoWrong = [];

function preload() {
  game.load.image('tux', '/images/frogger/frog.png');
  game.load.image('frog2', '/images/frogger/frog2.png')
  game.load.image("background", "/images/frogger/street.jpg");
  game.load.image('bug', '/images/frogger/bug.png')
  game.load.image('car1', '/images/frogger/car1.png');
  game.load.image('car3', '/images/frogger/car3.png');
  game.load.image('police1', '/images/frogger/police1.png')
  game.load.image('hummer1', '/images/frogger/limo1.png')
  game.load.image('bike', '/images/frogger/lambo.png')
  game.load.audio('carhorn1', '/sounds/frogger_sounds/carhorn1.wav')
  game.load.audio('croak1', '/sounds/frogger_sounds/croak1.wav')
  game.load.audio('error', '/sounds/frogger_sounds/error.wav')
}

function create(){
    game.add.tileSprite(0, 0, 1000, 600, 'background');
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // Players
    players = game.add.group();
    players.enableBody = true;
    createPlayer(400, 10, 1, 'tux');
    createPlayer(200, 200, 2, 'frog2');

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
    errorSound = game.add.audio('error')

    // Text
    playerOneText = game.add.text(32, 550, 'Player 1: ' + playerOneScore, { font: '30px Arial', fill: '#ffffff', align: 'left'});
    playerTwoText = game.add.text(32, 500, 'Player 2: ' + playerTwoScore, { font: '30px Arial', fill: '#ffffff', align: 'left'});
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

function createPlayer(x, y, id, image){
  var player = players.create(x, y, image);
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

  createBug(Math.random()*(game.width - 20), Math.random()*(game.height - 20))

  if (current_equation.truth === true){
    croakSound.play();
      if (player.player_id === 1){
        playerOneScore += 1;
        if (playerOneScore === 2){
            createCar(1000, 225, 'hummer1', 200);
           }
        if (playerOneScore === 1){
          createCar(1000, 425, 'bike', 400)
        }
        playerOneText.text = 'Player 1: ' + playerOneScore
        playerOneCorrect.push(current_equation.problem)
      } else if (player.player_id === 2) {
        playerTwoScore += 1;
        playerTwoText.text = 'Player 2: ' + playerTwoScore
        playerTwoCorrect.push(current_equation.problem)
      }
  } else {
    errorSound.play()
    if (player.player_id === 1){
        playerTwoScore += 1;
        playerTwoText.text = 'Player 2: ' + playerTwoScore;
        playerOneWrong.push(current_equation.problem)
    } else if (player.player_id === 2){
        playerOneScore += 1;
        playerOneText.text = 'Player 1: ' + playerOneScore;
        playerTwoWrong.push(current_equation.problem)
    }
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
    if (playerOneScore >= 10 || playerTwoScore >= 10){
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
    console.log('success')
    $('#equation_text_div').html('').append($('#hidden_match_button').slideToggle(1000))
  })

  request.fail(function(response){
    console.log('failed')
  })


}
