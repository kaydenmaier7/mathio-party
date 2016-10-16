$(document).ready(function(){
  var width = $('.games-main').width();
  var height = $('.games-main').height();
  var games = [
      ['flappy bird', 'http://files.gamebanana.com/img/ico/sprays/538578b593b47.gif'], 
      ['frogger', 'http://andyluvsdonna.com/wp-content/uploads/2015/02/frogger-1.png'], 
      ['othergame', 'http://www.pngmart.com/files/3/Spaceship-PNG-Pic.png'], 
      ['othergame', 'http://vignette3.wikia.nocookie.net/metalslug/images/d/d7/192064fb7b55d9f8569231678ee1e333.jpg.gif/revision/latest?cb=20160109031801&path-prefix=es'], 
      ['othergame', 'http://www.retrogamenetwork.com/wp-content/uploads/2012/05/rand-avatar.png']
    ]

  d3.select('.games-main').selectAll('svg')
    .data([null])
    .enter()
    .append('svg')
    .style('width', width)
    .style('height', height);

  var svg = d3.select("svg");

  function makeImage() {
    var image = svg.selectAll("image")
      .data(games);
    
    image
      .enter()
      .append("image")
      .attr("y", 100)
      .attr("x", -100)
      .attr("class", function(d){ return d[0] })
      .classed('game', true)
      .attr('xlink:href', function(d){ return d[1] })
      .attr('height', 80)
      .attr('width', 80)
      .style('fill', 'red');
  };

  function moveImageRight() {
    svg.selectAll('.game')
      .transition()
      .delay( function(d, i){ return 150 * i } )      
      .duration(1500)
      .attr('x', function(d, i){ return width - ((i + 0.5) * (width / games.length)) });
  }

  function moveImageDown() {
    svg.selectAll('.game')
      .transition()
      .delay( function(d, i){ return 50 * i })
      .duration(1000)
      .attr('y', height * 0.77);
  }

  makeImage(games);
  moveImageRight()
  setTimeout(moveImageDown, 1500);

});
