import React, { Component } from 'react';
import { connect } from "react-redux";
import * as utils from '../../utils/utils';
import { Modal, Button } from 'react-bootstrap';

const mapStateToProps = state => {
    return {
        adminMode: state.rootReducer.adminMode,
        selectedSensor: state.rootReducer.selectedSensor
    };
};

const mapDispatchToProps = {

};

class ConnectedDeleteForm extends Component {
    constructor(props) {
        super(props)

        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete() {
        utils.deleteSensor(utils.sensorsLink, this.props.selectedSensor);
    }

    render() {
        if (this.props.show){
            return(
                <Modal show={this.props.show} onHide={this.props.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Confirmation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to delete sensor {this.props.sensorName}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.handleClose}>Cancel</Button>
                        <Button variant="danger" onClick={this.handleDelete}>Delete</Button>
                    </Modal.Footer>
                </Modal>
            );
        } else {
            return null;
        }
    }
}

const DeleteForm = connect(mapStateToProps, mapDispatchToProps)(ConnectedDeleteForm);
export default DeleteForm;