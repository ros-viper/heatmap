import React, { Component } from 'react';
import { connect } from "react-redux";
import * as utils from '../../utils/utils';

const mapStateToProps = state => {
    return {
        sensors: state.sensors
    };
};

class ConnectedHeatmap extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        utils.getSensors(utils.sensorsLink);
    }

    render() {
        return (
            <div>
                {this.props.sensors.map(sensor => (
                    <div>
                        <p>{sensor.serialID}</p>
                        <p>{sensor.temperature}</p>
                    </div>
                ))}
            </div>
        );
    };
};

const Heatmap = connect(mapStateToProps)(ConnectedHeatmap);

export default Heatmap;