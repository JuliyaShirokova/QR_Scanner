import React, { Component } from 'react'
import { createAppContainer, createStackNavigator } from 'react-navigation';
import MainScreen from '../components/Screens/MainScreen';
import ResultsScreen from '../components/Screens/ResultsScreen';
import  * as colors from '../constants/colors';

const StackNavigator = createStackNavigator(
  {
    Main: { screen: MainScreen },
    Results: {screen: ResultsScreen }
  }
);

const AppNavigator = createAppContainer(StackNavigator);
export default AppNavigator;