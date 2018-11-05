import React, { Component } from 'react';
import firebase from 'firebase';
import ItemComponent from './ItemComponent';
import { StyleSheet, Text, View, Alert, ListView, ScrollView, ImageBackground, Image, TouchableHighlight} from 'react-native';
import {Ionicons, FontAwesome, MaterialIcons, Entypo} from '@expo/vector-icons';



const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    }
  })

export default class HomeScreen extends Component {

  static navigationOptions = ({navigation}) => ({
    headerTitle: (
      <Image source={require('./pictures/hangoutslogod8d8d8.png')} style={{height: 115, width:115}}/>
  ),
   headerStyle: {
      backgroundColor: '#22561e',
      shadowRadius: 4, 
      shadowOpacity:0.7, 
      shadowOffset: {
        width: 1, 
        height: 0
      }, 
      shadowColor: '#000000', 
      elevation: 4,
   },
   headerTintColor: 'white',
    headerRight: ( 
      <View style={{flex: 1, paddingRight: 12, alignItems: 'center', justifyContent: 'center'}}>
        <Ionicons name = 'md-create' size= {25} color='#d8d8d8'
        onPress ={() => {navigation.navigate('CreateEvent')}}
        />
      </View>
      ),
      headerLeft: (
        <View style={{flex: 1,paddingLeft:12, alignItems: 'center', justifyContent: 'center'}}>
        <Ionicons name = 'md-menu' size= {28} color='#d8d8d8'/>
        </View>
      ),
  });

    state = {
        events: []
    }

    componentDidMount() {
        firebase.database().ref('/events').on('value', (snapshot) => {
            let data = snapshot.val();
            let eventkeys = Object.keys(data);
            let events = Object.values(data);
            let i = 0;
            events.forEach(event => {
              event.id = eventkeys[i];
              i++;
            })
            this.setState({events});
            console.log(events);
         });
    }

    render() {
        return (
            <View style={styles.container}>
            {
                <ScrollView>               
                    ? <ItemComponent navigation={this.props.navigation} events={this.state.events} style ={{paddingTop:0}} />  
                </ScrollView>
            }
                
            </View>
        )
    }
}