import React, { Component } from 'react';
import { connect } from "react-redux";
import { decode } from 'base-64';

const mapStateToProps = state => {
    return {
        sensors: state.sensors
    };
};

class ConnectedHeatmap extends Component {
    constructor(props) {
        super(props)
    }    

    render() {
        return (
            <div>
                {this.props.sensors.map(sensor => (
                    <div>
                        <p>{sensor.devEUI}</p>
                        <p>{decode(sensor.data)}</p>
                    </div>
                ))}
            </div>
        );
    };
};

const Heatmap = connect(mapStateToProps)(ConnectedHeatmap);

export default Heatmap;