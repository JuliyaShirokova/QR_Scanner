import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import AppNavigator from './src/MyNavigator';
import { store, persistor} from './src/store';
import { MenuProvider } from 'react-native-popup-menu';
import { PersistGate } from 'redux-persist/integration/react'
import SplashScreen from 'react-native-splash-screen';

export default class App extends Component {
  
  render() {
    return ( 
      <Provider store={store}>
        <PersistGate  loading={null} persistor={persistor}>
          <StatusBar
            backgroundColor="transparent"
            barStyle="light-content"
            translucent={true}
          />
          <MenuProvider>
            <AppNavigator />
          </MenuProvider>  
        </PersistGate>
      </Provider>  
    );
  }
}