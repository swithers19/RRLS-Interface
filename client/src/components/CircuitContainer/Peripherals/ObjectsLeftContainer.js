import React, { Component } from 'react';

import UltrasonicSensor from './../../../static/Peripherals/UltrasonicSensor.svg';
class ObjectsLeftContainer extends Component {
    constructor (props,context) {
        super(props, context);
        this.state = {
            periphs: this.props.peripherals
        }
    }

    componentDidMount() {
    
    }

    render(){
        return (
           <h1>Here</h1>
        );
    }
}

function addPoint(board ,pin, destination) {
    var pin = board.document.getElementsByClassName(pin+'Line').getAttribute("points");
    console.log(pin);
    pin += ' ' + destination;
}

export default ObjectsLeftContainer;