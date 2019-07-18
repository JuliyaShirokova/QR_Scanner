import React, { Component } from 'react'
import { createAppContainer, createStackNavigator, createDrawerNavigator } from 'react-navigation';
import {  StyleProp, TextStyle } from 'react-native';
import MainScreen from '../components/Screens/MainScreen';
import ResultsScreen from '../components/Screens/ResultsScreen';
import HistoryScreen from '../components/Screens/HistoryScreen';
import AboutScreen from '../components/Screens/AboutScreen';
import Menu from '../components/Common/Menu';
import  * as colors from '../constants/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const MainStack = createStackNavigator(
  {
    Main: { screen: MainScreen },
    Results: { screen: ResultsScreen }
  }
);

const AboutStack = createStackNavigator(
  {
    About: { screen: AboutScreen },
    History: { screen: HistoryScreen },
  },
  {
    navigationOptions: {
      drawerIcon: ({ }) => (
        <MaterialIcons
          name="drafts"
          size={24}
          color={'red'}
        />
      ),
      drawerLabel: 'About',
    },
  }
);


const HistoryStack = createStackNavigator(
  {
    History: { screen: HistoryScreen },
    About: { screen: AboutScreen },
  },
  {
    navigationOptions: {
      drawerIcon: ({ }) => (
        <MaterialIcons
          name="drafts"
          size={24}
          color={'red'}
        />
      ),
      drawerLabel: 'History',
    },
  }
);

const DrawerNavigator = createDrawerNavigator(
  {
    Main: {
      screen: MainStack
    },
    History: {
    //  path: '/sent',
      screen: HistoryStack,
    },
    About: {
    //  path: '/',
      screen: AboutStack,
    },
  },
  {
    drawerPosition: "right",
    contentComponent: Menu,
    drawerWidth: 300, 
    
  }
);

const AppNavigator = createAppContainer(DrawerNavigator);

export default AppNavigator;