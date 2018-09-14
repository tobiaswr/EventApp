import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './components/pages/HomeScreen';
import SettingsScreen from './components/pages/SettingsScreen';
import EventScreen from './components/pages/EventScreen';
import ProfileScreen from './components/pages/ProfileScreen';
import {Ionicons} from '@expo/vector-icons';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';

var bgColor = '#606075';
var navColor = '#3F3F54';

var loggedInUser;

const HomeStack = createStackNavigator({
  Home: { screen: HomeScreen}, 
  Events: { screen: EventScreen},
});

const ProfileStack = createStackNavigator({
  Profile: { screen: ProfileScreen},
  Events: { screen: EventScreen},
});

const SettingsStack = createStackNavigator({
  Settings: { screen: SettingsScreen},
  Events: { screen: EventScreen},
});

export default createBottomTabNavigator({
  Home: { screen: HomeStack},
  Profile: { screen: ProfileStack},
  Settings: { screen: SettingsStack},
},


{
  navigationOptions: ({ navigation, color }) => ({
    
    tabBarIcon: ({ focused, tintColor }) => {

      const { routeName } = navigation.state;
      var iconName;

      if (routeName === 'Home') {
        iconName = 'md-home';
      } else if(routeName === 'Settings'){
        iconName = 'md-cog';
      } else if (routeName === 'Profile'){
        iconName = 'md-person';
      }
      return <Ionicons name = {iconName} size = {25} color = {tintColor} />;
    }
  }), 
  tabBarOptions: {
    activeTintColor: '#22561e',
    inactiveTintColor: 'white',
    showLabel: false,
    style: {
      backgroundColor: '#e9e7e7',
      borderTopColor: '#143311',
      borderTopWidth: 1.2,
      borderBottomColor: '#143311',
      borderBottomWidth: 0

  
    }    
  }  
});
