import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ArduinoB from './../../../static/boards/ArduinoNano.svg';

class LearningBoard extends Component {
    constructor (props, context) {
        super(props, context);
        this.boardRef = React.createRef();
    };

    render() {
        return (
            <object data={ArduinoB} type="image/svg+xml" id='Board' className='Board'></object>
        )
    }
}

export default LearningBoard;


