import React, { Component } from "react";
import { Grid, Row, Col } from 'react-bootstrap';

import MenuButton from './MenuButton';
import Menu from './Menu';
import CircuitContainer from './../CircuitContainer/CircuitContainer';
import ContentContainer from './../ContentContainer/ContentContainer';
import menu2 from './Menu2';
class NavContainer extends Component {
    constructor(props, context) {
        super(props, context);   
        this.state = {
            location: 100,
            visible: false
        };   
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
      }

      handleMouseDown(e) {
        this.toggleMenu();
        console.log("clicked");
        e.stopPropagation();
      }
       
      toggleMenu() {
        this.setState({
            visible: !this.state.visible
        });
      }
    render() {
        var contentWindow = "full";
        var newLine = ""
        if (this.state.visible) {
            contentWindow = "partial";
        }
        return (
            <div className={'Window'}>
                    <div>
                        <MenuButton handleMouseDown={this.handleMouseDown}/>    
                        <Menu handleMouseDown={this.handleMouseDown}
                            menuVisibility={this.state.visible}/>
                    </div>
                    <div className={contentWindow + ' nonMenu'}>
                    <Grid fluid={false}>
                        <CircuitContainer/> 
                    </Grid> 
                    </div>
            </div>
        );
    }
}

export default NavContainer;