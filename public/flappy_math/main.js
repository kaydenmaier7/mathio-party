var mainState= {
  preload: function(){
    game.load.audio('jump', '/assets/flappy_math/jump.wav');
    game.load.image('bird', '/assets/flappy_math/bird.png');
    game.load.image('blueBird', '/assets/flappy_math/blueBird.png');
    game.load.image('pipe', '/assets/flappy_math/pipe.png');
    game.load.image('circle', '/assets/flappy_math/circle.png');
    game.load.image('cloud', '/assets/flappy_math/cloud.png');
  },
  create: function(){
    this.jumpSound = game.add.audio('jump');
    this.p1score = 0;
    this.p2score = 0;

    this.player1score = game.add.text(20,20,"Player 1: "+this.p1score, { font: '30px Arial', fill: '#ff5733' });
    this.player2score = game.add.text(20,100,"Player 2: "+this.p2score, { font: '30px Arial', fill: '#4933ff' });

    this.pipes = game.add.group();
    this.correct = game.add.group();
    game.stage.backgroundColor = '#37edf8';
    game.physics.startSystem(Phaser.Physics.ARCADE);

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

    this.timer = game.time.events.loop(4000, this.addRowOfPipes, this);
    this.timer = game.time.events.loop(3000, this.spawnCloud, this);

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

      game.physics.arcade.overlap(this.bird, this.correct, this.p1Score, null,this);
      game.physics.arcade.overlap(this.bird, this.pipes, this.hitPipe1, null, this);

      game.physics.arcade.overlap(this.blueBird, this.correct, this.p2Score, null, this);
      game.physics.arcade.overlap(this.blueBird, this.pipes, this.hitPipe2, null, this);
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

  restartGame: function(){
    game.state.start('main');
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
    var problem = game.add.text(20,60, "", { font: '30px Arial', fill: '#ffffff#' });

    param1 = Math.floor(Math.random()*10);
    param2 = Math.floor(Math.random()*10);

    problem.text = param1.toString() + " + " + param2.toString()

    that = this;
    setTimeout(function(){problem.kill()}, 4000);
    return (param1 + param2);
  },

  spawnQuestion2: function (skill){
    var problem = game.add.text(20,130, "", { font: '30px Arial', fill: '#ffffff#' });

    param1 = Math.floor(Math.random()*10);
    param2 = param1 + Math.floor(Math.random()*10);

    problem.text = param2.toString() + " - " + param1.toString()

    that = this;
    setTimeout(function(){problem.kill()}, 4000);
    return (param2 - param1);
  },
  addOnePipe: function (x,y){
      var pipe = game.add.sprite(x,y, 'pipe');

      this.pipes.add(pipe);

      game.physics.arcade.enable(pipe);

      pipe.body.velocity.x = -200

      pipe.checkWorldsBounds = true;
      pipe.outOfBoundsKill = true;
    },

  spawnAnswer: function (x, y, num, correct){
      var answer = game.add.text(x,y, num, { font: '30px Arial', fill: '#ffffff#' });
      game.physics.arcade.enable(answer);
      answer.body.velocity.x = -200;

      if (correct){
        this.correct.add(answer);

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
    for(var i = 0; i < config.length; ++i){
      if(config[i] == 2) count++;
    }
    var loc1 =  Math.floor(Math.random()*count)
    var loc2 =  Math.floor(Math.random()*count)

    var answers = []

    for (var i=0 ; i < count ; ++i){
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
      else if(config[i] === 2){
        this.spawnAnswer(1005, i*60+15, answers.pop(), true);
      }
    }
  }
};

var game = new Phaser.Game(1000,910, Phaser.AUTO, 'flappy-bird');

game.state.add('main', mainState);

game.state.start('main');
