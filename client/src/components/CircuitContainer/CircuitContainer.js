import React, {Component} from 'react';
import { Grid } from 'react-bootstrap';
import socketIOClient from 'socket.io-client';
import { SocketProvider } from 'socket.io-react';
import LearningBoard from './Circuits/LearningBoard';
import PeriphObj from './Peripherals/PeriphObj';
import PeriphGenerator from './Peripherals/PeriphGenerator';
import "./CircuitContainer.css";
import LineGenerator from './Lines/LineGenerator';

class CircuitContainer extends Component {
    constructor (props, context) {
        super(props, context);
        this.boardRef = React.createRef(),
        this.state = {
            endpoint: 'http://localhost:5000',
            config: {
            },
            dataFlag: false,
            lines: [],
            pinLocationList:[],
            feedback:null
        }
    }
    componentDidMount(e) {
        const socket = socketIOClient('http://localhost:5000');
        socket.on('/RRLSsamW/config', function(data) {
            console.log(JSON.parse(data));
            var temp = JSON.parse(data);
            this.setState({config:temp});
            this.setState({dataFlag:true});
            setTimeout(()=> this.findPinLocations(), 500);
        }.bind(this));
        socket.on('/RRLSsamW/feedback', function(data) {
            var temp = JSON.parse(data);
            this.setState({feedback:temp});

        }.bind(this));
    }
    
    findPinLocations() {
        var x, y = 0;
        var i = 0, j = 0;
        var pinLocationList = [];
        //get all peripheral objects
        var svgParent = document.getElementsByClassName('periph');
        try {
            if (svgParent.length == 0) {
                throw new Error('ContentDocument null');
            }
            for (i=0; i<svgParent.length; i++){
                var item = {};
                try {
                    //get list of pins
                    var svgChild = svgParent[i].contentDocument.rootElement.getElementsByClassName('pin');  
                    if (svgChild == null | svgParent.length<1)  {
                        throw new Error('ContentDocument null');
                    }
                    item["peripheral"] = svgParent[i].classList[1];
                    item["pinLocations"] = []
                    for (j=0;j<svgChild.length; j++){
                        var pinObj = {};
                        var svgRec = svgChild[j].getClientRects(); 
                        x = svgParent[i].offsetLeft+svgRec[0].x+(svgRec[0].width/2);
                        y = svgParent[i].offsetTop+svgRec[0].y+(svgRec[0].height/2);
                        //get locations and append to object
                        pinObj["pinName"] = svgChild[j].id;
                        pinObj["x"] = x;
                        pinObj["y"] = y;
                        item["pinLocations"].push(pinObj);
                    }
                    pinLocationList.push(item);
                }
                catch(e) {
                    console.log("Error");    
                }
            }
        }
        catch(e){
            console.log(e);
        }
        this.setState({pinLocationList:pinLocationList});
        //console.log(pinLocationList);
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
                            <PeriphGenerator Perphs={config.Peripherals} feedback={this.state.feedback}/>
                            <LineGenerator ConfigPeriphs={config.Peripherals} pinLL={this.state.pinLocationList}/>
                        </div>
                    </Grid>
                </SocketProvider>
            );
        }
        else {
            return(
                <div>Waiting</div>
            );
        }
    }
}


export default CircuitContainer;