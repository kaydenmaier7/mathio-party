$(document).ready(function(){

  var width = $('.games-main').width();
  var height = $('.games-main').height();
  var buttonSize = 80;
  var buttonY = height * 0.68;
  var games = [
      ['flappy_bird', 'http://files.gamebanana.com/img/ico/sprays/538578b593b47.gif'], 
      ['frogger', 'http://andyluvsdonna.com/wp-content/uploads/2015/02/frogger-1.png'], 
      ['othergame', 'http://www.pngmart.com/files/3/Spaceship-PNG-Pic.png'], 
      ['othergame', 'http://vignette3.wikia.nocookie.net/metalslug/images/d/d7/192064fb7b55d9f8569231678ee1e333.jpg.gif/revision/latest?cb=20160109031801&path-prefix=es'], 
      ['othergame', 'http://www.retrogamenetwork.com/wp-content/uploads/2012/05/rand-avatar.png']
    ]

  // generate svg element
  d3.select('.games-main').selectAll('svg')
    .data([null])
    .enter()
    .append('svg')
    .style('width', width)
    .style('height', height);

  var svg = d3.select("svg");

  // add game-images
  function makeImage() {
    svg.selectAll("image")
      .data(games)
      .enter()
      .append("image")
      .attr("y", 100)
      .attr("x", -100)
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
      .delay( function(d, i){ return 150 * i } )      
      .duration(1500)
      .attr('x', function(d, i){ return width - ((i + 0.5) * (width / games.length)) });
  }

  // move the images down to their final positions
  function moveImageDown() {
    svg.selectAll('.game')
      .transition()
      .delay( function(d, i){ return 50 * i })
      .duration(1000)
      .attr('y', buttonY);
  }

  function magnify(){
    svg.selectAll('.game')
      .on("mouseover", function(){
        d3.select(this)
          .transition()
          .duration(300)
          .attr('y', buttonY - buttonSize/2)
          .attr('height', buttonSize * 1.5)
          .attr('width', buttonSize * 1.5);
      })
      .on("mouseout", function(){
        d3.select(this)
          .transition()
          .duration(300)
          .attr('y', buttonY)
          .attr('height', buttonSize)
          .attr('width', buttonSize);
      });
  };

  makeImage(games);
  moveImageRight()
  setTimeout(moveImageDown, 1500);
  setTimeout(magnify, 2000);


});
