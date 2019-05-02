import React, { Component } from 'react';
import { connect } from "react-redux";
import ReactLoading from 'react-loading';
import * as d3 from 'd3';
import './sensor.css';

const mapStateToProps = state => {
    return {
        loading: state.rootReducer.loading,
        floor: state.rootReducer.floor,
        adminMode: state.rootReducer.adminMode,
        selectedSensor: state.rootReducer.selectedSensor
    };
};

class ConnectedSensor extends Component {
    constructor(props) {
        super(props)

        this.drawChart = this.drawChart.bind(this);
    }

    componentDidMount() {
        this.drawChart();
    }

    drawChart() {
        const svg = d3.select("#graph")
                    .append("svg");
        
        const margin = {top: 20, right: 30, bottom: 30, left: 40};
        const width = document.getElementsByClassName("container")[0].clientWidth - margin.left - margin.right;
        const height = ((width + margin.top + margin.bottom) * 0.5);
        
        //Setting dimensions of the svg element
        svg.attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom);

        const parseDate = d3.timeParse("%b %Y");
        const formatDate = d3.timeFormat("%b %Y");

        const x = d3.scaleTime().range([0, width]);
        const y = d3.scaleLinear().range([height, 0]);

        const xAxis = d3.axisBottom(x);
        const yAxis = d3.axisLeft(y);

        const zoom = d3.zoom()
                    .scaleExtent([1, 32])
                    .translateExtent([[0, 0], [width, height]])
                    .extent([[0, 0], [width, height]])
                    .on("zoom", zoomed);

        const area = d3.area()
                    .curve(d3.curveMonotoneX)
                    .x(function(d) { return x(new Date(d.timestamp)); })
                    .y0(height)
                    .y1(function(d) { return y(d.temperature) });
        
        svg.append("defs").append("clipPath")
            .attr("id", "clip")
            .append("rect")
            .attr("width", width)
            .attr("height", height);
        
        const g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        const data = this.props.selectedSensor.history;

        x.domain(d3.extent(data, function(d) { return new Date(d.timestamp) }));
        y.domain([15, d3.max(data, function(d) { return d.temperature })]);

        g.append("path")
            .datum(data)
            .attr("class", "area")
            .attr("d", area)
        
        g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0, " + height + ")")
            .call(xAxis);

        g.append("g")
            .attr("class", "axis axis--y")
            .call(yAxis);

        const d0 = new Date(data[0].timestamp);
        const d1 = new Date(data[data.length - 1].timestamp);

        svg.call(zoom).transition()
            .duration(1500)
            .call(zoom.transform, d3.zoomIdentity
                .scale(width / (x(d1) - x(d0)))
                .translate(-x(d0), 0));

        function zoomed() {
            const t = d3.event.transform;
            const xt = t.rescaleX(x);
            g.select(".area").attr("d", area.x(function(d) { return xt(new Date(d.timestamp)); }));
            g.select(".axis--x").call(xAxis.scale(xt));
        }

        // const width = document.getElementsByClassName("container")[0].clientWidth - margin.left - margin.right;
        // const height = (width * 0.5) - margin.top - margin.bottom;
        
        // const points = 20;
        // const xScale = d3.scaleLinear()
        //         .domain([0, points - 1])
        //         .range([0, width]);
        
        // const yScale = d3.scaleLinear()
        //         .domain([15, 30])
        //         .range([height, 0]);

        // const line = d3.line()
        //         .x(function(d, i) { return xScale(new Date(i)); })
        //         .y(function(d) { return yScale(d.temperature); });

        // const data = this.props.selectedSensor.history;

        // const svg = d3.select("#graph")
        //             .append("svg")
        //             .attr("width", width + margin.left + margin.right)
        //             .attr("height", height + margin.top + margin.bottom)
        //             .append("g")
        //                 .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        // svg.append("g")
        //     .attr("class", "x axis")
        //     .attr("transform", "translate(0," + height + ")")
        //     .call(d3.axisBottom(xScale));

        // svg.append("g")
        //     .attr("class", "y axis")
        //     .call(d3.axisLeft(yScale));

        // svg.append("path")
        //     .datum(data)
        //     .attr("class", "line")
        //     .attr("d", line);
        
    }

    render() {
        if (this.props.loading) {
            return <ReactLoading className="busy wrapper" type="spinningBubbles" color="grey" height={100} width={100} />
        }
        return ([
            <div key="sensor" className="sensor-graph">
                <h1>{this.props.selectedSensor.name} - {this.props.selectedSensor.serialID}</h1>
                <div className="graph" id="graph"></div>
            </div>
        ])
    }
}

const Sensor = connect(mapStateToProps)(ConnectedSensor);

export default Sensor;