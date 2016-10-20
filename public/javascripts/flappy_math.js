var mainState= {
  preload: function(){
    game.load.audio('jump', '/sounds/flappy_math/jump.wav');
    game.load.image('bird', '/images/flappy_math/bird.png');
    game.load.image('blueBird', '/images/flappy_math/blueBird.png');
    game.load.image('pipe', '/images/flappy_math/pipe.png');
    game.load.image('cloud', '/images/flappy_math/cloud.png');
  },
  create: function(){
    this.jumpSound = game.add.audio('jump');

    this.p1score = 0;
    this.p2score = 0;
    this.gameOver = false;

    this.player1score = game.add.text(20,20,"Player 1: "+this.p1score, { font: '30px Arial', fill: '#ff5733' });
    this.player2score = game.add.text(20,100,"Player 2: "+this.p2score, { font: '30px Arial', fill: '#4933ff' });

    this.pipes = game.add.group();
    this.correct1 = game.add.group();
    this.correct2 = game.add.group();
    game.stage.backgroundColor = '#37edf8';
    game.physics.startSystem(Phaser.Physics.ARCADE);
    this.speed = 0;

    this.bird = game.add.sprite(100, 245, 'bird');
    game.physics.arcade.enable(this.bird);
    this.bird.body.gravity.y = 1000;


    var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(this.jump, this);

    this.blueBird = game.add.sprite(100, 300, 'blueBird');
    game.physics.arcade.enable(this.blueBird);
    this.blueBird.body.gravity.y = 1000;

    key1 = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
    key1.onDown.add(this.leap, this);

    this.bird.canScore = true;
    this.blueBird.canScore = true;

    this.timer = game.time.events.loop(4500, this.addRowOfPipes, this);
    this.timer = game.time.events.loop(3000, this.spawnCloud, this);
    this.time = 1000;

    this.timer = game.add.text(800,20, this.time, { font: "64px Arial", fill: "#ffffff", align: "center" });

    game.time.events.loop(1, this.updateCounter, this);


    this.bird.anchor.setTo(-0.2, 0.5);
    this.blueBird.anchor.setTo(-0.2, 0.5);
  },

  update: function(){
    if (this.bird.angle < 20){
       this.bird.angle += 1;
    }
    if (this.blueBird.angle < 20){
       this.blueBird.angle += 1;
    }

    if (this.bird.y < 0 || this.bird.y > 910){
      // this.bird.alive = false;
      this.takeDamage(1)
    }
    if (this.blueBird.y < 0 || this.blueBird.y > 910){
      // this.blueBird.alive = false;
      this.takeDamage(2);
    }
    //score on correct answer

      game.physics.arcade.overlap(this.bird, this.correct1, this.p1Score, null,this);
      game.physics.arcade.overlap(this.bird, this.pipes, this.hitPipe1, null, this);

      game.physics.arcade.overlap(this.blueBird, this.correct2, this.p2Score, null, this);
      game.physics.arcade.overlap(this.blueBird, this.pipes, this.hitPipe2, null, this);
  },

  updateCounter: function() {
    this.time--;
    this.speed++;
    this.timer.setText(this.time);
    if (this.time <= 0){
      this.endGame()
    }
  },

  endGame: function(){
    gotext = game.add.text(game.world.centerX, game.world.centerY, "", { font: "64px Arial", fill: "#ffffff", align: "center" });
    gotext.anchor.setTo(0.5, 0.5);
    if (this.p1score > this.p2score){
      gotext.text = "Player 1 Wins!"
    } else if (this.p1score < this.p2score){
      gotext.text = "Player 2 Wins!"
    } else {
      gotext.text = "Tie Game!"
    }
    this.blueBird.destroy()
    this.bird.destroy()
    this.time = 1

    if (!this.gameOver){
      this.flappyAjaxCall()
      this.gameOver = true;
    }
  },

  flappyAjaxCall: function(){
    console.log('in ajax function')

    var request = $.ajax({
      url: '/results',
      type: 'post'
    })

    request.done(function(response){
      console.log('success')
      $('#flappy-bird').append($('#hidden_match_button'))
      $('#hidden_match_button').slideToggle(1000)
    })

    request.fail(function(response){
      console.log('failed')
    })
  },

  hitPipe1: function(){
      if (this.bird.alive === false){
        return;
      }
      // this.bird.alive = false;
      this.takeDamage(1);
  },

  hitPipe2: function(){
      if (this.blueBird.alive === false){
        return;
      }
      // this.blueBird.alive = false;
      this.takeDamage(2);
  },

  takeDamage: function(player){
    if (player === 1 && this.bird.alive){
      that = this;
      this.bird.alpha = 0.5;
      this.bird.alive = false;

      setTimeout(function(){
        that.bird.y = 500;
        that.bird.body.velocity.y = -350;
        that.bird.alive = true;
        that.bird.alpha = 1;
      }, 2000);

    } else if (player === 2 && this.blueBird.alive){
      that = this;
      this.blueBird.alpha = 0.5;

      this.blueBird.alive = false;

      setTimeout(function(){
        that.blueBird.y = 500;
        that.blueBird.body.velocity.y = -350;
        that.blueBird.alive = true;
        that.blueBird.alpha = 1;
      }, 2000);

    }
  },

  jump: function(){
    if (this.bird.alive === false){
      return;
    }
    var animation = game.add.tween(this.bird);
    animation.to({angle: -20}, 100);
    animation.start();
    this.jumpSound.play();
    this.bird.body.velocity.y = -350;
  },

  leap: function(){
    if (this.blueBird.alive === false){
      return;
    }
    var bbanimation = game.add.tween(this.blueBird);
    bbanimation.to({angle: -20}, 100);
    bbanimation.start();
    this.jumpSound.play();
    this.blueBird.body.velocity.y = -350;
  },

  spawnCloud:function(){
    var cloud = game.add.sprite(1000,Math.floor(Math.random()*900), 'cloud');
    var multiplier = Math.floor(Math.random()*3)
    cloud.height *= multiplier;
    cloud.width *= multiplier;
    game.physics.arcade.enable(cloud);
    cloud.body.velocity.x = Math.floor(Math.random()*50)-75;
  },

  p1Score: function(){
    if ( this.bird.canScore ){
      this.bird.canScore = false;
      this.p1score  += 1;
      this.player1score.text = "Player 1: "+this.p1score;
      that = this;
      setTimeout(function(){that.bird.canScore=true}, 1000);
    }
  },

  p2Score: function(){
    if ( this.blueBird.canScore ){
      this.blueBird.canScore = false;
      this.p2score  += 1;
      this.player2score.text = "Player 2: "+this.p2score;
      that = this;
      setTimeout(function(){that.blueBird.canScore=true}, 1000);
    }
  },

  spawnQuestion1: function (skill){
    if (!this.gameOver){
      var problem = game.add.text(20,60, "", { font: '30px Arial', fill: '#ffffff#' });

      param1 = Math.floor(Math.random()*10);
      param2 = Math.floor(Math.random()*10);

      problem.text = param1.toString() + " + " + param2.toString()

      that = this;
      setTimeout(function(){problem.kill()}, 4500);
      return (param1 + param2);
    }
  },

  spawnQuestion2: function (skill){
    if (!this.gameOver) {
      var problem = game.add.text(20,130, "", { font: '30px Arial', fill: '#ffffff#' });

      param1 = Math.floor(Math.random()*10);
      param2 = param1 + Math.floor(Math.random()*10);

      problem.text = param2.toString() + " - " + param1.toString()

      that = this;
      setTimeout(function(){problem.kill()}, 4500);
      return (param2 - param1);
  }
  },
  addOnePipe: function (x,y){
      var pipe = game.add.sprite(x,y, 'pipe');
      this.pipes.add(pipe);

      game.physics.arcade.enable(pipe);
      pipe.body.velocity.x = -200;

      pipe.checkWorldsBounds = true;
      pipe.outOfBoundsKill = true;
    },

  spawnAnswer: function (x, y, num, correct1, correct2){
      var answer = game.add.text(x,y, num, { font: '30px Arial', fill: '#ffffff#' });
      game.physics.arcade.enable(answer);
      answer.body.velocity.x = -200;

      if (correct1){
        this.correct1.add(answer)
      } else if (correct2) {
        this.correct2.add(answer)
      }
    },

  currentConfig: function(){
    var configs = [[1,0,2,0,1,1,0,2,0,1,1,0,2,0,1],
      [0,2,1,1,1,0,2,0,2,0,1,1,1,2,0],
      [2,0,0,0,2,1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1,2,0,0,0,2],
      [0,2,0,1,1,1,1,2,1,1,1,1,0,2,0],
      [1,1,0,2,0,1,1,1,1,1,0,2,0,1,1]];

    return configs[Math.floor(Math.random()*configs.length)];
  },

  addRowOfPipes: function() {
    a1 = this.spawnQuestion1();
    a2 = this.spawnQuestion2();

    var config = this.currentConfig();

    var count = 0;
    for(var i = 0; i < config.length; i++){
      if(config[i] == 2) count++;
    }

    while( loc1 === loc2){
      var loc1 =  Math.floor(Math.random()*count)
      var loc2 =  Math.floor(Math.random()*count)
    }
    var answers = []

    for (var i=0 ; i < count ; i++){
      if (i === loc1){
        answers.push(a1)
      } else if (i === loc2){
        answers.push(a2)
      } else {
        answers.push(2)
      }
    }

    for (var i=0 ; i<config.length ; i++){
      if (config[i] === 1){
        this.addOnePipe(1000, i * 60 + 10);
      }
      else if(config[i] !== 0){
        config[i] = answers.pop()
        this.spawnAnswer(1005, i*60+15, config[i], config[i]===a1, config[i]===a2 );
      }
    }
  }
};

$(document).ready(function(){
  flappyButtonClick()
})

var flappyButtonClick = function(){
  $('#flappy-button').on('click', function(){
    $(this).remove()
    load3()
  })
}

var load3 = function(){
  $('#flappy-bird').css('background', 'black').html('<h1>3</h1>')
  setTimeout(function(){
      load2()
    }, 1000)
}

var load2 = function(){
  $('#flappy-bird').html('<h1>2</h1>')
  setTimeout(function(){
      load1()
    }, 1000)
}

var load1 = function(){
  $('#flappy-bird').html('<h1>1</h1>')
  setTimeout(function(){
      loadGame()
    }, 1000)
}

var loadGame = function(){
  $('#flappy-bird').html('')
  game = new Phaser.Game(1000,910, Phaser.AUTO, 'flappy-bird');
  game.state.add('main', mainState);
  game.state.start('main');
}



