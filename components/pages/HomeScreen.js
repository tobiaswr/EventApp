import React from 'react';
import { StyleSheet, Text, View, Alert, ListView, ScrollView, ImageBackground} from 'react-native';

import {Container, Header, Left, Body, Content, Footer, FooterTab, Title, Right, Button} from 'native-base';
import {Ionicons} from '@expo/vector-icons';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Quickevent',
    headerTitleStyle: {
      fontSize: 18,
   },
   headerStyle: {
      backgroundColor: '#22561e',
      borderBottomColor: '#143311',
       borderBottomWidth: 1.5
   },
   headerTintColor: 'white',
    headerRight: ( 
      <View style={{flex: 1, paddingRight: 12, alignItems: 'center', justifyContent: 'center'}}>
        <Ionicons name = 'md-create' size= {25} color='#d8d8d8'
        onPress ={() => Alert.alert(
          '',
          'What would you like to invite to?',
          [
            {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false }
        )}
        />
      </View>
      ),
};
  render(){
      return(
        <View>
          <ScrollView style={{height: '100%', position: 'relative'}}>

              <Header style={{height:70, width: '100%', position:'absolute'}}>
                <Left style={{flex: 1, alignItems: 'flex-start', paddingBottom:45, width: 70}}>
                
                <ImageBackground source={{uri: 'https://static.thenounproject.com/png/363633-200.png'}}
                        style={styles.image} ></ImageBackground>
                </Left>
                <Text style ={{fontSize:18,fontWeight:'500', height:'100%', position:'absolute', paddingTop:15, paddingRight:70}}>Tobias Rognstad</Text>
                <Text style={{width:'80%',paddingLeft:7}}>Down på å se film hos meg i kveld?</Text>
              </Header>
           
          </ScrollView>
        </View>
      )
  }

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
    width: 70,
    height: 70,
  }
});
