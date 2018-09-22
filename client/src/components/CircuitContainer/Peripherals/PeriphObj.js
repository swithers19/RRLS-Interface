import React, { Component } from 'react';
import ultraSensor from './../../../static/Peripherals/UltrasonicSensor.svg';
import TempSensor from './../../../static/Peripherals/TMP36.svg';
import LED from './../../../static/Peripherals/LED.svg';
class PeriphObj extends Component {
    constructor (props, context) {
        super(props, context);
        this.boardRef = React.createRef();
        this.state = {
            name: '',
            svgFile: '',
            id: '',
            class:'',
            LineReference:null
        }
    };
    componentDidUpdate(prevProps, prevState) {
        if (prevState.LineReference != this.props.overlayObj) {
            this.setState({LineReference:this.props.overlayObj});
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

            <object 
                data={this.state.svgFile} 
                type="image/svg+xml" 
                id={this.state.id} 
                style = {styling}
                class={this.props.class+ this.state.class+ " periph"}> 
            </object>
            </div>
        )
    }
}



export default PeriphObj;
