import { Glyphicon, Button } from 'react-bootstrap';
  import React, { Component } from "react";
  import MenuButton from './MenuButton';
  import "./Menu.css";
   
  class Menu extends Component {
    render() {
      var visibility = "hidden";
   
      if (this.props.menuVisibility) {
        visibility = "show";
      }
   
      return (
        <div id="flyoutMenu" className={visibility}>
        
            <Button className="menu-close" onMouseDown={this.props.handleMouseDown}>
                <Glyphicon glyph="remove"/>
            </Button>  
          <h2><a href="#">Home</a></h2>
          <h2><a href="#">About</a></h2>
          <h2><a href="#">Contact</a></h2>
          <h2><a href="#">Search</a></h2>
        </div>
      );
    }
  }
   
  export default Menu;