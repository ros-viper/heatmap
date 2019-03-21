import React, { Component } from 'react';
import { connect } from "react-redux";
import ReactLoading from 'react-loading';
import { push } from 'react-router-redux';
import { Button, ButtonToolbar } from 'react-bootstrap';
import Toolbar from "../toolbar/toolbar"
import store from '../../store/store';

const mapStateToProps = state => {
    return {
        sensors: state.rootReducer.sensors,
        loading: state.rootReducer.loading,
        floor: state.rootReducer.floor,
        coord: state.rootReducer.coord,
        adminMode: state.rootReducer.adminMode,
        selectedSensor: state.rootReducer.selectedSensor
    };
};

class ConnectedSensor extends Component {
    constructor(props) {
        super(props)
        
        this.goToMap = this.goToMap.bind(this);
    }

    goToMap() {
        store.dispatch(push('/'));
    }

    render() {
        if (this.props.loading) {
            return <ReactLoading className="busy wrapper" type="spinningBubbles" color="grey" height={100} width={100} />
        }
        return (
            // <div className="sensor">{this.props.selectedSensor.serialID}</div>
            <Toolbar location="sensor"></Toolbar>
        )
    }
}

const Sensor = connect(mapStateToProps)(ConnectedSensor);

export default Sensor;