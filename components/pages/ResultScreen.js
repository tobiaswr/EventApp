import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import firebase from 'firebase';


export default class ResultScreen extends React.Component {
  static navigationOptions = {
        headerTitle: (
        <Image source={require('./pictures/joininglogowhite.png')} style={{height: 115, width:115}}/>
    ),
     headerStyle: {
        backgroundColor: '#22561e',
        shadowRadius: 4, 
        shadowOpacity:0.7, 
        shadowOffset: {
          width: 1, 
          height: 0   
        }      
     },
     headerTintColor:'#d8d8d8',
     shadowColor: '#000000', 
     elevation: 4,

  };
    render() {
    return (
      <View style= {styles.container}>
          <Button style= {styles.logOut} title= "Log Out" onPress = {() => {firebase.auth().signOut()}}>
          </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logOut: {
    position: "absolute",
    top: 0, 
    height: 80,
    width: '100%',
    borderColor: 'black',
    borderWidth: 1,
  }
});
