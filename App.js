import React, { Component } from 'react';
import { StatusBar, Alert, PermissionsAndroid } from 'react-native';
import { Provider } from 'react-redux';
import AppNavigator from './src/MyNavigator';
import { store, persistor} from './src/store';
import { MenuProvider } from 'react-native-popup-menu';
import { PersistGate } from 'redux-persist/integration/react'
import SplashScreen from 'react-native-splash-screen';

export default class App extends Component {
  requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'QR Scanner App Camera Permission',
          message:
            'QR Scanner App needs access to your camera ' +
            'so you can scan QR-code.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  componentDidMount = () => {  
  //  this.requestCameraPermission();
  }
     

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