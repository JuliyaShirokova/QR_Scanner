import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import AppNavigator from './src/MyNavigator';
import store from './src/store';
import { MenuProvider } from 'react-native-popup-menu';

export default class App extends Component {
  render() {
    return ( 
      <Provider store={store}>
        <StatusBar
          backgroundColor="transparent"
          barStyle="light-content"
          translucent={true}
        />
        <MenuProvider>
          <AppNavigator />
        </MenuProvider>  
      </Provider>  
    );
  }
}