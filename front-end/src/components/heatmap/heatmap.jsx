import React, { Component } from 'react';
import { connect } from "react-redux";
import * as utils from '../../utils/utils';
import Map from '../map/map';
import ReactLoading from 'react-loading';
import './heatmap.css';

const mapStateToProps = state => {
    return {
        sensors: state.rootReducer.sensors,
        loading: state.rootReducer.loading,
        floor: state.rootReducer.floor
    };
};

class ConnectedHeatmap extends Component {

    componentWillMount() {
        utils.getSensors(utils.sensorsLink);
    }

    componentDidMount() {
        console.log(this.props.floor);
        
    }

    render() {
        if (this.props.loading) {
            return <ReactLoading className="busy wrapper" type="spinningBubbles" color="grey" height={100} width={100} />
        }
        return (
            <Map floor={this.props.floor} />
        );
    };
};

const Heatmap = connect(mapStateToProps)(ConnectedHeatmap);

export default Heatmap;