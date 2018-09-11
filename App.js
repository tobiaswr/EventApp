import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './components/pages/HomeScreen';
import SettingsScreen from './components/pages/SettingsScreen';
import DetailsScreen from './components/pages/DetailsScreen';
import {Ionicons} from '@expo/vector-icons';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';

const HomeStack = createStackNavigator({
  Home: { screen: HomeScreen},
  Details: { screen: DetailsScreen},
});

const SettingsStack = createStackNavigator({
  Settings: { screen: SettingsScreen},
  Details: { screen: DetailsScreen},
});

export default createBottomTabNavigator({
  Home: { screen: HomeStack},
  Settings: { screen: SettingsStack},
}, 

{
  navigationOptions: ({ navigation }) => ({

    tabBarIcon: ({ focused, tintColor }) => {

      const { routeName } = navigation.state;
      var iconName;

      if (routeName === 'Home') {
        iconName = 'md-home';
      } else if(routeName === 'Settings'){
        iconName = 'md-cog';
      }
      return <Ionicons name = {iconName} size = {20} color = {tintColor} />;
    }
  }), 
  tabBarOptions: {
    activateTintColor: 'green',
    inactiveTintColor: 'gray',    
  }  
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
