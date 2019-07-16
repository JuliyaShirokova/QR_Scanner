import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import Navigator from './src/MyNavigator';
import store from './src/store';
import * as colors from './src/constants/colors';

export default class App extends Component {
  render() {
    return ( 
      <Provider store={store}>
        <StatusBar
          backgroundColor="transparent"
          barStyle="light-content"
          translucent
        />
        <Navigator />
      </Provider>  
    );
  }
}