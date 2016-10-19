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
    game.load.image('one', '/images/duck_hunt/1.png')
    game.load.image('two', '/images/duck_hunt/2.png')
    game.load.image('three', '/images/duck_hunt/3.png')
    game.load.image('four', '/images/duck_hunt/4.png')
    game.load.image('five', '/images/duck_hunt/5.png')
    game.load.image('six', '/images/duck_hunt/6.png')
    game.load.image('seven', '/images/duck_hunt/7.png')
    game.load.image('eight', '/images/duck_hunt/8.png')
    game.load.image('nine', '/images/duck_hunt/9.png')
    game.load.image('ten', '/images/duck_hunt/10.png')
    //sounds
    game.load.audio('shotSound', '/sounds/duck_hunt/shot.wav')
    game.load.audio('quacks', '/sounds/duck_hunt/quacks.wav')
    game.load.audio('hit', '/sounds/duck_hunt/hit.wav')
    game.load.audio('fall', '/sounds/duck_hunt/fall.wav')
  },
  create: function(){
    //set stage
    game.stage.backgroundColor = '#40bdff';
    this.background = game.add.sprite( 0, 0, 'stage');

    //enable physics
    game.physics.startSystem(Phaser.Physics.ARCADE);

    this.shotSound = game.add.audio('shotSound');

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

    //move input keys
    this.p1up    = game.input.keyboard.addKey(Phaser.Keyboard.W);
    this.p1down  = game.input.keyboard.addKey(Phaser.Keyboard.S);
    this.p1right = game.input.keyboard.addKey(Phaser.Keyboard.D);
    this.p1left  = game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.p1shoot = game.input.keyboard.addKey(Phaser.Keyboard.SPACE);

    this.p2up    = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    this.p2down  = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    this.p2right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    this.p2left  = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.p2shoot = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
  },
  update: function(){
    // keeps target center
    this.centerTarget();
    this.move();
    this.shoot();
  },

  reload: function(){
    this.p1bullets =[1,1,1];
    this.p2bullets =[1,1,1];
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

  shoot:function(){
    if (p1shoot){
      shot = game.add.sprite(this.p1.x, this.p1.y, 'shot')
      setTimeout(function(){shot.kill},100);
      this.shotSound.play();
    }
  },

  centerTarget: function(){
    this.inner1.x = this.p1.x;
    this.inner1.y = this.p1.y;
    this.inner2.x = this.p2.x;
    this.inner2.y = this.p2.y;
  }
};

var game = new Phaser.Game(1000,910, Phaser.auto, 'math-hunt');

game.state.add('main', mainState);
game.state.start('main');
