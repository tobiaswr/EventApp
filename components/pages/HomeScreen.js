import React, { Component } from 'react';
import firebase from 'firebase';
import ItemComponent from './ItemComponent';
import { StyleSheet, Text, View, Alert, ListView, ScrollView, ImageBackground, Image, TouchableHighlight} from 'react-native';
import {Ionicons, FontAwesome, MaterialIcons, Entypo} from '@expo/vector-icons';

export default class HomeScreen extends Component {

  static navigationOptions = ({navigation}) => ({
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
  });

    state = {
        events: [],
    }

    componentDidMount() {
        firebase.database().ref('/events').on('value', (snapshot) => {
          if(snapshot.val() != null){
            let data = snapshot.val();
            let eventkeys = Object.keys(data);
            let events = Object.values(data);
            let comments = [];
            let i = 0;
            events.forEach(event => {
              event.id = eventkeys[i];
              firebase.database().ref('/events/' + event.id + '/comments').on('value', (snapshot) => {
                let data = snapshot.val();
                comments = Object.values(data);
                const result = comments.filter(comment => comment.commentText.length >0);
                comments = result;

              });
              firebase.database().ref('/events/' + event.id + '/attendees').on('value', (snapshot) => {
                let data = snapshot.val();
                attendees = Object.values(data);
              });
              firebase.database().ref('/events/' + event.id + '/decliners').on('value', (snapshot) => {
                let data = snapshot.val();
                decliners = Object.values(data);
                const filter = decliners.filter(decliner => decliner.username.length > 0);
                decliners = filter;
              });
              event.comments = comments;
              event.attendees = attendees;
              event.decliners = decliners;
              i++;
            })
            this.setState({events});
          }
         });
    }

    render() {
        return (
            <View style={styles.container}>
            {
                <ScrollView>               
                    ? <ItemComponent navigation={this.props.navigation} events={this.state.events} style={{width: '100%'}}/>  
                </ScrollView>
            }                
            </View>
        )
    }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  }
})