import React, { Component } from 'react';
import { connect } from "react-redux";
import './map.css';
import * as d3 from 'd3';


const mapStateToProps = state => {
    return {
        sensors: state.rootReducer.sensors
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
        console.log(this.props.sensors)

        const svg = d3.select("#map")
                    .append("svg")
                    .attr("width", 1140)
                    .attr("height", 850);

        const circles = svg
                            .selectAll("circle")
                            .data(this.props.sensors)
                            .enter()
                            .append("circle");

        const circleAttributes = circles
                                    .attr("cx", function(d) {return d.x;})
                                    .attr("cy", function(d) {return d.y;})
                                    .attr("r", 30)                                    
                                    .attr("fill", function(d) {return d.color;})
                                    .on("click", (d) => {this.click(d);})
                                    .on("mouseover", (d) => {this.hover(d);});

    }

    render() {
        return (
            <div id="map"></div>
            
        );
    }
}

const Map = connect(mapStateToProps)(ConnectedMap);

export default Map;