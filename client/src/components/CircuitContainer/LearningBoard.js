import React, { Component } from 'react';
import ReactSVG from 'react-svg';
import ArduinoNanoSVG from './../../static/ArduinoNanoSVG';
import SVG from 'react-inlinesvg';

class LearningBoard extends Component {
    constructor (props, context) {
        super(props, context);
        this.boardRef = React.createRef();
        this.state = {
            board: getBoard(this.props.type),
            lines:[{
                pin:'A5', 
                points:[
                    {
                        x:100,
                        y:54
                    },
                    {
                        x:100,
                        y:100
                    }
                ]},
            {
                pin:'A6', 
                points:[{
                        x:75,
                        y:46.8
                    },
                    {
                        x:75,
                        y:10
                    }
                ]
            }]
        }
    };


    render() {
        return(
            <ArduinoNanoSVG lines = {this.state.lines} ref={this.boardRef}/>
        );
    }
}

function getBoard(type) {
    var svgBoardPath;
    if (type = 'Arduino Nano') {
        svgBoardPath = ArduinoNanoSVG;
    }
    return svgBoardPath;
}

function addPoint(board ,pin, destination) {
    var pin = board.getElementById(pin+'Line').getAttribute("points");
    console.log(pin);
    pin += ' ' + destination;
}

export default LearningBoard;