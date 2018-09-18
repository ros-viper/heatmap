import React, { Component } from 'react';
import { connect } from "react-redux";
import * as utils from '../../utils/utils';
import Map from '../map/map';
import store from '../../store/store';

const mapStateToProps = state => {
    return {
        sensors: state.rootReducer.sensors
    };
};

class ConnectedHeatmap extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        utils.getSensors(utils.sensorsLink);
    }

    componentDidMount() {
        
    }

    render() {
        return (
            <Map />
            // <div>
            //     {this.props.sensors.map(sensor => (
            //         <div>
            //             <p>{sensor.serialID}</p>
            //             <p>{sensor.temperature}</p>
            //         </div>
            //     ))}
            // </div>
        );
    };
};

const Heatmap = connect(mapStateToProps)(ConnectedHeatmap);

export default Heatmap;