import React from 'react';
import {StyleSheet, Text, View, Button, ImageBackground, Image, TextInput, ScrollView, FlatList} from 'react-native';
import {ListItem} from 'react-native-elements';

import {Ionicons, FontAwesome, Entypo, MaterialIcons} from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import firebase from 'firebase'

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

    constructor(props) {
        super(props);
        this.state = {
            commentText: '',
            owner: firebase.auth().currentUser.uid,
            event: null,
            index: null,
            comments: null,
        }
    }    

    render() {
        const { navigation } = this.props;
        const event = navigation.getParam('event', '');
        console.log(event);
        const index = event.key;
        this.state.event = event;
        this.state.index = index;
        firebase.database().ref('/events/' + this.state.event.id + '/comments/').on('value', (snapshot) => {
            let data = snapshot.val();
            this.state.comments = Object.values(data);
            console.log(this.state.comments);
         });

         let commentsList = this.state.comments;
        return(
        <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }} contentContainerStyle={styles.container} scrollEnabled={false}> 
            <View style={{backgroundColor: 'white', shadowRadius: 3, shadowOpacity:0.3, shadowOffset: {width: 1, height: 0}, shadowColor: '#000000', elevation: 4,}}>
                <View style={{height: 140, width: '100%', borderBottomColor: '#143311', borderBottomWidth: 1.5}}>
                    <View style={{flex: 1, alignItems: 'flex-start', paddingTop:5, width: 70}}>
                        <ImageBackground source={{uri: 'https://static.thenounproject.com/png/363633-200.png'}}
                        style={{width: 60, height: 60,}} ></ImageBackground>
                    </View>
                    <View style={{alignItems: 'flex-start', position: 'absolute', paddingLeft: 65, top: 15}}>
                        <Text style ={{fontSize:18,fontWeight:'500'}}>{event.user}</Text>
                        <View style={{position: 'absolute',paddingLeft: 65,  top: 25, flexDirection:'row'}}>
                            <View style={{paddingRight:10, flexDirection:'row'}}>
                                <MaterialIcons style={{paddingRight:0, fontSize:13}} name='event-available'></MaterialIcons>
                                <Text style={{fontSize:11}}>1</Text> 
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <MaterialIcons style={{paddingRight:0, fontSize:13}} name='event-busy'></MaterialIcons>
                                <Text style={{fontSize:11}}>1</Text>
                            </View>
                        </View>
                    </View>
             
                    <View style={{height: 80, justifyContent: 'center'}}>
                        <Text style={{paddingLeft: 5, fontSize: 25}}>{event.eventDesc}</Text>
                    </View>

                </View>

                <View style={{flexDirection: 'row', position: 'absolute', width: '100%'}}>
                    <View style={{position: 'absolute', right: 10, paddingTop: 20, flexDirection: 'row'}}>
                        <Entypo style={{paddingRight: 25, fontSize:35}} name='check' onPress = {() =>
                            {event.attendees.length++
                            this.setState({dummy: 1})
                            alert('Ready to hang out!')}}></Entypo>
                        <Entypo style={{paddingRight:5, fontSize:35}} name='circle-with-cross' onPress = {() => 
                            {event.decliners.length++
                            this.setState({dummy: 1})
                            alert('You have chosen not to attend')}}></Entypo>
                    </View>
                </View>
                <View style={{height: '100%', flexDirection: 'column'}}>
                    <ScrollView style={{height: '100%', position: 'relative'}}>
                        <FlatList style={{ height: '100%', width: '100%', backgroundColor:'transparent', borderBottomColor:'grey', borderBottomWidth:0.3}}
                        data={commentsList}
                        renderItem={({item}) => <ListItem style={styles.listItem} 
                        title={item.owner}
                        subtitle={item.commentText}
                        leftAvatar={{source: {uri: 'https://static.thenounproject.com/png/363633-200.png'}}}
                            
                        > </ListItem>}
                        /> 
                        
                      
                    </ScrollView>
                </View>
            </View>
                <View style={{position:'absolute', bottom:0, flexDirection:'row', width:'100%', height: 55, backgroundColor: 'white', borderTopWidth: 1, borderTopColor: 'grey',}}>
                <TextInput placeholder='What would you like to comment?' style={styles.input} value = {this.state.commentText} onChangeText={commentText => this.setState({commentText})}></TextInput>
                
                <View style={{marginTop:7}}>
                <Button title = 'Post' onPress ={() => {this.postComment()}} ></Button>
                </View>
                </View>
        </KeyboardAwareScrollView>
        
        )
    }

    postComment(){
        const {commentText} = this.state;
        const owner = this.state.owner;
        
        this.setState({
            error:'',
            loading: true
        });

        firebase.database().ref('/events/' + this.state.event.id + '/comments/').push({
            owner,
            commentText
        }).then((data)=>{
            alert('Comment created successfully');
          }).catch((error)=>{
            //error callback
            console.log('error', error)
          })
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
    },
    input: {
        height: 50,
        backgroundColor:'white',
        width:'85%',
        marginTop: 2,
    },
    listItem: {
        width: '100%', 
        backgroundColor:'transparent', 
        borderTopColor:'grey', 
        borderTopWidth: 0.3,
    } 
});