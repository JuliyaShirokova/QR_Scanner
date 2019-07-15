import React, { Component } from 'react'
import { createAppContainer, createBottomTabNavigator } from 'react-navigation';
import MainScreen from '../components/Screens/MainScreen';
import AddingScreen from '../components/Screens/AddingScreen';
//import SettingsScreen from './components/SettingsScreen';
import  * as colors from '../constants/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const bottomNavigator = createBottomTabNavigator(
  {
    Main: MainScreen,
    Adding: AddingScreen,
  //  Settings: SettingsScreen,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Main') {
          iconName = 'home';
        } else if (routeName === 'Adding') {
          iconName = 'assignment';
    //    }else if (routeName === 'Settings'){
    //      iconName = 'build'
        }

        return <MaterialIcons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: colors.alternativeTwo,
      inactiveTintColor: colors.dark,
      style: {
        borderTopWidth: 1,
        borderTopColor: colors.dark,
      }
    },
  }
);

const AppNavigator = createAppContainer(bottomNavigator);
export default AppNavigator;