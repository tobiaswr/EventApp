
import React from 'react';
import { StyleSheet, View, ActivityIndicator} from 'react-native';
import firebase from 'firebase';
import SignInForm from './components/pages/SignInForm';
import Home from './Home';


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
          <Home/>
        </View>
        );
          
        default:
          return <ActivityIndicator size="large" />                                  
    }        
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});
