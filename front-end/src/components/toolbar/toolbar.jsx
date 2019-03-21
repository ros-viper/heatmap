import React, { Component } from 'react';
import { connect } from "react-redux";
import * as utils from '../../utils/utils';
import store from '../../store/store';
import { push } from 'react-router-redux';
import { Dropdown, Button, ButtonToolbar } from 'react-bootstrap';
import { setFloor, setAdmin } from '../../actions/actions';
import DeleteForm from "../deleteForm/deleteForm";

const mapStateToProps = state => {
    return {
        sensors: state.rootReducer.sensors,
        loading: state.rootReducer.loading,
        floor: state.rootReducer.floor,
        adminMode: state.rootReducer.adminMode,
        selectedSensor: state.rootReducer.selectedSensor
    };
};

const mapDispatchToProps = {
    setFloor,
    setAdmin
};

class ConnectedToolbar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            deleting: false
        };

        this.changeFloor = this.changeFloor.bind(this);
        this.setAdmin = this.setAdmin.bind(this);
        this.goToMap = this.goToMap.bind(this);
        this.toggleDelete = this.toggleDelete.bind(this);
        this.updateSensors = this.updateSensors.bind(this);
    }

    updateSensors() {
        utils.getSensors(utils.sensorsLink);
    }

    changeFloor(eventKey) {
        this.props.setFloor(eventKey);
    }

    setAdmin() {
        this.props.setAdmin();
    }

    goToMap() {
        store.dispatch(push('/'));
    }

    toggleDelete() {
        this.setState({
            deleting: !this.state.deleting
        });
    }

    render() {
        return([
            <ButtonToolbar key="ButtonToolbar">
                {this.props.location == "sensor" ?
                    <Button variant="secondary" onClick={this.goToMap}>
                        <i className="fas fa-arrow-left"></i>Back to map
                    </Button>
                : null}
                <Dropdown title="Choose floor">
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Floor {this.props.floor}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item eventKey="one" onSelect={this.changeFloor} active={this.props.floor === "one"}>Floor 1</Dropdown.Item>
                        <Dropdown.Item eventKey="two" onSelect={this.changeFloor} active={this.props.floor === "two"}>Floor 2</Dropdown.Item>
                        <Dropdown.Item eventKey="three" onSelect={this.changeFloor} active={this.props.floor === "three"}>Floor 3</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                {this.props.adminMode && this.props.location == "sensor" ? <Button variant="danger" onClick={this.toggleDelete}>Delete</Button> : null}
                {this.props.location == "map" ?
                    <Button variant="info" onClick={this.updateSensors}>Update</Button>
                : null}
                <Button variant={this.props.adminMode ? "success" : "warning"} onClick={this.setAdmin} className="btn-admin">
                    Admin Mode {this.props.adminMode ? "on" : "off"}
                </Button>
            </ButtonToolbar>,
            <DeleteForm key="deleteConfirm" show={this.state.deleting} handleClose={this.toggleDelete} 
                sensorName={this.props.selectedSensor ? this.props.selectedSensor.name : null} />
        ]);
    }
}

const Toolbar = connect(mapStateToProps, mapDispatchToProps)(ConnectedToolbar);
export default Toolbar;