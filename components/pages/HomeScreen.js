import React from 'react';
import { StyleSheet, Text, View, Alert, ListView, ScrollView, ImageBackground, Image, TouchableHighlight} from 'react-native';
import {Ionicons, FontAwesome, MaterialIcons, Entypo} from '@expo/vector-icons';
import firebase from 'firebase';


export default class HomeScreen extends React.Component {
  
  
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  event: {
    backgroundColor: '#3c4f3b',
    
  },
  image: {
    width: 60,
    height: 60,
  },
  entypoLogo: {
    paddingRight:0, 
    fontSize:13,
  }
});
