import React from 'react';
import { StyleSheet, Text, View, Alert, ListView, ScrollView, ImageBackground, Image, TouchableHighlight} from 'react-native';
import {Ionicons, FontAwesome, MaterialIcons, Entypo} from '@expo/vector-icons';
import firebase from 'firebase';


export default class HomeScreen extends React.Component {
  
  

  static navigationOptions = ({navigation}) => ({
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
        onPress ={() => {navigation.navigate('CreateEvent')}}
        />
      </View>
      ),
      headerLeft: (
        <View style={{flex: 1,paddingLeft:12, alignItems: 'center', justifyContent: 'center'}}>
        <Ionicons name = 'md-menu' size= {28} color='#d8d8d8'/>
        </View>
      ),
  });

  constructor(props) {
    super(props);
    var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.guid != r2.guid});
    this.state = {
      dataSource: dataSource.cloneWithRows(firebase.database().ref('events/').once('value', function (snapshot){
        events = Object.values(snapshot.val());
        console.log(events);
      }))
      }
  }

 /* getEventsFromApiAsync(){
    var that = this;
    return JSON.stringify(firebase.database().ref('events/').on('value', function (snapshot) {
      events = Object.values(snapshot.val());
      console.log(events);
      that.setState({
        isLoading: false,
        dataSource: events,
      });
    }));
    
  }*/

  
    
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
            <Text style ={{fontSize:18,fontWeight:'500'}}>{}</Text>
            <Text style={{fontSize: 12}} numberOfLines={1}>{rowData.eventDesc}</Text>
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
