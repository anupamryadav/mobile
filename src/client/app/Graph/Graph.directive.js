(function() {
    //  'use strict';

    angular
        .module('app.Graph')
        .directive('distributionBasePayGraph', distributionBasePayGraph); // TODO: Rename directive name according to graph

    function distributionBasePayGraph() {

        var directive = {};

        directive.templateUrl = "app/graph/distributionBasePayGraphTpl.html";
        directive.restrict = "E";
        directive.scope = {
            // id: "@"
        };
        //  directive.controller = 'distributionBasePayGraphCtl as distributionBasePayGraphCtl';  // TODO: create controller and load mockup json from service
        directive.link = function(scope, element, attrs, controller) {
            //   debugger;
            var jsonrect = [
                { "Amount": 40, "Text": "Talent Priorities Below Target Salary", "index": 1 },
                { "Amount": 10, "Text": "Talent Priorities Above Target Salary", "index": 2 },
                { "Amount": 30, "Text": "All Other Below Taget Salary", "index": 4 },
                { "Amount": 10, "Text": "All Other Above Target Salary", "index": 3 },
                { "Amount": 10, "Text": "Improve Performance", "index": 5 }
            ];
            var margin = { top: 50, right: 20, bottom: 10, left: 65 },
                width = 1000 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;

            jsonrect = jsonrect.sort(function(a, b) { return a.index - b.index; });

            //  the size of the overall svg element
            var height = 400,
                width = 600;

            //Scaling the values
            var minWidth = d3.min(jsonrect, function(d) {
                return d.Amount;
            });

            var maxWidth = d3.max(jsonrect, function(d) {
                return d.Amount;
            });

            //var linearScale = d3.scaleLinear.domain([0, 100]).range([0, width - 100]);

            //var xAxis = d3.svg.axis().scale(linearScale).orient("bottom").ticks(10).tickFormat(function (d) { return d + "%" }).tickSize(-height);

            var linearScale = d3.scaleLinear().domain([0, 100]).range([0, width - 100]);

            var xAxis = d3.axisBottom(linearScale).ticks(10).tickFormat(function(d) { return d + "%" }).tickSize(-height);

            for (var i = 0; i < jsonrect.length; i++) {

                jsonrect[i]["x_axis"] = 0;
                jsonrect[i]["x_axisLeg"] = 0;
                if (jsonrect[i].index === 1) {
                    jsonrect[i].x_axis = 0;
                    jsonrect[i]["x_axisLeg"] = 0;
                }
                if (jsonrect[i].index > 1) {
                    jsonrect[i].x_axis = linearScale(jsonrect[i - 1].Amount) + jsonrect[i - 1].x_axis;
                    // jsonrect[i].x_axisLeg = 200 + jsonrect[i - 1].x_axis + 10;
                }


            }

            var div = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);

            var svg = d3.select('#bar-chart').append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom).append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            svg.append('g').attr("class", "x axis").attr("transform", "translate(0," + (height - 320) + ")").call(xAxis);

            svg.selectAll('rect').data(jsonrect)
                .enter().append('rect').attr('x', function(d) {
                    return d.x_axis
                })
                .attr('y', function(d) { return 0 }).attr('height', '35px')
                .attr('width', function(d) { return linearScale(d.Amount); })
                .attr("class", function(d) {
                    if (d.index === 1) {
                        return "below-target";
                    } else if (d.index === 2) {
                        return "above-target";

                    } else if (d.index === 3) {
                        return "talent-other-below-sal";
                    } else if (d.index === 4) {
                        return "talent-other-above-sal";
                    } else if (d.index === 5) {
                        return "improve-perform";
                    }
                }).on("mouseover", function(d) {
                    div.transition()
                        .duration(200)
                        .style("opacity", .9);
                    div.html(d.Text + " " + d.Amount + " %")
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");
                }).on("mouseout", function(d) {
                    div.transition()
                        .duration(500)
                        .style("opacity", 0);
                });


            var startp = svg.append("g").attr("class", "legendbox").attr("id", "mylegendbox");

            var legend_tabs = [0, 200, 400, 600, 800];
            var legend = startp.selectAll(".legend")
                .data(jsonrect)
                .enter().append("g")
                .attr("class", "legend")
                .attr("transform", function(d, i) { return "translate(" + legend_tabs[i] + ",-45)"; });

            legend.append("rect")
                .attr("x", 0)
                .attr("y", 200)
                .attr("width", 10)
                .attr("height", 10)
                .attr("class", function(d) {

                    if (d.Text === "Talent Priorities Below Target Salary") {
                        return "below-target";
                    } else if (d.Text === "Talent Priorities Above Target Salary") {
                        return "above-target";

                    } else if (d.Text === "All Other Below Taget Salary") {
                        return "talent-other-below-sal";
                    } else if (d.Text === "All Other Above Target Salary") {
                        return "talent-other-above-sal";
                    } else if (d.Text === "Improve Performance") {
                        return "improve-perform";
                    }
                })

            legend.append("text")
                .attr("x", 22)
                .attr("y", 206)
                .attr("dy", ".35em")
                .style("text-anchor", "begin")
                .style("font", "10px sans-serif")
                .text(function(d) { return d.Text; });
            // var movesize = width / 2 - startp.node().getBBox().width / 2;
            d3.selectAll(".legendbox").attr("transform", "translate(20,0)");
        };

        return directive;

    }

})();