import React, { Component } from 'react';
import PeriphObj from './PeriphObj';

class PeriphGenerator extends Component {
    constructor (props, context) {
        super(props, context);
        this.findOverlay = this.findOverlay.bind(this);
        this.state = {
            linesObj: null
        }
    }
    componentDidMount() {
        setTimeout(()=> this.findOverlay(), 400);
    }

    findOverlay() {
        var OverlayObj = document.getElementById('LineOverlay');
        this.setState({linesObj:OverlayObj});
        console.log(OverlayObj);
    }

    render() {
        var left = 0, right = 0;
        var x = this.props.Perphs.map(p => {
            var classLR = getRight(p.peripheralType);
            console.log(classLR);
            if (classLR === 'left') {
                left++;
                return(<PeriphObj periph={p} class={classLR} numb={left} overlayObj={this.state.linesObj}/>);
            }
            else{
                right++;
                return(<PeriphObj periph={p} class={classLR} numb={right}/>); 
            }
        });
        return (x);
    }
}

function getRight(name) {
    var side = 'left';
    var rightP = [
        "Temperature Sensor"
    ]
    rightP.forEach(p => {
        if (p === name) {
            side = 'right';
        }
    });
    return side;
}


export default PeriphGenerator;