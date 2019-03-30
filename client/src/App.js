import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Container } from 'reactstrap';

import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';
import ItemModal from './components/ItemModal';
import NavContainer from './components/NavContainer/NavContainer';
import store from './store';

import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
        <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet"/>
          <NavContainer/>
        </div>
      </Provider>
    );
  }
}
export default App;
