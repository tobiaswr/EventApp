import React, { Component, TouchableOpacity } from 'react'
import {Ionicons, FontAwesome, MaterialIcons, Entypo} from '@expo/vector-icons';

import {
  DatePickerIOS,
  View,
  StyleSheet,
  Text,
  TextInput,
  Button,
  Image,
} from 'react-native'
import firebase from 'firebase'

export default class CreateEventScreen extends Component {
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
  });

  constructor(props) {
    super(props);
    this.state = { 
      chosenDate: new Date(),
      username: '',
      uid: firebase.auth().currentUser.uid
    };

    this.setDate = this.setDate.bind(this);

    firebase.database().ref('users/').once('value', (snapshot) => {
      let data = snapshot.val();
      let users = Object.values(data);
      let uid = this.state.uid;
      users.forEach(user => {
          if(uid === user.uid){
              this.state.username = user.username;
          }
      });
  });
  }

  setDate(newDate) {
    this.setState({chosenDate: newDate})
  }

  writeEvent(){
    const decliners = [{'username' : ''}];
    const comments = [{'username':'', 'commentText':''}];
    let owner = this.state.username;
    const attendees = [{'username' : owner}];
    const month = this.state.chosenDate.getMonth()+1;
    let day = '';
    let dayNow = this.state.chosenDate.getDate();
    if (dayNow < 10){
      day = '0' + dayNow;
    }
    else{
      day = dayNow;
    }
    let minutes = 0;
    if (this.state.chosenDate.getMinutes() < 10){
      minutes = '0' + this.state.chosenDate.getMinutes();
    }
    else{
      minutes = this.state.chosenDate.getMinutes();
    }
    let hours = 0;
    if (this.state.chosenDate.getHours()<10){
      hours = '0' + this.state.chosenDate.getHours();
    }
    else{
      hours = this.state.chosenDate.getHours();
    }
    const eventDesc = this.state.eventDesc;
    const eventDate = day + '/' + month;
    const eventTime = hours + ':' + minutes;
    

    firebase.database().ref('events/').push({
      eventDesc,
      eventDate,
      eventTime,
      attendees,
      decliners,
      comments,
      owner
    }).then((data)=>{
      alert('Event created successfully');
    }).catch((error)=>{
      //error callback
      console.log('error', error)
    })
  }

  render() {

  

    return (
     
      <View style={styles.container}>
      <Text style ={styles.textHead}>What would you like to invite to?</Text>
      <TextInput placeholder ='Describe your event here' style={styles.textInput} value={this.state.eventDesc} onChangeText={eventDesc => this.setState({eventDesc})}></TextInput>
      <Text style ={styles.textHead}>Select date and time:</Text>
      <DatePickerIOS
        mode= 'datetime'
        confirmBtnText='Confirm'
        cancelBtnText='Cancel'                  
        date={this.state.chosenDate}
        onDateChange={this.setDate}
      />
      <Button title='Create event' onPress={() => this.writeEvent()}></Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },

  textHead:{
    fontSize: 20,
    alignSelf: 'center'
  },

  textInput:{
    alignSelf: 'center'
  }
})