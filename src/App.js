import React, { Component } from 'react';
import './App.scss';
import { Provider } from "react-redux";
import configureStore from "./store/config";
import Rotas from "./template/rotas";

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Rotas/>
      </Provider>
    );
  }
}

export default App;
