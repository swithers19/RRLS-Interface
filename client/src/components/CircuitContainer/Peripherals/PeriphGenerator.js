import React, { Component } from 'react';
import PeriphObj from './PeriphObj';
import { isNullOrUndefined } from 'util';

class PeriphGenerator extends Component {
    constructor (props, context) {
        super(props, context);
        this.findOverlay = this.findOverlay.bind(this);
        this.state = {
            linesObj: null,
            feedback: Array(8).fill(0)
        }
    }
    componentDidMount() {
        setTimeout(()=> this.findOverlay(), 400);
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (JSON.stringify(prevState.feedback) !== JSON.stringify(nextProps.feedback)) {
            return({feedback:nextProps.feedback});
        }
    }

    findOverlay() {
        var OverlayObj = document.getElementById('LineOverlay');
        this.setState({linesObj:OverlayObj});
        console.log(OverlayObj);
    }

    render() {
        var left = 0, right = 0;
        var feedbackValidated = Array(8).fill(0);
        if (this.state.feedback !== null){
            feedbackValidated = this.state.feedback.list
            console.log(feedbackValidated)
        }
        var x = this.props.Perphs.map((p, i) => {
            var classLR = getRight(p.peripheralType);
            console.log(classLR);
            if (classLR === 'left') {
                left++;
                return(<PeriphObj feedback={feedbackValidated[i]} periph={p} class={classLR} numb={left} overlayObj={this.state.linesObj}/>);
            }
            else{
                right++;
                return(<PeriphObj feedback={feedbackValidated[i]} periph={p} class={classLR} numb={right}/>); 
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