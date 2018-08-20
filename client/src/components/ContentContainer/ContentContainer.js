import React, { Component } from 'react';
import { Grid, Row, Col} from 'react-bootstrap';
import './ContentContainer.css';

class ContentContainer extends Component {
    render() {
        return (
            <Grid>
                <Row className="contentRender">
                    <Col className="ContentContainerClss" md={12}>
                        <h1>Content</h1>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default ContentContainer;