// ItemComponent.js

import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert, ListView, ScrollView, ImageBackground, Image, TouchableHighlight} from 'react-native';
import PropTypes from 'prop-types';
import {Ionicons, FontAwesome, MaterialIcons, Entypo} from '@expo/vector-icons';

export default class ItemComponent extends Component {

  static propTypes = {
      events: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
    this.state ={navigation: this.props.navigation}
  }

  render() {
    return (
      <View>
        {this.props.events.map((event, index) => {
            return (
                    <View style={{alignItems:'center'}} key={index}>
        <TouchableHighlight onPress ={() => this.state.navigation.navigate('Event', {event, index})} style= {{height: 75, width: '100%', backgroundColor:'white', borderRadius: 28,}}>
          <View style={{height: 75, backgroundColor:'white', borderBottomColor: 'black', borderBottomWidth: 0.5}}>
          <View style={{flex: 1, alignItems: 'flex-start', paddingTop:7.5 ,width: 70, }} >
          <ImageBackground source={{uri: 'https://static.thenounproject.com/png/363633-200.png'}}
            style={styles.image} ></ImageBackground>
          </View>
          <View style={{alignItems: 'flex-start', justifyContent: 'center', paddingLeft: 65, paddingBottom:7}}>
            <Text style ={{fontSize:18,fontWeight:'500'}}>{event.owner}</Text>
            <Text style={{fontSize: 12}} numberOfLines={1}>{event.eventDesc}</Text>
            <View style={{flexDirection: 'row', paddingTop:5}}>
              <View style={styles.iconView}>
                <FontAwesome style={{paddingRight:2, fontSize:11}} name = 'comment-o'></FontAwesome>
                <Text style={{fontSize:11}}>{event.comments.length}</Text> 
              </View>
              <View style={styles.iconView}>
                <MaterialIcons style={styles.entypoLogo} name='event-available'></MaterialIcons>
                <Text style={{fontSize:11}}>{event.attendees.length}</Text> 
              </View>
              <View style={styles.iconView}>
                <MaterialIcons style={styles.entypoLogo} name='event-busy'></MaterialIcons>
                <Text style={{fontSize:11}}>{event.decliners.length}</Text>
              </View>
            </View>
          </View>
          <View style={{position: 'absolute', right: 60, top: 14, flexDirection: "column"}}>
            <Text style={{fontSize: 25}}>{event.eventTime}</Text>
            <Text style={{fontSize: 13}}>{event.eventDate}</Text>
          </View>
          <View style={{position: 'absolute', width: '100%'}}>
            <Entypo style= {{fontSize: 35, position: 'absolute', right: 10, paddingTop: 15}} name='chevron-thin-right' >
            </Entypo>
          </View>
          </View>
          </TouchableHighlight>
        </View>
            )
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  iconView: {
    paddingRight: 20, 
    flexDirection:'row'
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