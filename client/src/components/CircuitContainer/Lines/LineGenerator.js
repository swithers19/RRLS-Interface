import React, { Component } from 'react';
import Line from './Line';
class LineGenerator extends Component {
    constructor (props, context) {
        super(props, context);
        this.state = {
            lineCollection:null
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (JSON.stringify(prevState) !== JSON.stringify(nextProps)) {
            if (nextProps !== undefined) {
                return {
                    lineCollection: getBoardLocations(nextProps)
                };
            }
        }
        else {
            // Return null to indicate no change to state.
            return null;
        }
    }
    
    render() {
        return (
            <div id='LineGenerator'>
                <Line lineDetails={this.state.lineCollection}/>
            </div>
        );
    }
}


//Gets location relative to parent
function getLocation(subElem, periph) {
    var flag = 1; 
    var x, y = 0;
    var sideFlag = '';
    if (subElem !== 'Vcc') {
        if (periph === 'Temperature Sensor') {
            sideFlag = 'A';
        }
        else {
            sideFlag = 'D'
        }
    }
    var svgParent = document.getElementById('Board');
    try {
        var svgChild = svgParent.contentDocument.rootElement.getElementById(sideFlag+subElem);      
        if (svgChild == null) {
            throw new Error('ContentDocument null');
        }
        var svgRec = svgChild.getClientRects();
        x = svgParent.offsetLeft+svgRec[0].x+(svgRec[0].width/2);
        y = svgParent.offsetTop+svgRec[0].y+(svgRec[0].height/2) ;
        console.log(x, y);
    }
    catch(e) {
    }
    var ret = [x, y];
    return ret;
}

function getBoardLocations(newProps) {
    var i = 0;
    var LineRender = []
    if (newProps.pinLL[0] != undefined) {
        for (i=0; i<newProps.ConfigPeriphs.length; i++) {
            var cnt = 0;
            var periphLines = {
                name: newProps.ConfigPeriphs[i].peripheralType,
                lines:[]
            }
            //get locations and combine
            for (var pin of newProps.pinLL[i].pinLocations) {
                var pinInfo = {
                    name:pin.pinName,
                    A: [pin.x, pin.y],
                    B:[]
                };
                if (pin.pinName == 'Gnd'){
                    pinInfo.B = getLocation('Gnd', periphLines.name);
                }
                else if (pin.pinName == 'Vcc') {
                    pinInfo.B = getLocation('Vcc', periphLines.name);
                }
                else {
                    console.log(newProps.ConfigPeriphs[i]['pin array'][cnt])
                    pinInfo.B = getLocation(newProps.ConfigPeriphs[i]['pin array'][cnt], periphLines.name)
                    cnt++;
                }
                periphLines.lines.push(pinInfo);
            }
            LineRender.push(periphLines);
        } 
    }
    return LineRender;
}

export default LineGenerator;