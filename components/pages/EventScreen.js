import React from 'react';
import {StyleSheet, Text, View, Button, ImageBackground, Image} from 'react-native';

import {Container, Header, Left, Body, Content, Footer, FooterTab, Title, Right} from 'native-base';
import {Ionicons, FontAwesome, Entypo} from '@expo/vector-icons';

export default class EventScreen extends React.Component {
    static navigationOptions = {
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
            }      
         },
         headerTintColor:'#d8d8d8',
         shadowColor: '#000000', 
         elevation: 4,
    };

    render() {
        const { navigation } = this.props;
        const event = navigation.getParam('rowData', '');
        return(
        <View style={{backgroundColor: 'white', shadowRadius: 3, shadowOpacity:0.3, shadowOffset: {width: 1, height: 0}, shadowColor: '#000000', elevation: 4,}}>
          <View style={{height: 140, width: '100%', borderBottomColor: '#143311', borderBottomWidth: 1.5}}>
            <View style={{flex: 1, alignItems: 'flex-start', paddingTop:5, width: 70}}>
                <ImageBackground source={{uri: 'https://static.thenounproject.com/png/363633-200.png'}}
            style={{width: 60, height: 60,}} ></ImageBackground>
            </View>
            <View style={{alignItems: 'flex-start', position: 'absolute', paddingLeft: 65, top: 15}}>
                <Text style ={{fontSize:18,fontWeight:'500'}}>{event.user}</Text>
              <View style={{position: 'absolute',paddingLeft: 65,  top: 25, flexDirection:'row'}}>
                <Entypo style={{paddingRight:0, fontSize:12}} name='check'></Entypo>
                <Text style={{fontSize:11}}>{event.attendees.length}</Text> 
                <Entypo style={{paddingRight:0, fontSize:12}} name='circle-with-cross'></Entypo>
                <Text style={{fontSize:11}}>{event.decliners.length}</Text>
              </View>
            </View>
             
            <View style={{height: 80, justifyContent: 'center'}}>
                <Text style={{paddingLeft: 5, fontSize: 25}}>{event.eventDesc}</Text>
            </View>

          </View>

          <View style={{flexDirection: 'row', position: 'absolute', width: '100%'}}>
            <View style={{position: 'absolute', right: 10, paddingTop: 20, flexDirection: 'row'}}>
                <Entypo style={{paddingRight: 25, fontSize:35}} name='check' onPress = {() => alert('Ready to hang out!')}></Entypo>
                <Entypo style={{paddingRight:5, fontSize:35}} name='circle-with-cross'></Entypo>
            </View>
          </View>
        </View>
        )
    }
}