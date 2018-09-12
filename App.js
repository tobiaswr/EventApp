import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './components/pages/HomeScreen';
import SettingsScreen from './components/pages/SettingsScreen';
import DetailsScreen from './components/pages/DetailsScreen';
import ProfileScreen from './components/pages/ProfileScreen';
import {Ionicons} from '@expo/vector-icons';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';

const HomeStack = createStackNavigator({
  Home: { screen: HomeScreen}, 
  Details: { screen: DetailsScreen},
});

const ProfileStack = createStackNavigator({
  Profile: { screen: ProfileScreen},
  Details: { screen: DetailsScreen},
});

const SettingsStack = createStackNavigator({
  Settings: { screen: SettingsScreen},
  Details: { screen: DetailsScreen},
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
    activeTintColor: 'white',
    inactiveTintColor: '#8F8FA8',
    showLabel: false,
    style: {
      backgroundColor: '#3F3F54'
    }    
  }  
});
