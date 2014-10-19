'use strict';

// D3 directives module
angular.module("d3-bullet-module", [])

.constant('d3-bullet-config', {
  margin: {top: 0, right: 0, bottom: 0, left: 0},
})

.directive('d3Bullet', ['$window', 'd3-bullet-config', function($window, config) {

  return {
    restrict: 'E',
    scope: {
      markers: '=',
      measures: '=',
      ranges: '=',
      vizTitle: '=',
      margin: '=',
      height: '=',
      yFormat: '@',
      tickFormat: '@',
      orient: '@'
    },
    link: function(scope, element, attr) {

      var el = element[0],
          data = {
            markers: scope.markers,
            measures: scope.measures,
            ranges: scope.ranges,
            vizTitle: scope.vizTitle},
          margin = scope.margin || config.margin,
          width,
          height = (scope.height || 60) - margin.top - margin.bottom;

      var chart = d3.bullet()
        .height(height);

      chart.tickFormat(d3.format(scope.tickFormat));

      var svg = d3.select(el).selectAll("svg")
          .data([data])
        .enter().append("svg")
          .attr("class", "bullet");

      var g = svg.append("g");

      var gvizTitle = svg.append("g")
        .attr("class", "title")
        .style("text-anchor", "center");

      var vizTitle = gvizTitle.append("text")
        .attr("class", "vizTitle")
        .text(function(d) {
          return d.vizTitle;
        });

      scope.render = function() {
        width = d3.select(el).node().parentElement.offsetWidth - margin.left - margin.right;
        chart.width(width);

        svg
          .attr("width", width  + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom);

        g.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        g.datum(data).call(chart);

        gvizTitle.attr("transform", "translate(" + 0 + "," + margin.top + ")");
        vizTitle.attr("transform",
          "translate(" + (margin.left - 2) + "," + (margin.top + (height / 2)) + ")")
          .attr("text-anchor", "end");
      }

      scope.$watch(function() {
        return d3.select(el).node().parentElement.offsetWidth}, 
      function (newW, oldW) {
        scope.render();
      });

      angular.element($window).bind('resize', function () {
        scope.$apply();
      });

    }
  }
}]);
