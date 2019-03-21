import React, { Component } from 'react';
import { connect } from "react-redux";
import * as utils from '../../utils/utils';
import Map from '../map/map';
import Toolbar from '../toolbar/toolbar';
import ReactLoading from 'react-loading';
import { Dropdown, Button, ButtonToolbar } from 'react-bootstrap';
import { setFloor, setAdmin } from '../../actions/actions';
import './heatmap.css';


const mapStateToProps = state => {
    return {
        sensors: state.rootReducer.sensors,
        loading: state.rootReducer.loading,
        floor: state.rootReducer.floor,
        adminMode: state.rootReducer.adminMode
    };
};

const mapDispatchToProps = {
    setFloor,
    setAdmin
}

class ConnectedHeatmap extends Component {
    constructor(props) {
        super(props)

        this.changeFloor = this.changeFloor.bind(this);
        this.setAdmin = this.setAdmin.bind(this);
    }

    componentWillMount() {
        // utils.getSensors(utils.sensorsLink);
    }

    changeFloor(eventKey) {
        this.props.setFloor(eventKey);
    }

    setAdmin() {
        this.props.setAdmin();
    }

    render() {
        if (this.props.loading) {
            return <ReactLoading className="busy wrapper" type="spinningBubbles" color="grey" height={100} width={100} />
        }
        return ([
            <Toolbar key="toolbar" location="map"></Toolbar>,
            <Map key="map" />
        ]);
    };
};

const Heatmap = connect(mapStateToProps, mapDispatchToProps)(ConnectedHeatmap);

export default Heatmap;