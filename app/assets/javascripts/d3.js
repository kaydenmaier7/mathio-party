$(document).ready(function(){
  var width = $('.games-main').width();
  var height = $('.games-main').height();
  var games = ['flappy bird', 'frogger', 'othergame', 'othergame', 'othergame']

  d3.select('.games-main').selectAll('svg')
    .data([null])
    .enter()
    .append('svg')
    .style('width', width)
    .style('height', height);

  var svg = d3.select("svg");

  function makeCircle() {
    var circle = svg.selectAll("circle")
      .data(games);
    
    circle.enter().append("circle")
      .attr("cy", 100)
      .attr("cx", -30)
      .attr("r", 18)
      .attr("class", function(d){ return d });
  };

  function moveCircleRight() {
    svg.selectAll('circle')
      .transition()
      .delay( function(d, i){ return 150 * i } )
      .duration(1500)
      .attr('cx', function(d, i){ return width - ((i + 0.5) * (width / games.length)) });
  };

  function moveCircleDown() {
    svg.selectAll('circle')
      .transition()
      .delay( function(d, i){ return 50 * i })
      .duration(1000)
      .attr('cy', height * 0.8);
  };

  makeCircle(games);
  moveCircleRight()
  setTimeout(moveCircleDown, 1500);

});
