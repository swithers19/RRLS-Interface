import React, {Component} from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import socketIOClient from 'socket.io-client';
import { SocketProvider } from 'socket.io-react';
import LearningBoard from './LearningBoard';
import "./CircuitContainer.css";



class CircuitContainer extends Component {
    constructor (props, context) {
        super(props, context);
        this.state = {
            endpoint: 'http://localhost:5000',
            boardInfo: {
                board:"Arduino Nano"
            },
            config: {}
        }
    }
    componentDidMount() {
        const socket = socketIOClient('http://localhost:5000');
        socket.on('/RRLSsamW/config', function(data) {
            console.log(JSON.parse(data));
            var temp = JSON.parse(data);
            this.setState({ config: JSON.parse(data) });
        });
    }
    
    render() {
        return (
            <SocketProvider>
                <Grid fluid={true}>
                    <Row className="circuitRenderCont">
                        <Col className="objLeft" md={3}>
                            <h1>Col 1</h1>
                        </Col>
                        <Col className="learningObj" md={6}>
                            <LearningBoard type={this.state.config.board}/>
                        </Col>
                        <Col className="objRight" md={3}>
                            <h1>Col 3</h1>
                        </Col>
                    </Row>
                </Grid>
            </SocketProvider>
        );
    }
}



export default CircuitContainer;