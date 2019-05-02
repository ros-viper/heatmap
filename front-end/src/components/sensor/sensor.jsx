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
        const margin = {
            top: 20,
            right: 30,
            bottom: 30,
            left: 40            
        };


        const width = document.getElementsByClassName("container")[0].clientWidth - margin.left - margin.right;
        const height = (width * 0.5) - margin.top - margin.bottom;
        
        const points = 20;
        const xScale = d3.scaleLinear()
                .domain([0, points - 1])
                .range([0, width]);
        
        const yScale = d3.scaleLinear()
                .domain([15, 30])
                .range([height, 0]);

        const line = d3.line()
                .x(function(d, i) { return xScale(new Date(i)); })
                .y(function(d) { return yScale(d.temperature); });

        const data = this.props.selectedSensor.history;

        const svg = d3.select("#graph")
                    .append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xScale));

        svg.append("g")
            .attr("class", "y axis")
            .call(d3.axisLeft(yScale));

        svg.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("d", line);
        
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