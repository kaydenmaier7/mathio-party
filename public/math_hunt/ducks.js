var mainState= {
  preload: function(){
    game.load.image('stage', '/assets/duckassets/duck_background.png');
    //crosshairs
    game.load.image('inner1', '/assets/duckassets/p1_inner.png');
    game.load.image('inner2', '/assets/duckassets/p2_inner.png');
    game.load.image('p1', '/assets/duckassets/p1crosshairs.png');
    game.load.image('p2', '/assets/duckassets/p2crosshairs.png');
    //numbers
    game.load.image('one', '/assets/duckassets/1.png')
    game.load.image('two', '/assets/duckassets/2.png')
    game.load.image('three', '/assets/duckassets/3.png')
    game.load.image('four', '/assets/duckassets/4.png')
    game.load.image('five', '/assets/duckassets/5.png')
    game.load.image('six', '/assets/duckassets/6.png')
    game.load.image('seven', '/assets/duckassets/7.png')
    game.load.image('eight', '/assets/duckassets/8.png')
    game.load.image('nine', '/assets/duckassets/9.png')
    game.load.image('ten', '/assets/duckassets/10.png')
  },
  create: function(){
    //set stage
    game.stage.backgroundColor = '#40bdff';
    this.background = game.add.sprite( 0, 0, 'stage');

    game.physics.startSystem(Phaser.Physics.ARCADE);

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
  }

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

  }



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
