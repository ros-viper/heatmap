import React, { Component } from 'react';
import { connect } from "react-redux";
import './map.css';
import * as d3 from 'd3';
import ReactTooltip from 'react-tooltip';


const mapStateToProps = state => {
    return {
        sensors: state.rootReducer.sensors,
        loading: state.rootReducer.loading,
        floor: state.rootReducer.floor
    };
};

class ConnectedMap extends Component {
    constructor(props) {
        super(props)

        this.click = this.click.bind(this);
        this.hover = this.hover.bind(this);
    }

    click(data) {
        console.log(data);
    }

    hover(data) {
        console.log(data);
    }

    componentDidUpdate() {
       d3.select("#map").select("svg").remove();

       const sensors = this.props.sensors.filter(sensor => sensor.floor === this.props.floor);

        const svg = d3.select("#map")
                    .append("svg")
                    .attr("width", 1140)
                    .attr("height", 850);

        const circles = svg
                            .selectAll("circle")
                            .data(sensors)
                            .enter()
                            .append("a")
                            .attr("data-for", function(d) {return d.serialID;})
                            .attr("data-tip", "")
                            .append("circle");

        const circleAttributes = circles
                                    .attr("cx", function(d) {return d.x;})
                                    .attr("cy", function(d) {return d.y;})
                                    .attr("r", 30)
                                    .attr("fill", function(d) {return d.color;})
                                    .on("click", (d) => {this.click(d);})
                                    .on("mouseover", (d) => {this.hover(d);});
        // Rebind tooltips after trigerring anchors are added by D3
        ReactTooltip.rebuild()
    }

    componentDidMount() {

        const sensors = this.props.sensors.filter(sensor => sensor.floor === this.props.floor);

        const svg = d3.select("#map")
                    .append("svg")
                    .attr("width", 1140)
                    .attr("height", 850);

        const circles = svg
                            .selectAll("circle")
                            .data(sensors)
                            .enter()
                            .append("a")
                            .attr("data-for", function(d) {return d.serialID;})
                            .attr("data-tip", "")
                            .append("circle");

        const circleAttributes = circles
                                    .attr("cx", function(d) {return d.x;})
                                    .attr("cy", function(d) {return d.y;})
                                    .attr("r", 30)
                                    .attr("fill", function(d) {return d.color;})
                                    .on("click", (d) => {this.click(d);})
                                    .on("mouseover", (d) => {this.hover(d);});
        // Rebind tooltips after trigerring anchors are added by D3
        ReactTooltip.rebuild()
        
    }

    render() {
        const sensors = this.props.sensors.filter(sensor => sensor.floor === this.props.floor);
        return (
            <div>
                <div id="map" className={this.props.floor.toString()}></div>
                
                {sensors.map((sensor, index) => (
                    <ReactTooltip key={index} id={sensor.serialID.toString()} type='info' effect='solid'>
                        <span className='reading'>ID: {sensor.serialID}</span>
                        <span className='reading'>Temperature: {sensor.temperature}</span>
                        <span className='reading'>Humidity: {sensor.humidity}</span>
                        <span className='reading'>Luminosity: {sensor.luminosity}</span>
                    </ReactTooltip>
                ))}
            </div>
        );
    }
}

const Map = connect(mapStateToProps)(ConnectedMap);

export default Map;