import React, { Component } from 'react';
import firebase from 'firebase';
import {StyleSheet, View, Text} from 'react-native';

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
          uid: firebase.auth().currentUser.uid
        };
        
        
    }

    componentDidMount(){
        firebase.database().ref('users/').once('value', (snapshot) => {
            let data = snapshot.val();
            let users = Object.values(data);
            this.setState({users})            
        });
    }

    render() {
        this.state.users.forEach(user => {
            if(this.state.uid === user.uid){
                this.state.username= user.username;
            }
        });
        const username = this.state.username;
        console.log(username);
        return(
            <View>
                <Text>{this.state.username}</Text>
                <Text>{this.state.uid}</Text>
            </View>            
        );
    }
}