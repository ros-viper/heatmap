import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

class Header extends Component {
    render() {
        return (
            <Row className="page-header">
                <Col xs={12}>
                    <h2>Otago Polytechnic - Heatmap</h2>
                </Col>
            </Row>
        );
    }
}

export default Header;