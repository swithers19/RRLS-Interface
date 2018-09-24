import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';

import ultraSensor from './../../../static/Peripherals/UltrasonicSensor.svg';
import TempSensor from './../../../static/Peripherals/TMP36.svg';
import LED from './../../../static/Peripherals/LED.svg';

import './PeriphObj.css';

class PeriphObj extends Component {
    constructor (props, context) {
        super(props, context);
        this.boardRef = React.createRef();
        this.state = {
            name: '',
            svgFile: '',
            id: '',
            class:'',
            LineReference:null,
            feedback:null,
            display: ''
        }
    };
    componentDidUpdate(prevProps, prevState) {
        if (prevState.LineReference != this.props.overlayObj) {
            this.setState({LineReference:this.props.overlayObj});
        }
        if (prevState.feedback != this.props.feedback.feedback) {
            this.setState({feedback:this.props.feedback.feedback});
            this.setState({display:this.props.feedback.state})
        }

    }
    componentWillMount() {
        if (this.props.periph.peripheralType === 'Ultrasonic Sensor') {
            this.setState({svgFile: ultraSensor});      
            this.setState({class: ' ultra'});
        }
        else if (this.props.periph.peripheralType === 'Temperature Sensor') {
            this.setState({svgFile: TempSensor});      
            this.setState({class: ' temp'});
        }
        else if (this.props.periph.peripheralType === 'LED') {
            this.setState({svgFile: LED});      
            this.setState({class: ' led'});
        }
        this.setState({name: this.props.periph.peripheralType});
        this.setState({id: this.props.periph.deviceID});
    }   

    toggleLineVisibility(event) {
        //var overlay = this.state.LineReference;
        console.log('here');
    }

    render() {
        var styling = {
            top: String(this.props.numb*20)+'%'
        }
        return (
            <div>
                <object 
                    data={this.state.svgFile} 
                    type="image/svg+xml" 
                    id={this.state.id} 
                    style = {styling}
                    class={this.props.class+ this.state.class+ " periph " + this.state.display}
                    data-tip data-for={String(this.state.id)}> 
                </object>
                <ReactTooltip id={String(this.state.id)} place="top" type="info" effect="float">
                    <span>{this.state.feedback}</span>
                </ReactTooltip>
            </div>
        )
    }
}



export default PeriphObj;
