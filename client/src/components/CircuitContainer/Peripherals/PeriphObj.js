import React, { Component } from 'react';
import ultraSensor from './../../../static/Peripherals/UltrasonicSensor.svg';
import TempSensor from './../../../static/Peripherals/TMP36.svg';

class PeriphObj extends Component {
    constructor (props, context) {
        super(props, context);
        this.boardRef = React.createRef();
        this.state = {
            name: '',
            svgFile: '',
            id: '',
            class:''
        }
    };

    componentWillMount() {
        if (this.props.periph.peripheralType === 'Ultrasonic Sensor') {
            this.setState({svgFile: ultraSensor});      
            this.setState({class: ' ultra'});
        }
        else if (this.props.periph.peripheralType === 'Temperature Sensor') {
            this.setState({svgFile: TempSensor});      
            this.setState({class: ' temp'});
        }
        this.setState({name: this.props.periph.peripheralType});
        this.setState({id: this.props.periph.deviceID});
    }   

    render() {
        return (
            <object data={this.state.svgFile} type="image/svg+xml" id={this.state.id} class={this.props.class+ this.state.class}></object>
        )
    }
}

export default PeriphObj;
