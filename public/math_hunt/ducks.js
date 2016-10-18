var mainState= {
  preload: function(){
    game.load.image('stage', '/assets/duckassets/duck_background.png');
    //crosshairs
    game.load.image('inner1', '/assets/duckassets/p1_inner.png');
    game.load.image('inner2', '/assets/duckassets/p2_inner.png');
    game.load.image('p1', '/assets/duckassets/p1crosshairs.png');
    game.load.image('p2', '/assets/duckassets/p2crosshairs.png');

  },
  create: function(){
    //set stage
    game.stage.backgroundColor = '#40bdff';
    this.background = game.add.sprite( 0, 0, 'stage');

    //set players
    this.p1 = game.add.sprite( 250, 250, 'p1');
    this.p1.anchor.setTo( 0.5, 0.5 );
    this.inner1 = game.add.sprite( 250, 250, 'inner1');
    this.inner1.anchor.setTo( 0.5, 0.5 );

    this.p2 = game.add.sprite( 750, 250, 'p2');
    this.p2.anchor.setTo( 0.5, 0.5 );
    this.inner2 = game.add.sprite( 750, 250, 'inner2');
    this.inner2.anchor.setTo( 0.5, 0.5 );

  },
  update: function(){
    // keeps target center
    this.centerTarget


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
