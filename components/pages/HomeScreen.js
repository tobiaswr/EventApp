import React from 'react';
import { StyleSheet, Text, View, Alert, ListView, ScrollView, ImageBackground, Image, TouchableHighlight} from 'react-native';
import {Ionicons, FontAwesome, MaterialIcons, Entypo} from '@expo/vector-icons';
import firebase from 'firebase';


export default class HomeScreen extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
        events: [],
        dataSource: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2
        }),
    }
  }

  componentWillMount() {
    const that = this;
    firebase.database().ref('events/').on('value', function(data) {
        that.setState({ events: Object.values(data.val()) });
    });
  }

  getDataSource(events: Array<any>): ListView.DataSource {
    if(!events) return;
    return this.state.dataSource.cloneWithRows(events);
  }

  componentDidMount() {
    this.setState({dataSource: this.getDataSource(this.props.events)});
  }

  componentWillReceiveProps(props) {
    this.setState({dataSource: this.getDataSource(props.events)});
  }

  renderRow(rowData, sectionID, rowID, event) {
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
     
    
  }

  render(){
    if (!this.state.events.length) {
      return (
        <View>
          <Text>NO EVENTS TO LIST</Text>
        </View>
      )
    }
    return (
      <ListView
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow.bind(this)}
      />
    )
    
  }
  
}
