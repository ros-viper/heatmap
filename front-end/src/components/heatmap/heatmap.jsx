import React, { Component } from 'react';
import { connect } from "react-redux";
import * as utils from '../../utils/utils';
import Map from '../map/map';
import ReactLoading from 'react-loading';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import { setFloor } from '../../actions/actions';
import './heatmap.css';

const mapStateToProps = state => {
    return {
        sensors: state.rootReducer.sensors,
        loading: state.rootReducer.loading,
        floor: state.rootReducer.floor
    };
};

const mapDispatchToProps = {
    setFloor
}

class ConnectedHeatmap extends Component {
    constructor(props) {
        super(props)

        this.changeFloor = this.changeFloor.bind(this);
    }

    componentWillMount() {
        utils.getSensors(utils.sensorsLink);
    }

    changeFloor(eventKey) {
        this.props.setFloor(eventKey);
    }

    render() {
        if (this.props.loading) {
            return <ReactLoading className="busy wrapper" type="spinningBubbles" color="grey" height={100} width={100} />
        }
        return ([
            <DropdownButton title="Choose floor">
                <MenuItem eventKey="one" onSelect={this.changeFloor} active={this.props.floor === "one"}>Floor 1</MenuItem>
                <MenuItem eventKey="two" onSelect={this.changeFloor} active={this.props.floor === "two"}>Floor 2</MenuItem>
                <MenuItem eventKey="three" onSelect={this.changeFloor} active={this.props.floor === "three"}>Floor 3</MenuItem>
            </DropdownButton>,
            <Map />
        ]);
    };
};

const Heatmap = connect(mapStateToProps, mapDispatchToProps)(ConnectedHeatmap);

export default Heatmap;