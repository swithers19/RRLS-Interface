import { Glyphicon, Button, Dropdown, MenuItem } from 'react-bootstrap';
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
        //<menu2/>
        <div id="flyoutMenu" className={visibility}>   
          <Button className="menu-close" onMouseDown={this.props.handleMouseDown}>
              <Glyphicon glyph="remove"/>
          </Button>  
          <br/>
          <Dropdown id="dropdown-custom-1" className="dropdownGroup">
            <Dropdown.Toggle  className="menuItem">Devices</Dropdown.Toggle>
            <Dropdown.Menu className="super-colors">
              <MenuItem eventKey="1">LED</MenuItem>
              <MenuItem eventKey="2">Ultrasonic Sensor</MenuItem>
              <MenuItem eventKey="3" active>LED Matrix</MenuItem>
            </Dropdown.Menu>
          </Dropdown>
          <br/>
          <Dropdown id="dropdown-custom-2" className="dropdownGroup">
            <Dropdown.Toggle className="menuItem">Projects</Dropdown.Toggle>
            <Dropdown.Menu className="super-colors">
              <MenuItem eventKey="1">LED</MenuItem>
              <MenuItem eventKey="2">Ultrasonic Sensor</MenuItem>
              <MenuItem eventKey="3" active>LED Matrix</MenuItem>
            </Dropdown.Menu>
          </Dropdown>
          <br/>
          <Dropdown id="dropdown-custom-3" className="dropdownGroup">
            <Dropdown.Toggle className="menuItem">Community Projects</Dropdown.Toggle>
            <Dropdown.Menu className="super-colors">
              <MenuItem eventKey="1">LED</MenuItem>
              <MenuItem eventKey="2">Ultrasonic Sensor</MenuItem>
              <MenuItem eventKey="3" active>LED Matrix</MenuItem>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      );
    }
  }
   
  export default Menu;