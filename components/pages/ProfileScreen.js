import React, { Component } from 'react';
import firebase from 'firebase';
import {StyleSheet, View, Text, ImageBackground, ScrollView} from 'react-native';
import ItemComponent from './ItemComponent';

export default class ProfileScreen extends Component{
    static navigationOptions = ({navigation}) => ({
        headerTitle: 'Profile',
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
    
    })

    constructor(props) {
        super(props);
        this.state = {
          users: [],
          username: '',
          events: [],
          myEvents: [],
        };
        
        
    }

    componentDidMount(){
        firebase.database().ref('users/').once('value', (snapshot) => {
            let data = snapshot.val();
            let users = Object.values(data);
            this.setState({users})            
        });

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
        this.state.users.forEach(user => {
            if(this.state.uid === user.uid){
                this.state.username= user.username;
            }
        });
        let events = [];
        this.state.events.forEach(event => {
            if(event.owner === 'martings'){
                this.state.myEvents.push(event);
            }
        })
        return(
            <View style={{flex: 1, justifyContent: 'center'}}>
                <View style={{height: '20%', backgroundColor: 'white', flexDirection: 'row'}}>
                <ImageBackground source={{uri: 'https://static.thenounproject.com/png/363633-200.png'}}
                style={{width: 75, height: 75, top: 10, left: 10}}
                ></ImageBackground>
                <Text style={{fontSize: 30, top: 20, left: 20}}>{this.state.username}</Text>


                </View>
                <View style={{height: 25, backgroundColor: 'white', borderBottomWidth: 0.5, borderColor: '#22561e'}}>
                <Text style={{fontSize: 25,}}>My events:</Text>
                </View>
                <ScrollView >
                    ? <ItemComponent navigation={this.props.navigation} events={this.state.myEvents} style={{width: '100%'}}/>  
                </ScrollView>
            </View>            
        );
    }
}