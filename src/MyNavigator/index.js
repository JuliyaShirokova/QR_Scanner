import React from 'react'
import { createAppContainer, createStackNavigator } from 'react-navigation';
import MainScreen from '../components/Screens/MainScreen';
import ResultsScreen from '../components/Screens/ResultsScreen';
import HistoryScreen from '../components/Screens/HistoryScreen';
import AboutScreen from '../components/Screens/AboutScreen';
import ChangeLangScreen from '../components/Screens/ChangeLangScreen';

const MainStack = createStackNavigator(
  {
    Main: { screen: MainScreen },
    Results: { screen: ResultsScreen },
    History: {screen: HistoryScreen},
    About: {screen: AboutScreen},
    ChangeLang: {screen: ChangeLangScreen}
  }, 
  {
    initialRouteName: 'Main',
    cardStyle: {
      shadowColor: 'transparent',
    },
    header: {
      style: {
        elevation: 0, //remove shadow on Android
        shadowOpacity: 0, //remove shadow on iOS
      }
    }
  }
);

const AppNavigator = createAppContainer(MainStack);

export default AppNavigator;