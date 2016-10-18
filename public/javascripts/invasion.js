$(document).ready(function(){
  loadGame()
})


var loadGame = function(){
  $('#invasion').html('')
  game = new Phaser.Game(1000, 600, Phaser.AUTO, 'invasion');
}
