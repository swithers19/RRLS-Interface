import React, {Component} from 'react';
import { Grid } from 'react-bootstrap';
import socketIOClient from 'socket.io-client';
import { SocketProvider } from 'socket.io-react';
import LearningBoard from './Circuits/LearningBoard';
import PeriphObj from './Peripherals/PeriphObj';
import PeriphGenerator from './Peripherals/PeriphGenerator';
import "./CircuitContainer.css";

class CircuitContainer extends Component {
    constructor (props, context) {
        super(props, context);
        this.boardRef = React.createRef(),
        this.state = {
            endpoint: 'http://localhost:5000',
            config: {
                
            },
            dataFlag: false,
            lines: []
        }
    }
    componentDidMount(e) {
        const socket = socketIOClient('http://localhost:5000');
        socket.on('/RRLSsamW/config', function(data) {
            console.log(JSON.parse(data));
            var temp = JSON.parse(data);
            this.setState({config:temp});
            this.setState({dataFlag:true});
        }.bind(this));
        var a = getLocation("Board","A6");
        var b = getLocation("ultra","Vcc");
    }
    
    render() {
        var config = this.state.config;
        if (this.state.dataFlag == true) {
            var left = 0;
            var right = 0;
            return (
                <SocketProvider>
                    <Grid>
                        <div className='BoardContainer'>
                        <LearningBoard/>
                            <PeriphGenerator Perphs={config.Peripherals}/>

                            <svg version='1.2' baseProfile='tiny' id='overlay' 
                            xmlns='http://www.w3.org/2000/svg' 
                            viewBox="0 0 1140 800" preserveAspectRatio="none"> </svg>
                        </div>
                    </Grid>
                </SocketProvider>
            );
        }
        else {
            return(
                <div>ss</div>
            );
        }
    }
}























//Gets location relative to parent
function getLocation(parent, subElem) {
    var flag = 1; 
    var x, y = 0;
    var svgParent = document.getElementById(parent);
    try {
        var svgChild = svgParent.contentDocument.rootElement.getElementById(subElem);      
        if (svgChild == null) {
            throw new Error('ContentDocument null');
        }
        var svgRec = svgChild.getClientRects();
        x = svgParent.offsetLeft+svgRec[0].x+(svgRec[0].width/2);
        y = svgParent.offsetTop+svgRec[0].y+(svgRec[0].height/2) ;
        console.log(x, y);
    }
    catch(e) {
        setTimeout(getLocation, 100, parent, subElem);
    }
    var ret = [x, y, flag];
    return ret;
}

//Draws a line from point to point
function drawLine(x1, y1, x2, y2) {
    var overlay = document.getElementById('overlay');
    var elem = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
    var points = String(x1) + ',' + String(y1) +' ' +String(x2) + ','+String(y2);
    elem.setAttribute('points', points);
    elem.setAttribute('stroke', 'black');
    elem.setAttribute('stroke-width', '2px');
    overlay.appendChild(elem);
}

export default CircuitContainer;