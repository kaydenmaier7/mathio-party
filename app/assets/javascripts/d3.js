$(document).ready(function(){

  var width = $('.games-main').width();
  var height = $('.games-main').height();
  var buttonSize = 200;
  var buttonY = height * 0.6;
  var games = [
      ['flappy_bird', '/images/game_icons/flappy_bird.gif'],
      ['frogger', '/images/game_icons/frogger.png'],
      ['invasion', 'http://bestanimations.com/Animals/Mammals/Bulls&Cows/cute-cartoon-cow-animation-3.gif'],
      ['duck_hunt', 'http://rs273.pbsrc.com/albums/jj224/Vistico/duck_hunt_bird.gif~c200'],
      ['leaderboards', '/images/game_icons/leaderboard.png']
    ]

  // generate svg element
  d3.select('.games-main').selectAll('svg')
    .data([null])
    .enter()
    .append('svg')
    .style('width', width)
    .style('height', height)
    .classed('game-index-svg', true);

  var svg = d3.select(".game-index-svg");

  // add game-images
  function makeImage() {
    svg.selectAll("image")
      .data(games)
      .enter()
      .append("image")
      .attr("y", 100)
      .attr("x", -200)
      .attr("class", function(d){ return d[0] })
      .classed('game', true)
      .attr('xlink:href', function(d){ return d[1] })
      .attr('height', buttonSize)
      .attr('width', buttonSize)
      .style('fill', 'red');
  };

  // move the images onto the screen
  function moveImageRight() {
    svg.selectAll('.game')
      .transition()
      .delay( function(d, i){ return 250 * i } )
      .duration(1500)
      .attr('x', function(d, i){ return width - ((i + 0.5) * (width / games.length)) -100 });
  }

  // move the images down to their final positions
  function moveImageDown() {
    svg.selectAll('.game')
      .transition()
      .delay( function(d, i){ return 150 * i })
      .duration(1000)
      .attr('y', buttonY);
  }

  // enlarge game images when the user has their mouse over them
  function magnify(){
    svg.selectAll('.game')
      .on("mouseover", function(){
        d3.select(this)
          .transition()
          .duration(200)
          .attr('y', buttonY - buttonSize/2)
          .attr('height', buttonSize * 1.5)
          .attr('width', buttonSize * 1.5);

          if ($(this).hasClass('frogger')){
            $('#frogger-frontpage-div').show(500)
          } else if ($(this).hasClass('invasion')){
            $('#invasion-frontpage-div').show(500)
          } else if ($(this).hasClass('flappy_bird')){
            $('#flappy-frontpage-div').show(500)
          } else if ($(this).hasClass('duck_hunt')){
            $('#duck-frontpage-div').show(500)
          } else if ($(this).hasClass('leaderboards')){
            $('#leaderboards-frontpage-div').show(500)
          }

      })
      .on("mouseout", function(){
        d3.select(this)
          .transition()
          .duration(200)
          .attr('y', buttonY)
          .attr('height', buttonSize)
          .attr('width', buttonSize);

                 if ($(this).hasClass('frogger')){
                  $('#frogger-frontpage-div').hide(500)
                } else if ($(this).hasClass('invasion')){
                  $('#invasion-frontpage-div').hide(500)
                } else if ($(this).hasClass('flappy_bird')){
                  $('#flappy-frontpage-div').hide(500)
                } else if ($(this).hasClass('duck_hunt')){
                  $('#duck-frontpage-div').hide(500)
                } else if ($(this).hasClass('leaderboards')){
                  $('#leaderboards-frontpage-div').hide(500)
                }
      });
  };

  // navigate to the game represented by the image
    // when the user clicks on them
  function navigate() {
    svg.selectAll('.game')
      .on("click", function(){
        if ($(this).hasClass("frogger")) {
          var gameUrl = '/games/1'
        } else if ($(this).hasClass("flappy_bird")) {
          var gameUrl = 'games/2'
        } else if ($(this).hasClass("invasion")) {
          var gameUrl = 'games/3'
        } else if ($(this).hasClass("duck_hunt")) {
          var gameUrl = 'games/4'
        } else if ($(this).hasClass("leaderboards")) {
          var gameUrl = '/users'
        }
        // add in more conditionals for future games
        $.ajax({
          method: "get",
          url: gameUrl
        })
          .done(function(data){
            // This is just replacing the body content, not really redirecting
            $("body").empty().append(data);
          });
      });
  };


  makeImage(games);
  moveImageRight()
  setTimeout(moveImageDown, 1500);
  setTimeout(magnify, 2000);
  navigate();

});
