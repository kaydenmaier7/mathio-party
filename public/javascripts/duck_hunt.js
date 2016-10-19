
var game = new Phaser.Game(1000,910, Phaser.auto, 'math-hunt');

function Duck() {
  this.xMove = 0;
  this.yMove = 0;
  this.sprite = game.add.sprite(Math.floor(Math.random()*800)+100, 650, 'ten');
  this.area = this.sprite.getBounds();
  this.sprite.anchor.setTo( 0.5, 0.5 );
  this.init = function(){
    game.physics.arcade.enable(this);
    this.checkWorldsBounds = true;
    this.outOfBoundsKill = true;
    game.time.events.loop(Math.random()*1200+800, this.randomDirection, this );
  };
  this.randomDirection =  function(){
    this.setXMove();
    this.setYMove();
  };
  this.setXMove = function(){
    this.xMove = Math.random()<0.5 ? -1: 1;
    this.xMove *= Math.random() * 1;
  };
  this.setYMove = function(){
    if (this.y < 500){
      this.yMove = Math.random()<0.5 ? -1: 1;
      return this.yMove *= Math.random() * 5;
    } else {
      return this.yMove = Math.random() * 1;
    }
  };
  this.move = function(){
    this.sprite.x += this.xMove;
    this.area.x = this.sprite.x;
    this.sprite.y -= this.yMove;
    this.area.y = this.sprite.y;
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
    //numbers
    game.load.image('one', '/images/duck_hunt/1.png');
    game.load.image('two', '/images/duck_hunt/2.png');
    game.load.image('three', '/images/duck_hunt/3.png');
    game.load.image('four', '/images/duck_hunt/4.png');
    game.load.image('five', '/images/duck_hunt/5.png');
    game.load.image('six', '/images/duck_hunt/6.png');
    game.load.image('seven', '/images/duck_hunt/7.png');
    game.load.image('eight', '/images/duck_hunt/8.png');
    game.load.image('nine', '/images/duck_hunt/9.png');
    game.load.image('ten', '/images/duck_hunt/10.png');
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
  },
  create: function(){
    //set stage
    game.stage.backgroundColor = '#40bdff';
    this.background = game.add.sprite( 0, 0, 'stage');

    //enable physics
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //initialize sounds
    this.shotSound = game.add.audio('shotSound');
    this.emptyGunSound = game.add.audio('click');
    this.quacks = game.add.audio('quacks');
    this.hit = game.add.audio('hit');
    this.fall = game.add.audio('fall');

    //set up ducks
    this.ducks = [];

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

    var print = true;
    //initialize bullets
    this.reload();

    //timers
    this.spawnDucks();
    // this.duckTimer = game.time.events.loop(10000, this.spawnDuck, this);
  },
  update: function(){
    this.centerTarget();
    this.move();
    this.shoot();

    if(this.p1shoot.isDown){ this.checkOverlap(this.inner1, this.ducks[0])}
    // if (this.ducks.length >0) {
    //   console.log(this.inner1.getBounds().x - this.ducks[0].area.x);
    //   if (this.checkOverlap(this.inner1, this.ducks[0])){
    //       console.log('duck1');
    //     } else if (this.checkOverlap(this.inner1, this.ducks[1])){
    //       console.log('duck2')
    //     } else if (this.checkOverlap(this.inner1, this.ducks[1])){
    //       console.log('duck3')
    //     }
    //   }
  },

  checkOverlap: function(spriteA, duck) {
    var boundsA = spriteA.getBounds();
    var boundsB = duck.area;
    console.log(boundsA);
    console.log(boundsB);

    if(Phaser.Rectangle.intersects(boundsA, boundsB)){console.log("overlap!")};
    // return Phaser.Rectangle.intersects(boundsA, boundsB);
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

  // player 1 movement
  move: function(){
    if (this.p1up.isDown) { this.p1.y -= 3; }
    else if (this.p1down.isDown) { this.p1.y += 3; }
    if (this.p1right.isDown) { this.p1.x += 3; }
    else if (this.p1left.isDown) { this.p1.x -= 3; }

    if (this.p2up.isDown) { this.p2.y -= 3; }
    else if (this.p2down.isDown) { this.p2.y += 3; }
    if (this.p2right.isDown) { this.p2.x += 3; }
    else if (this.p2left.isDown) { this.p2.x -= 3; }
  },

  shoot: function(){
    if (this.p1shoot.isDown && this.p1.canShoot && this.fireBullets(1)){
      this.p1.canShoot = false;
      var that = this;
      setTimeout(function(){that.p1.canShoot = true}, 1000)
      this.shot1 = game.add.sprite(this.p1.x, this.p1.y, 'shot');
      this.shot1.anchor.setTo( 0.5, 0.5);
      game.physics.arcade.enable(this.shot1);
      setTimeout(function(){that.shot1.kill()},100);
      this.shotSound.play();

      if (this.checkOverlap(this.inner1, this.ducks[0])){
        this.hitBird1(this.ducks[0])
      } else if (this.checkOverlap(this.inner1, this.ducks[1])){
        this.hitBird1(this.ducks[1])
      } else if (this.checkOverlap(this.inner1, this.ducks[1])){
        this.hitBird1(this.ducks[2])}
    }
    if (this.p2shoot.isDown && this.p2.canShoot && this.fireBullets(2)){
      this.p2.canShoot = false;
      var that = this;
      setTimeout(function(){that.p2.canShoot = true}, 1000)
      this.shot2 = game.add.sprite(this.p2.x, this.p2.y, 'shot');
      this.shot2.anchor.setTo( 0.5, 0.5);
      setTimeout(function(){that.shot2.kill()},100);
      this.shotSound.play();

      if (this.checkOverlap(this.inner2, this.duck.sprite)){this.hitBird2(this.duck)}
    }
  },

  hitBird1: function(duck){
    xCord = this.inner1.x;
    yCord = this.inner1.y;
    var dedDuck = game.add.sprite(xCord, yCord, 'dedDuck');
    this.hit.play();
    duck.body = null;
    duck.destroy();
    this.updateScore(1);
    var that = this;
    setTimeout(function(){
      dedDuck.kill();
      var downDuck = game.add.sprite(xCord, yCord, 'downDuck');
      game.physics.arcade.enable(downDuck);
      downDuck.body.velocity.y = 200;
      that.fall.play();
      that.reorderSprites();
    },500);
  },

  hitBird2: function(duck){
    var dedDuck = game.add.sprite(duck.x, duck.y, 'dedDuck');
    this.hit.play();
    duck.remove();
    this.updateScore(2);
    var that = this;
    setTimeout(function(){
      dedDuck.kill();
      var downDuck = game.add.sprite(duck.x, that.duck.y, 'downDuck');
      game.physics.arcade.enable(downDuck);
      downDuck.body.velocity.y = 200;
      that.fall.play();
      that.reorderSprites();
    },500);
  },
  updateScore: function(player){
    console.log('Updating');
  },

  centerTarget: function(){
    this.inner1.x = this.p1.x;
    this.inner1.y = this.p1.y;
    this.inner2.x = this.p2.x;
    this.inner2.y = this.p2.y;
  },

  spawnDucks: function(){
    this.quacks.play()
    var that = this
    // for(var i=0 ; i<3 ; i++){
      setTimeout(function(){that.oneDuck()},2000);
    // }
  },

  oneDuck: function(count){
    // if (count === 0) {
      this.duck = new Duck();
      this.duck.init();
      this.ducks.push(this.duck);
      game.time.events.loop(1, this.duck.move, this);
    // }
    // else if (count === 1) {
    //   this.duck2 = new Duck();
    //   this.duck2.init();
    //   game.time.events.loop(1, this.duck2.move, this);
    // }
    // else {
    //   this.duck3 = new Duck();
    //   this.duck3.init();
    //   game.time.events.loop(1, this.duck3.move, this);
    // }
    this.reorderSprites();
  },

  reorderSprites: function(){
    this.background.bringToTop();
    this.p1b1.bringToTop();
    this.p1b2.bringToTop();
    this.p1b3.bringToTop();
    this.p2b1.bringToTop();
    this.p2b2.bringToTop();
    this.p2b3.bringToTop();
    this.p1.bringToTop();
    this.p2.bringToTop();
  }
};

game.state.add('main', mainState);
game.state.start('main');
