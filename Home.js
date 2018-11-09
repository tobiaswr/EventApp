import HomeScreen from './components/pages/HomeScreen';
import SettingsScreen from './components/pages/SettingsScreen';
import EventScreen from './components/pages/EventScreen';
import ProfileScreen from './components/pages/ProfileScreen';
import SignInForm from './components/pages/SignInForm';
import SearchScreen from './components/pages/SearchScreen';
import ResultScreen from './components/pages/ResultScreen';
import CreateEventScreen from './components/pages/CreateEventScreen';
import ItemComponent from './components/pages/ItemComponent';
import {Ionicons} from '@expo/vector-icons';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


const HomeStack = createStackNavigator({
  Home: { screen: HomeScreen}, 
  CreateEvent: { screen: CreateEventScreen},
  ItemComponent: {screen: ItemComponent},
  Event: { screen: EventScreen},
});

const ProfileStack = createStackNavigator({
  Profile: { screen: ProfileScreen},
});

const SettingsStack = createStackNavigator({
  Settings: { screen: SettingsScreen},
});

const SearchStack = createStackNavigator({
    Search: { screen: SearchScreen},
    Result: { screen: ResultScreen}
});


export default createBottomTabNavigator({
  Home: { screen: HomeStack},
  Search: { screen: SearchStack},    
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
      } else if (routeName === 'Search'){
        iconName = 'md-search';
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