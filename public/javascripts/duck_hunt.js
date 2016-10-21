var game = new Phaser.Game(1000,910, Phaser.auto, 'math-hunt');

function Duck(val, round) {
  this.xMove = 0;
  this.yMove = 0;
  this.speed = 1 * round * .5 ;

  if(val === 1){ this.sprite = game.add.sprite(Math.floor(Math.random()*800)+100, 650, '1')}
  else if(val === 2){ this.sprite = game.add.sprite(Math.floor(Math.random()*800)+100, 650, '2')}
  else if(val === 3){ this.sprite = game.add.sprite(Math.floor(Math.random()*800)+100, 650, '3')}
  else if(val === 4){ this.sprite = game.add.sprite(Math.floor(Math.random()*800)+100, 650, '4')}
  else if(val === 5){ this.sprite = game.add.sprite(Math.floor(Math.random()*800)+100, 650, '5')}
  else if(val === 6){ this.sprite = game.add.sprite(Math.floor(Math.random()*800)+100, 650, '6')}
  else if(val === 7){ this.sprite = game.add.sprite(Math.floor(Math.random()*800)+100, 650, '7')}
  else if(val === 8){ this.sprite = game.add.sprite(Math.floor(Math.random()*800)+100, 650, '8')}
  else if(val === 9){ this.sprite = game.add.sprite(Math.floor(Math.random()*800)+100, 650, '9')}
  else if(val === 10){ this.sprite = game.add.sprite(Math.floor(Math.random()*800)+100, 650, '10')}
  else if(val === 11){ this.sprite = game.add.sprite(Math.floor(Math.random()*800)+100, 650, '11')}
  else if(val === 12){ this.sprite = game.add.sprite(Math.floor(Math.random()*800)+100, 650, '12')}
  else if(val === 13){ this.sprite = game.add.sprite(Math.floor(Math.random()*800)+100, 650, '13')}
  else if(val === 14){ this.sprite = game.add.sprite(Math.floor(Math.random()*800)+100, 650, '14')}
  else if(val === 15){ this.sprite = game.add.sprite(Math.floor(Math.random()*800)+100, 650, '15')}
  else if(val === 16){ this.sprite = game.add.sprite(Math.floor(Math.random()*800)+100, 650, '16')}
  else if(val === 17){ this.sprite = game.add.sprite(Math.floor(Math.random()*800)+100, 650, '17')}
  else if(val === 18){ this.sprite = game.add.sprite(Math.floor(Math.random()*800)+100, 650, '18')}
  else if(val === 19){ this.sprite = game.add.sprite(Math.floor(Math.random()*800)+100, 650, '19')}
  else if(val === 20){ this.sprite = game.add.sprite(Math.floor(Math.random()*800)+100, 650, '20')}
    else if(val === 21){ this.sprite = game.add.sprite(Math.floor(Math.random()*800)+100, 650, '21')}
  else if(val === 22){ this.sprite = game.add.sprite(Math.floor(Math.random()*800)+100, 650, '22')}
  else if(val === 23){ this.sprite = game.add.sprite(Math.floor(Math.random()*800)+100, 650, '23')}
  else if(val === 24){ this.sprite = game.add.sprite(Math.floor(Math.random()*800)+100, 650, '24')}
  else if(val === 25){ this.sprite = game.add.sprite(Math.floor(Math.random()*800)+100, 650, '25')}
  else if(val === 26){ this.sprite = game.add.sprite(Math.floor(Math.random()*800)+100, 650, '26')}
  else if(val === 27){ this.sprite = game.add.sprite(Math.floor(Math.random()*800)+100, 650, '27')}
  else if(val === 28){ this.sprite = game.add.sprite(Math.floor(Math.random()*800)+100, 650, '28')}
  else if(val === 29){ this.sprite = game.add.sprite(Math.floor(Math.random()*800)+100, 650, '29')}
  else if(val === 30){ this.sprite = game.add.sprite(Math.floor(Math.random()*800)+100, 650, '30')}
  else if(val === 31){ this.sprite = game.add.sprite(Math.floor(Math.random()*800)+100, 650, '31')}
  else if(val === 32){ this.sprite = game.add.sprite(Math.floor(Math.random()*800)+100, 650, '32')}
  else if(val === 33){ this.sprite = game.add.sprite(Math.floor(Math.random()*800)+100, 650, '33')}
  else if(val === 34){ this.sprite = game.add.sprite(Math.floor(Math.random()*800)+100, 650, '34')}
  else if(val === 35){ this.sprite = game.add.sprite(Math.floor(Math.random()*800)+100, 650, '35')}
  else if(val === 36){ this.sprite = game.add.sprite(Math.floor(Math.random()*800)+100, 650, '36')}
  else if(val === 37){ this.sprite = game.add.sprite(Math.floor(Math.random()*800)+100, 650, '37')}
  else if(val === 38){ this.sprite = game.add.sprite(Math.floor(Math.random()*800)+100, 650, '38')}
  else if(val === 39){ this.sprite = game.add.sprite(Math.floor(Math.random()*800)+100, 650, '39')}
  else if(val === 40){ this.sprite = game.add.sprite(Math.floor(Math.random()*800)+100, 650, '40')}
  else if(val === 41){ this.sprite = game.add.sprite(Math.floor(Math.random()*800)+100, 650, '41')}
  else if(val === 42){ this.sprite = game.add.sprite(Math.floor(Math.random()*800)+100, 650, '42')}
  else if(val === 43){ this.sprite = game.add.sprite(Math.floor(Math.random()*800)+100, 650, '43')}
  else if(val === 44){ this.sprite = game.add.sprite(Math.floor(Math.random()*800)+100, 650, '44')}
  else if(val === 45){ this.sprite = game.add.sprite(Math.floor(Math.random()*800)+100, 650, '45')}
  else if(val === 46){ this.sprite = game.add.sprite(Math.floor(Math.random()*800)+100, 650, '46')}
  else if(val === 47){ this.sprite = game.add.sprite(Math.floor(Math.random()*800)+100, 650, '47')}
  else if(val === 48){ this.sprite = game.add.sprite(Math.floor(Math.random()*800)+100, 650, '48')}
  else if(val === 49){ this.sprite = game.add.sprite(Math.floor(Math.random()*800)+100, 650, '49')}
  else if(val === 50){ this.sprite = game.add.sprite(Math.floor(Math.random()*800)+100, 650, '50')}

  this.sprite.anchor.setTo( 0.5, 0.5 );
  this.init = function(){
    this.isActive = true;
    game.physics.arcade.enable(this);
    this.checkWorldsBounds = true;
    this.outOfBoundsKill = true;
    game.time.events.loop(Math.random()*1200+800, this.randomDirection, this );
  };

  this.randomDirection =  function(){
    if (this.speed<10){
    this.setXMove();
    this.setYMove();
    }
  };

  this.setXMove = function(){
    this.xMove = Math.random()<0.5 ? -1: 1;
    this.xMove *= Math.random() * this.speed;
  };
  this.setYMove = function(){
    if (this.y < 500){
      this.yMove = Math.random()<0.5 ? -1: 1;
      return this.yMove *= Math.random();
    } else {
      return this.yMove = Math.random();
    }
  };
  this.move = function(){
    this.sprite.x += this.xMove * this.speed;
    this.sprite.y -= this.yMove * this.speed;
  }.bind(this);
};

var mainState= {
  preload: function(){
    game.load.image('stage', '/images/duck_hunt/duck_background.png');
    //crosshairs
    game.load.image('inner1', '/images/duck_hunt/p1_inner.png');
    game.load.image('inner2', '/images/duck_hunt/p2_inner.png');
    game.load.image('p1', '/images/duck_hunt/p1crosshairs.png');
    game.load.image('p2', '/images/duck_hunt/p2crosshairs.png');
    game.load.image('shot', '/images/duck_hunt/shotCrosshairs.png');
    game.load.image('redX', '/images/duck_hunt/redX.png');
    //numbers
    game.load.image('1', '/images/duck_hunt/1.png');
    game.load.image('2', '/images/duck_hunt/2.png');
    game.load.image('3', '/images/duck_hunt/3.png');
    game.load.image('4', '/images/duck_hunt/4.png');
    game.load.image('5', '/images/duck_hunt/5.png');
    game.load.image('6', '/images/duck_hunt/6.png');
    game.load.image('7', '/images/duck_hunt/7.png');
    game.load.image('8', '/images/duck_hunt/8.png');
    game.load.image('9', '/images/duck_hunt/9.png');
    game.load.image('10', '/images/duck_hunt/10.png');
    game.load.image('11', '/images/duck_hunt/11.png');
    game.load.image('12', '/images/duck_hunt/12.png');
    game.load.image('13', '/images/duck_hunt/13.png');
    game.load.image('14', '/images/duck_hunt/14.png');
    game.load.image('15', '/images/duck_hunt/15.png');
    game.load.image('16', '/images/duck_hunt/16.png');
    game.load.image('17', '/images/duck_hunt/17.png');
    game.load.image('18', '/images/duck_hunt/18.png');
    game.load.image('19', '/images/duck_hunt/19.png');
    game.load.image('20', '/images/duck_hunt/20.png');
    game.load.image('21', '/images/duck_hunt/21.png');
    game.load.image('22', '/images/duck_hunt/22.png');
    game.load.image('23', '/images/duck_hunt/23.png');
    game.load.image('24', '/images/duck_hunt/24.png');
    game.load.image('25', '/images/duck_hunt/25.png');
    game.load.image('26', '/images/duck_hunt/26.png');
    game.load.image('27', '/images/duck_hunt/27.png');
    game.load.image('28', '/images/duck_hunt/28.png');
    game.load.image('29', '/images/duck_hunt/29.png');
    game.load.image('30', '/images/duck_hunt/30.png');
    game.load.image('31', '/images/duck_hunt/31.png');
    game.load.image('32', '/images/duck_hunt/32.png');
    game.load.image('33', '/images/duck_hunt/33.png');
    game.load.image('34', '/images/duck_hunt/34.png');
    game.load.image('35', '/images/duck_hunt/35.png');
    game.load.image('36', '/images/duck_hunt/36.png');
    game.load.image('37', '/images/duck_hunt/37.png');
    game.load.image('38', '/images/duck_hunt/38.png');
    game.load.image('39', '/images/duck_hunt/39.png');
    game.load.image('40', '/images/duck_hunt/40.png');
    game.load.image('41', '/images/duck_hunt/41.png');
    game.load.image('42', '/images/duck_hunt/42.png');
    game.load.image('43', '/images/duck_hunt/43.png');
    game.load.image('44', '/images/duck_hunt/44.png');
    game.load.image('45', '/images/duck_hunt/45.png');
    game.load.image('46', '/images/duck_hunt/46.png');
    game.load.image('47', '/images/duck_hunt/47.png');
    game.load.image('48', '/images/duck_hunt/48.png');
    game.load.image('49', '/images/duck_hunt/49.png');
    game.load.image('50', '/images/duck_hunt/50.png');

    //score
    game.load.image('redScore', '/images/duck_hunt/red_score.png');
    game.load.image('blueScore', '/images/duck_hunt/blue_score.png');
    game.load.image('noScore', '/images/duck_hunt/no_score.png');

    //dog
    game.load.image('laugh1', '/images/duck_hunt/dog_laugh1.png');
    game.load.image('laugh2', '/images/duck_hunt/dog_laugh2.png');

    //bullets
    game.load.image('bullet', '/images/duck_hunt/bullet.png');
    //ducks
    game.load.image('dedDuck', '/images/duck_hunt/blue_shot.png');
    game.load.image('downDuck', '/images/duck_hunt/blue_down.png');
    //sounds
    game.load.audio('shotSound', '/sounds/duck_hunt/shot.wav')
    game.load.audio('quacks', '/sounds/duck_hunt/quacks.wav')
    game.load.audio('hit', '/sounds/duck_hunt/hit.wav')
    game.load.audio('fall', '/sounds/duck_hunt/fall.wav')
    game.load.audio('click', '/sounds/duck_hunt/click.wav')
    game.load.audio('honk', '/sounds/duck_hunt/honk.wav')
  },
  create: function(){
    //set stage
    game.stage.backgroundColor = '#40bdff';
    this.background = game.add.sprite( 0, 0, 'stage');
    // this.dog = game.add.sprite(450,700,'laugh1');

    //enable physics
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //initialize sounds
    this.shotSound = game.add.audio('shotSound');
    this.emptyGunSound = game.add.audio('click');
    this.quacks = game.add.audio('quacks');
    this.hit = game.add.audio('hit');
    this.fall = game.add.audio('fall');
    this.honk = game.add.audio('honk')

    //set up ducks
    this.ducks = [];
    this.answers = [];

    //set up data
    this.playerOneCorrect = [];
    this.playerOneWrong = [];
    this.playerTwoCorrect = [];
    this.playerTwoWrong = [];

    this.answer1 = game.add.text(0,0, "", { font: '25px Arial', fill: '#ffffff#' });
    this.answer1.anchor.setTo(.5,.5);
    this.answer2 = game.add.text(0,0, "", { font: '25px Arial', fill: '#ffffff#' });
    this.answer2.anchor.setTo(.5,.5);
    this.answer3 = game.add.text(0,0, "", { font: '25px Arial', fill: '#ffffff#' });
    this.answer3.anchor.setTo(.5,.5);

    //set players
    this.p1 = game.add.sprite( 250, 250, 'p1');
    this.p1.anchor.setTo( 0.5, 0.5 );
    this.inner1 = game.add.sprite( 250, 250, 'inner1');
    this.inner1.anchor.setTo( 0.5, 0.5 );
    game.physics.arcade.enable(this.p1);

    this.p2 = game.add.sprite( 750, 250, 'p2');
    this.p2.anchor.setTo( 0.5, 0.5 );
    this.inner2 = game.add.sprite( 750, 250, 'inner2');
    this.inner2.anchor.setTo( 0.5, 0.5 );
    game.physics.arcade.enable(this.p2);

    //initialize game
    this.p1Question = game.add.text(160,810,"", { font: '30px Arial', fill: '#ff5733' });
    this.p1Question.anchor.set(.5,0)
    this.p2Question = game.add.text(840,810,"", { font: '30px Arial', fill: '#4933ff' });
    this.p2Question.anchor.set(.5,0)
    this.round = 0;

    this.p1.canShoot = true;
    this.p2.canShoot = true;

    //move input keys
    this.p1up    = game.input.keyboard.addKey(Phaser.Keyboard.W);
    this.p1down  = game.input.keyboard.addKey(Phaser.Keyboard.S);
    this.p1right = game.input.keyboard.addKey(Phaser.Keyboard.D);
    this.p1left  = game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.p1shoot = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    this.p2up    = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    this.p2down  = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    this.p2right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    this.p2left  = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.p2shoot = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

    //initialize scoring
    this.score1 = [];
    this.score2 = [];

    //initialize bullets
    this.reload();

    //timers
    this.startRound();
  },
  update: function(){
    this.centerTarget();
    this.move();
    this.shoot();
  },

  checkOverlap: function(spriteA, duck) {
    if (duck){
      var boundsA = spriteA.getBounds();
      var boundsB = duck.sprite.getBounds();
      return Phaser.Rectangle.intersects(boundsA, boundsB);
    }
  },

  reload: function(){
    this.p1bullets = [1,1,1];
    this.p2bullets = [1,1,1];

    this.p1b1 = game.add.sprite( 100, 850, 'bullet');
    this.p1b2 = game.add.sprite( 150, 850, 'bullet');
    this.p1b3 = game.add.sprite( 200, 850, 'bullet');

    this.p2b1 = game.add.sprite( 775, 850, 'bullet');
    this.p2b2 = game.add.sprite( 825, 850, 'bullet');
    this.p2b3 = game.add.sprite( 875, 850, 'bullet');
  },

  fireBullets: function(player){
    if ( player === 1 ){
      if(this.p1bullets.length === 3){
        this.p1b3.destroy();
        this.p1bullets.pop();
        return true;
      }else if(this.p1bullets.length === 2){
        this.p1b2.destroy();
        this.p1bullets.pop();
        return true;
      }else if (this.p1bullets.length === 1){
        this.p1b1.destroy();
        this.p1bullets.pop();
        return true;
      }else{
        this.emptyGunSound.play();
        return false;
      }
    }
    if ( player === 2 ){
        if(this.p2bullets.length === 3){
        this.p2b3.destroy();
        this.p2bullets.pop();
        return true;
      }else if(this.p2bullets.length === 2){
        this.p2b2.destroy();
        this.p2bullets.pop();
        return true;
      }else if (this.p2bullets.length === 1){
        this.p2b1.destroy();
        this.p2bullets.pop();
        return true;
      }else{
        this.emptyGunSound.play();
        return false;
      }
    }
  },

  // player movement
  move: function(){
    if (this.p1up.isDown) { this.p1.y -= 5; }
    else if (this.p1down.isDown) { this.p1.y += 5; }
    if (this.p1right.isDown) { this.p1.x += 5; }
    else if (this.p1left.isDown) { this.p1.x -= 5; }

    if (this.p2up.isDown) { this.p2.y -= 5; }
    else if (this.p2down.isDown) { this.p2.y += 5; }
    if (this.p2right.isDown) { this.p2.x += 5; }
    else if (this.p2left.isDown) { this.p2.x -= 5; }
  },

  shoot: function(){
    if (this.p1shoot.isDown && this.p1.canShoot && this.fireBullets(1)){
      this.p1.canShoot = false;
      var that = this;
      setTimeout(function(){that.p1.canShoot = true}, 1000)
      shot1 = game.add.sprite(this.p1.x, this.p1.y, 'shot');
      shot1.anchor.setTo( 0.5, 0.5);
      setTimeout(function(){shot1.kill()},100);
      this.shotSound.play();
      if (this.ducks.length > 0){
        if (this.checkOverlap(this.inner1, this.ducks[0])){
          this.ducks[0].sprite.kill();
          this.ducks.splice(0,1);
          this.hitBird1()
        } else if (this.checkOverlap(this.inner1, this.ducks[1])){
          x = game.add.sprite(this.p1.x, this.p1.y, 'redX');
          x.anchor.setTo( 0.5, 0.5);
          setTimeout(function(){x.kill()},100);
          this.honk.play()
        } else if (this.checkOverlap(this.inner1, this.ducks[2])){
          x = game.add.sprite(this.p1.x, this.p1.y, 'redX');
          x.anchor.setTo( 0.5, 0.5);
          setTimeout(function(){x.kill()},100);
          this.honk.play();
        }
      }
    }
    if (this.p2shoot.isDown && this.p2.canShoot && this.fireBullets(2)){
      this.p2.canShoot = false;
      var that = this;
      setTimeout(function(){that.p2.canShoot = true}, 1000)
      shot2 = game.add.sprite(this.p2.x, this.p2.y, 'shot');
      shot2.anchor.setTo( 0.5, 0.5);
      setTimeout(function(){shot2.kill()},100);
      this.shotSound.play();

      if (this.ducks.length > 0){
        if (this.checkOverlap(this.inner2, this.ducks[0])){
          x = game.add.sprite(this.p2.x, this.p2.y, 'redX');
          x.anchor.setTo( 0.5, 0.5);
          setTimeout(function(){x.kill()},100);
          this.honk.play()
        } else if (this.checkOverlap(this.inner2, this.ducks[1])){
          this.ducks[1].sprite.kill();
          this.ducks.splice(1,1);
          this.hitBird2(this.ducks[1])
        } else if (this.checkOverlap(this.inner2, this.ducks[2])){
          x = game.add.sprite(this.p2.x, this.p2.y, 'redX');
          x.anchor.setTo( 0.5, 0.5);
          setTimeout(function(){x.kill()},100);
          this.honk.play()
        }
      }
    }
  },

  hitBird1: function(duck){
    xCord = this.inner1.x;
    yCord = this.inner1.y;
    var dedDuck = game.add.sprite(xCord, yCord, 'dedDuck');
    dedDuck.anchor.setTo(.5,.5);
    this.hit.play();
    this.updateScore(1);
    var that = this;
    this.answer1.text= ""
    setTimeout(function(){
      dedDuck.kill();
      var downDuck = game.add.sprite(xCord, yCord, 'downDuck');
      downDuck.anchor.setTo(.5,.5);
      game.physics.arcade.enable(downDuck);
      downDuck.body.velocity.y = 200;
      that.fall.play();
      that.reorderSprites();
    },500);
  },

  hitBird2: function(duck){
    xCord = this.inner2.x;
    yCord = this.inner2.y;
    var dedDuck = game.add.sprite(xCord, yCord, 'dedDuck');
    dedDuck.anchor.setTo(.5,.5);
    this.hit.play();
    this.updateScore(2);
    var that = this;
    this.answer2.text= ""
    setTimeout(function(){
      dedDuck.kill();
      var downDuck = game.add.sprite(xCord, yCord, 'downDuck');
      downDuck.anchor.setTo(.5,.5);
      game.physics.arcade.enable(downDuck);
      downDuck.body.velocity.y = 200;
      that.fall.play();
      that.reorderSprites();
    },500);
  },

  updateScore: function(player){
    if (player === 1){
      this.score1.push(1);
    } else if (player === 2){
      this.score2.push(1)
    }
    this.renderScore();
  },

  renderScore: function(){
    for (var i=0 ; i < this.score1.length ; i++){
      if (this.score1[i] === 1){
        game.add.sprite(311+(i*30 + 10),830,'redScore');
      } else if (this.score1[i] === 0){
        game.add.sprite(312+(i*30 +10),830,'noScore');
      }
    }

    for (var i=0 ; i < this.score2.length ; i++){
      if (this.score2[i] === 1){
        game.add.sprite(655-(i*30 + 20),830,'blueScore');
      } else if (this.score2[i] === 0){
        game.add.sprite(655-(i*30 + 20),830,'noScore');
      }
    }
  },

  centerTarget: function(){
    this.inner1.x = this.p1.x;
    this.inner1.y = this.p1.y;
    this.inner2.x = this.p2.x;
    this.inner2.y = this.p2.y;
  },

  spawnDucks: function(){
    this.round++
    if (this.round < 6){
      this.showRound(this.round);
    } else {
      this.gameOver();
    }
    this.ducks = [];
    this.reload();
    this.quacks.play();
    this.spawnQuestions();
  },

  gameOver: function(){
    var text = game.add.text(game.world.centerX, game.world.centerY, "Game Over", { font: "64px Arial", fill: "#000000", align: "center" });
    text.anchor.setTo(.5,.5);


  },

  showRound: function(round){
    var roundText = game.add.text(game.world.centerX, game.world.centerY, "Round "+ round.toString(), { font: "64px Arial", fill: "#000000", align: "center" });
    roundText.anchor.setTo(.5,.5);
    setTimeout(function(){ roundText.text = ""},1000);
    var that = this;
    setTimeout(function(){that.endRound() },10000);
  },

  endRound: function(){
    hits = this.ducks.length;

    if (this.score1.length < this.round){this.score1.push(0)}
    if (this.score2.length < this.round){this.score2.push(0)}

    for ( var i=0 ; i < this.ducks.length ; i++ )
    {
      this.ducks[i].speed = 10;
    }
    this.renderScore();
    this.callDog(hits);
  },

  startRound: function(){
    this.spawnDucks();
  },

  oneDuck: function(val){
    this.duck = new Duck(val, this.round);
    this.duck.init();
    this.ducks.push(this.duck);
    game.time.events.loop(1, this.duck.move, this);
    this.reorderSprites();
  },

  reorderSprites: function(){
    this.answer1.bringToTop();
    this.answer2.bringToTop();
    this.answer3.bringToTop();
    this.background.bringToTop();
    this.p1b1.bringToTop();
    this.p1b2.bringToTop();
    this.p1b3.bringToTop();
    this.p2b1.bringToTop();
    this.p2b2.bringToTop();
    this.p2b3.bringToTop();
    this.p1.bringToTop();
    this.p2.bringToTop();
    this.p1Question.bringToTop();
    this.p2Question.bringToTop();
    this.renderScore();
  },

  spawnQuestions: function(skill1,skill2){
    var num1 = 100;
    var num2 = 100;
    var num3 = 100;
    var num4 = 100;

      // switch(p2skill){

      //   case "Addition":
      //   p2text = param1.toString() + " + " + param2.toString()
      //     this.problem2.text = p2text
      //     var that = this;
      //     return (param1 + param2);
      //     break;

      //   case "Subtraction":
      //     param2 = param1 + param2;
      //     this.problem2.text = param2.toString() + " - " + param1.toString()
      //     var that = this;
      //     return (param2 - param1);
      //     break;

      //   case "Multiplication":
      //     this.problem2.text = param1.toString() + " * " + param2.toString()
      //     var that = this;
      //     return (param1 * param2);
      //     break;

      //   case "Division":
      //     this.problem2.text = (param1*param2).toString() + " / " + param1.toString()
      //     var that = this;
      //     return (param2);
      //     break;

      //   case "All":
      //     var select = Math.random();
      //     if (select < .25){
      //       this.problem2.text = param1.toString() + " + " + param2.toString()
      //       var that = this;
      //       return (param1 + param2);

      //     } else if (select < .5) {
      //       param2 = param1 + Math.floor(Math.random()*10);
      //       this.problem2.text = param2.toString() + " - " + param1.toString()
      //       var that = this;
      //       return (param2 - param1);

      //     } else if (select < .75) {
      //       this.problem2.text = param1.toString() + " * " + param2.toString()
      //       var that = this;
      //       return (param1 * param2);

      //     } else {
      //       this.problem2.text = (param1*param2).toString() + " / " + param2.toString()
      //       var that = this;
      //       return (param1);
      //     }
      //   break;
    while (num1+num2 > 50 || num3+num4 > 50 || num3+num4 === num1+num2){
      num1= Math.floor(Math.random()*10);
      num2= Math.floor(Math.random()*10);
      num3= Math.floor(Math.random()*10);
      num4= Math.floor(Math.random()*10);
    }
    this.oneDuck(num1+num2);
    this.oneDuck(num3+num4);

    this.p1Question.text = num1.toString() + " + " + num2.toString();
    this.p2Question.text = num3.toString() + " + " + num4.toString();

    var rand = Math.floor(Math.random()*20);
    while ( rand === num3+num4 || rand === num1+num2){
      rand = Math.floor(Math.random()*20);
    }
    this.oneDuck(rand);
    this.reorderSprites();
  },

  callDog: function(hits){
    var that = this;
    setTimeout(function(){that.spawnDucks() },3000);
  }
};

game.state.add('main', mainState);
game.state.start('main');
