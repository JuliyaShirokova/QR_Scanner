import React from 'react'
import { createAppContainer, createStackNavigator } from 'react-navigation';
import MainScreen from '../components/Screens/MainScreen';
import ResultsScreen from '../components/Screens/ResultsScreen';
import HistoryScreen from '../components/Screens/HistoryScreen';
import AboutScreen from '../components/Screens/AboutScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const MainStack = createStackNavigator(
  {
    Main: { screen: MainScreen },
    Results: { screen: ResultsScreen },
    History: {screen: HistoryScreen},
    About: {screen: AboutScreen}
  }, 
  {
    initialRouteName: 'Results'
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

const RootNavigator = createStackNavigator(
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
 );

const AppNavigator = createAppContainer(MainStack);

export default AppNavigator;