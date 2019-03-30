import React, { Component } from 'react';

class Line extends Component {
    constructor (props, context) {
        super(props, context);
    }

    render (){
        var lineInfo = this.props.lineDetails;
        try {
            if (lineInfo.length >0) {
                var cntGlobal = 1;
                for (var linesI of lineInfo) {
                    var cnt = 1;
                    for (var lineJ of linesI.lines){
                        drawLine(lineJ.A[0], lineJ.A[1], lineJ.B[0], lineJ.B[1], cnt, cntGlobal, linesI.name, lineJ.name);
                        cnt++;
                    } 
                    cntGlobal++;
                }
            }
        }
        catch(e) {
            console.log(e)
        }
        return(
            <svg version='1.2' baseProfile='tiny' id='LineOverlay' 
            xmlns='http://www.w3.org/2000/svg' 
            viewBox="0 0 1140 800" preserveAspectRatio="none"> 
            </svg>
        );
    }
}

//Draws a line from point to point
function drawLine(x1, y1, x2, y2, cnt, cntGlobal, namePeri, nameLine) {
    var overlay = document.getElementById('LineOverlay');
    var elem = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
    var points = generatePoints(x1, y1, x2, y2, cnt, cntGlobal, namePeri, nameLine);
    renderLines(points, elem, overlay, nameLine, namePeri, cntGlobal);
}

function renderLines(points, elem, overlay, nameLine, namePeri, cntGlobal) {
    elem.setAttribute('points', points);
    elem.setAttribute('fill', 'none');
    //elem.setAttribute('class', 'nameLine');
    elem.setAttribute('class', String(namePeri)+ String(cntGlobal))
    if (nameLine === 'Gnd') {
        elem.setAttribute('stroke', 'black');
        elem.setAttribute('stroke-width', '2px');
    }
    else if (nameLine === 'Vcc') {
        elem.setAttribute('stroke', 'red');
        elem.setAttribute('stroke-width', '2px');
    }
    else {
        elem.setAttribute('stroke', 'blue');
        elem.setAttribute('stroke-width', '2px');
    }
    overlay.appendChild(elem);
}

function generatePoints(x1, y1, x2, y2, cnt, cntGlobal, namePeri, nameLine) {
    var periphs = ['Temperature Sensor'];
    var gnd  = 0;
    var vcc = 0;
    var vccX1 = 0
    var vccY1 = 0;
    var vccX2 = 0;

    //Initial drop from pin
    var iD = y1+cnt*15;
    var intialDrop = ' '+ String(x1)+',' + String(iD) +' ';

    //Determine side peripheral should sit
    if (periphs.includes(namePeri)) {
        gnd = x2 + 0.1*x2;
        vcc = x2 + 0.2*x2;
        vccX1 = x2 + 0.2*x2;
        vccY1 = y2;
        vccX2 = vccX1;
    }
    else {
        gnd = x2 - 0.1*x2;
        vccX1 = 0.5*(x2-x1)+x1;
        vccY1 = 0.5*y2;
        vccX2 = x2+0.2*x2;
        vcc = x2 + 0.2*x2;
    }


    //Determine Line renders
    if (nameLine === 'Gnd') {
        var moveAcross = ' '+ String(gnd) + ',' + String(iD) +' ';
        var moveUp = ' '+ String(gnd) + ',' + String(y2) +' ';
    }
    else if (nameLine === 'Vcc') {
        var moveAcrossA = ' '+ String(vccX1) + ',' + String(iD) +' '
        var moveUpA = ' '+ String(vccX1) + ',' + String(vccY1) +' ';
        var moveAccrossB = ' ' + String(vccX2) + ',' + String(vccY1) + ' ';
        var moveDownB = ' ' + String(vccX2) + ',' + String(y2) + ' ';
        var moveAcross = moveAcrossA+moveUpA;
        var moveUp = moveAccrossB+moveDownB;
        // var moveAcross = ' '+ String(vcc) + ',' + String(iD) +' ';

        // var moveUp = ' '+ String(vcc) + ',' + String(y2) +' ';
    }
    else {
        var moveAcross = ' '+ String(x1+(x2-x1)*(0.05*cntGlobal+0.1*cnt)) + ',' + String(iD) +' ';
        var moveUp = ' '+ String(x1+(x2-x1)*(0.05*cntGlobal+0.1*cnt)) + ',' + String(y2) +' ';
    }
    var finalMove = String(x2) + ','+String(y2);

    //Concatenate all points to form polyline
    var points = String(x1) + ',' + String(y1) + intialDrop + moveAcross + moveUp +finalMove;
    return points
}


export default Line;