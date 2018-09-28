import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ActivityIndicator} from 'react-native';
import HomeScreen from './components/pages/HomeScreen';
import SettingsScreen from './components/pages/SettingsScreen';
import EventScreen from './components/pages/EventScreen';
import ProfileScreen from './components/pages/ProfileScreen';
import {Ionicons} from '@expo/vector-icons';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import firebase from 'firebase';
import SignUpForm from './components/pages/SignUpForm';
import SignInForm from './components/pages/SignInForm';


var bgColor = '#606075';
var navColor = '#3F3F54';




export default class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: null
    }
  }
  componentWillMount(){
    firebase.initializeApp({
      apiKey: "AIzaSyDSw2vJ98OAa3awMwy2CnTn4jcXe-bxpYk",
      authDomain: "eventapp-84264.firebaseapp.com",
      databaseURL: "https://eventapp-84264.firebaseio.com",
      projectId: "eventapp-84264",
      storageBucket: "eventapp-84264.appspot.com",
      messagingSenderId: "901253678500"
    });
  
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.setState({ loggedIn: true });
      }
      else {
        this.setState({ loggedIn: false});
      }
    });
  }
  
  render(){
    switch (this.state.loggedIn) {
      case false: 
      return (
          <View style={styles.container}>
            <SignInForm> </SignInForm>                                                                            
          </View>
      );
      case true:
        return (
        <View style={styles.container}>
          <HomeStack />
        </View>
        );
          
        default:
          return <ActivityIndicator size="large" />                                  
    }        
  }
};

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

const bottomNav = createBottomTabNavigator({
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});
