import React from 'react';
import { StyleSheet, Text, View, Alert, ListView, ScrollView, ImageBackground} from 'react-native';

import {Container, Header, Left, Body, Content, Footer, FooterTab, Title, Right, Button} from 'native-base';
import {Ionicons, FontAwesome} from '@expo/vector-icons';

var eventArray = ["Down på å se film hos meg ikveld?", "Raclette hos meg idag?", "Noen som game fortnite?", "Hoste vors idag!"];

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

  constructor(props) {
    super(props);
    var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.guid != r2.guid});
    this.state = {
      dataSource: dataSource.cloneWithRows(eventArray)
    }
  }

    renderRow(rowData, sectionID, rowID) {
      return (
        <View style={{backgroundColor: 'white'}}>
          <View style={{height: 70, width: '100%', borderBottomColor: '#143311', borderBottomWidth: 1.5}}>
          <View style={{flex: 1, alignItems: 'flex-start', paddingTop: 5, width: 70}}>
          <ImageBackground source={{uri: 'https://static.thenounproject.com/png/363633-200.png'}}
            style={styles.image} ></ImageBackground>
          </View>
          <View style={{alignItems: 'flex-start', justifyContent: 'center', paddingLeft: 65, paddingBottom: 30}}>
          <Text style ={{fontSize:20,fontWeight:'500'}}>Tobias Rognstad</Text>
          <Text style={{fontSize: 15}} numberOfLines={1}>{rowData}</Text>
          <FontAwesome style={{alignItems: 'flex-end'}} name = 'comment-o'></FontAwesome>
          </View>
          </View>
        </View>
      )
       
      
    }
  render(){
      return(
        <View>
          <ScrollView style={{height: '100%', position: 'relative'}}>
           <ListView dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)}></ListView>
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
    width: 60,
    height: 60,
  }
});
