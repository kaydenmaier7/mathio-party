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
    this.player2score = game.add.text(20,60,"Player 2: "+this.p2score, { font: '30px Arial', fill: '#4933ff' });

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
      this.takeDamage(1)
    }
    if (this.blueBird.y < 0 || this.blueBird.y > 910){
      this.takeDamage(2);
    }

    //score on correct answer
    game.physics.arcade.overlap(this.bird, this.correct, this.p1Score, null,this);
    game.physics.arcade.overlap(this.blueBird, this.correct, this.p2Score, null, this);

    // game.physics.arcade.overlap(this.bird, this.pipes, this.hitPipe, null, this);
    // game.physics.arcade.overlap(this.blueBird, this.pipes, this.hitPipe, null, this);

  },
  hitPipe: function(){
    if (this.bird.alive == false){
      return;
    }
    this.bird.alive = false;
  },

  takeDamage: function(player){
    if (player === 1 ){
      this.bird.alpha = 0.5;
      this.bird.y = 500;
      this.bird.body.velocity.y = -350;
      setTimeout(function(){

    }, 250);
    } else if (player === 2){
      this.blueBird.alpha = 0.5;
      this.blueBird.y = 500;
      this.blueBird.body.velocity.y = -350;
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
      this.player1score.text = "player 1: "+this.p1score;
      setTimeout(this.restore1Score, 1000);
    }
  },

  p2Score: function(){
    console.log(this.blueBird.canScore);
    if ( this.blueBird.canScore ){
      this.blueBird.canScore = false;
      this.p2score  += 1;
      this.player2score.text = "player 2: "+this.p2score;
      setTimeout(this.restore2Score, 1000);
    }
  },

  restore1Score: function(){
    this.bird.canScore1=true;
  },

  restore2Score: function(){
    this.blueBird.canScore2=true;
  },

  spawnQuestion: function (x,y){
    var problem = game.add.text(x,y, "", { font: '30px Arial', fill: '#ffffff#' });
    game.physics.arcade.enable(problem);
    problem.body.velocity.x = -200;
    param1 = Math.floor(Math.random()*15);
    param2 = Math.floor(Math.random()*15);
    problem.text = param1.toString() + " + " + param2.toString()
    return (param1 + param2);
  },

  addOnePipe: function (x,y){
      var pipe = game.add.sprite(x,y, 'pipe');

      this.pipes.add(pipe);

      game.physics.arcade.enable(pipe);

      pipe.body.velocity.x = -200

      pipe.checkWorldsBounds = true;
      pipe.outOfBoundsKill = true;
    },

  addCircle: function (x,y){
      var circle = game.add.sprite(x,y, 'circle');

      game.physics.arcade.enable(circle);
      circle.body.velocity.x = -200
      circle.checkWorldsBounds = true;
      circle.outOfBoundsKill = true;
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
    var config = this.currentConfig();

    for (var i=0 ; i<config.length ; i++){
      if (config[i] === 1){
        this.addOnePipe(1000, i * 60 + 10);
      }
      else if(config[i] === 2){
        this.spawnAnswer(1005, i*60+15, "10", true);
      }
    }
  },
};

var game = new Phaser.Game(1000,910);

game.state.add('main', mainState);

game.state.start('main');
