import React, { Component } from 'react';
import { connect } from "react-redux";
import './map.css';
import * as d3 from 'd3';
import ReactTooltip from 'react-tooltip';
import { push } from 'react-router-redux';
import { setCoord, setSensor } from '../../actions/actions';
import store from '../../store/store';
import AddForm from '../addForm/addForm';
import * as utils from '../../utils/utils';
import ReactLoading from 'react-loading';


const mapStateToProps = state => {
    return {
        sensors: state.rootReducer.sensors,
        loading: state.rootReducer.loading,
        floor: state.rootReducer.floor,
        coord: state.rootReducer.coord,
        adminMode: state.rootReducer.adminMode,
        selectedSensor: state.selectedSensor
    };
};

const mapDispatchToProps = {
    setCoord,
    setSensor
};

class ConnectedMap extends Component {
    constructor(props) {
        super(props)

        this.click = this.click.bind(this);
        this.hover = this.hover.bind(this);
        this.getCoord = this.getCoord.bind(this);
        this.drawMap = this.drawMap.bind(this);
        
    }

    click(data) {
        utils.getSensor(utils.sensorsLink, data.serialID);
    }

    hover(data) {
        // console.log(data);
    }

    getCoord(data) {
        if (this.props.adminMode) {
            this.props.setCoord({
                xCoord: data.nativeEvent.offsetX,
                yCoord: data.nativeEvent.offsetY
            });
        }
    }

    drawMap() {
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

    componentDidUpdate() {
        d3.select("#map").select("svg").remove();
        this.drawMap();
    }

    componentDidMount() {
        this.drawMap();
    }

    render() {
        const sensors = this.props.sensors.filter(sensor => sensor.floor === this.props.floor);
        if (this.props.loading) {
            return <ReactLoading className="busy wrapper" type="spinningBubbles" color="grey" height={100} width={100} />
        }
        return ([
            <div id="map" key="map" className={this.props.floor.toString()} onClick={this.getCoord}>
                {sensors.map((sensor, index) => (
                    <ReactTooltip key={index} id={sensor.serialID.toString()} type='info' effect='solid'>
                        <span className='reading'>ID: {sensor.serialID}</span>
                        <span className='reading'>Name: {sensor.name}</span>
                        <span className='reading'>Temperature: {sensor.temperature}</span>
                        <span className='reading'>Humidity: {sensor.humidity}</span>
                    </ReactTooltip>
                ))}
            </div>,
            <AddForm key="addForm" />
            ]);
    }
}

const Map = connect(mapStateToProps, mapDispatchToProps)(ConnectedMap);

export default Map;