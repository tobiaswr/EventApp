import React from 'react';
import { StyleSheet, Text, View, Alert, ListView, ScrollView, ImageBackground, Image, TouchableHighlight} from 'react-native';

import {Container, Header, Left, Body, Content, Footer, FooterTab, Title, Right, Button} from 'native-base';
import {Ionicons, FontAwesome, MaterialIcons, Entypo} from '@expo/vector-icons';

var eventArray = [{'user':'Tobias Rognstad', 'eventDesc':'Down på film i kveld?', 
'time':'19:00', 'day':'Torsdag', 'comments':[{'user':{},'event':{},'commentText':'Seian'}], 'attendees':[], 'decliners':[]}, 
{'user':'Martin Sørbø', 'eventDesc':'Game Fortnite i dag eller, bug?', 
'time':'19:00', 'day':'Fredag', 'comments':[{'user':{},'event':{},'commentText':'Yh'}], 'attendees':[{}], 'decliners':[]}];

var eventObject= {'user':'', 'eventDesc':'Down på film i kveld?', 
'time':'', 'day':'', 'comments':[], 'attendees':[], 'decliners':[]};
export default class HomeScreen extends React.Component {
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
      }, 
      shadowColor: '#000000', 
      elevation: 4,
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
      headerLeft: (
        <View style={{flex: 1,paddingLeft:12, alignItems: 'center', justifyContent: 'center'}}>
        <Ionicons name = 'md-menu' size= {28} color='#d8d8d8'
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
        <View style={{alignItems:'center', paddingTop:8}}>
        <TouchableHighlight style= {{height: 70, width: 365, backgroundColor:'white', borderRadius: 28, shadowRadius: 3, shadowOpacity:0.3, shadowOffset: {width: 1, height: 0}, shadowColor: '#000000', elevation: 4,}} onPress = {() => {this.props.navigation.navigate('Events', {rowData})}}>
          <View style={{height: 70, width: 365, backgroundColor:'white', borderRadius: 28, shadowRadius: 3, shadowOpacity:0.3, shadowOffset: {width: 1, height: 0}, shadowColor: '#000000', elevation: 4,}}>
          <View style={{flex: 1, alignItems: 'flex-start', paddingTop:5, width: 70}}>
          <ImageBackground source={{uri: 'https://static.thenounproject.com/png/363633-200.png'}}
            style={styles.image} ></ImageBackground>
          </View>
          <View style={{alignItems: 'flex-start', justifyContent: 'center', paddingLeft: 65, paddingBottom:7}}>
            <Text style ={{fontSize:18,fontWeight:'500'}}>{rowData.user}</Text>
            <Text style={{fontSize: 12}} numberOfLines={1}>{rowData.eventDesc}</Text>
            <View style={{flexDirection: 'row', paddingTop:5}}>
              <View style={{ paddingRight: 20, flexDirection:'row'}}>
                <FontAwesome style={{paddingRight:2, fontSize:11}} name = 'comment-o'></FontAwesome>
                <Text style={{fontSize:11}}>{rowData.comments.length}</Text> 
              </View>
              <View style={{paddingRight: 20, flexDirection:'row'}}>
                <MaterialIcons style={styles.entypoLogo} name='event-available'></MaterialIcons>
                <Text style={{fontSize:11}}>{rowData.attendees.length}</Text> 
              </View>
              <View style={{paddingRight: 20, flexDirection:'row'}}>
                <MaterialIcons style={styles.entypoLogo} name='event-busy'></MaterialIcons>
                <Text style={{fontSize:11}}>{rowData.decliners.length}</Text>
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
       
      
    }
  render(){
      return(
        <View>
          <ScrollView style={{height: '100%', position: 'relative'}}>
           <ListView style={{paddingBottom:10}} dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)}></ListView>
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
  },
  entypoLogo: {
    paddingRight:0, 
    fontSize:13,
  }
});
