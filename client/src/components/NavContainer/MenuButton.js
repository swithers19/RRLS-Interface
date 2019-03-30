import React, { Component } from "react";
import { Glyphicon, Button } from 'react-bootstrap';

import './MenuButton.css';
 
class MenuButton extends Component {
  render() {
    return (
      <Button className="menu-open" onMouseDown={this.props.handleMouseDown}>
        <Glyphicon glyph="menu-hamburger"/>
      </Button> 
    );
  }
}
 
export default MenuButton;