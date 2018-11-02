// ItemComponent.js

import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert, ListView, ScrollView, ImageBackground, Image, TouchableHighlight} from 'react-native';
import PropTypes from 'prop-types';
import {Ionicons, FontAwesome, MaterialIcons, Entypo} from '@expo/vector-icons';

const styles = StyleSheet.create({
    eventsList: {
        
    },
    eventtext: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
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

export default class ItemComponent extends Component {

  static propTypes = {
      events: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.eventsList}>
        {this.props.events.map((event, index) => {
            return (
                    <View style={{alignItems:'center', paddingTop:8}} key={index}>
        <TouchableHighlight style= {{height: 70, width: 365, backgroundColor:'white', borderRadius: 28, shadowRadius: 3, shadowOpacity:0.3, shadowOffset: {width: 1, height: 0}, shadowColor: '#000000', elevation: 4,}} onPress = {() => {this.props.navigation.navigate('Events')}}>
          <View style={{height: 70, width: 365, backgroundColor:'white', borderRadius: 28, shadowRadius: 3, shadowOpacity:0.3, shadowOffset: {width: 1, height: 0}, shadowColor: '#000000', elevation: 4,}}>
          <View style={{flex: 1, alignItems: 'flex-start', paddingTop:5, width: 70}}>
          <ImageBackground source={{uri: 'https://static.thenounproject.com/png/363633-200.png'}}
            style={styles.image} ></ImageBackground>
          </View>
          <View style={{alignItems: 'flex-start', justifyContent: 'center', paddingLeft: 65, paddingBottom:7}}>
            <Text style ={{fontSize:18,fontWeight:'500'}}>{}</Text>
            <Text style={{fontSize: 12}} numberOfLines={1}>{event.eventDesc}</Text>
            <View style={{flexDirection: 'row', paddingTop:5}}>
              <View style={{ paddingRight: 20, flexDirection:'row'}}>
                <FontAwesome style={{paddingRight:2, fontSize:11}} name = 'comment-o'></FontAwesome>
                <Text style={{fontSize:11}}>{}</Text> 
              </View>
              <View style={{paddingRight: 20, flexDirection:'row'}}>
                <MaterialIcons style={styles.entypoLogo} name='event-available'></MaterialIcons>
                <Text style={{fontSize:11}}>{}</Text> 
              </View>
              <View style={{paddingRight: 20, flexDirection:'row'}}>
                <MaterialIcons style={styles.entypoLogo} name='event-busy'></MaterialIcons>
                <Text style={{fontSize:11}}>{}</Text>
              </View>
            </View>
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