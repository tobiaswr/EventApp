import React from 'react';
import {StyleSheet, Text, View, Button, ImageBackground, Image, TextInput, ScrollView, FlatList} from 'react-native';
import {ListItem} from 'react-native-elements';

import {Entypo, MaterialIcons} from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import firebase from 'firebase'

export default class EventScreen extends React.Component {
    static navigationOptions = {
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
            uid: firebase.auth().currentUser.uid,
            username: '',            
            event: null,
            index: null,
            comments: null,
            users: [],
            attendingCount: 0,
            decliningCount: 0,
        }

        //retrieves users to set the current user, so that comments will have an owner
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

    //accesses firebase and retrieves comments for the selected event
    getCommentsForEvent(event){
        firebase.database().ref('/events/' + event.id + '/comments').on('value', (snapshot) => {
            let data = snapshot.val();
            comments = Object.values(data);
            const result = comments.filter(comment => comment.commentText.length >0);
            this.state.comments = result;
        });
    }

    render() {
        const { navigation } = this.props;
        const event = navigation.getParam('event', '');
        this.getCommentsForEvent(event);
        const index = event.key;
        this.state.event = event;
        this.state.index = index;

        return(
        <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }} contentContainerStyle={styles.container} scrollEnabled={false}> 
            <View style={{backgroundColor: 'white', shadowRadius: 3, shadowOpacity:0.3, shadowOffset: {width: 1, height: 0}, shadowColor: '#000000', elevation: 4,}}>
                <View style={{height: 140, width: '100%', borderBottomColor: '#143311', borderBottomWidth: 1.5}}>
                    <View style={{flex: 1, alignItems: 'flex-start', paddingTop:5, width: 70}}>
                        <ImageBackground source={{uri: 'https://static.thenounproject.com/png/363633-200.png'}}
                        style={{width: 60, height: 60,}} ></ImageBackground>
                    </View>
                    <View style={{alignItems: 'flex-start', position: 'absolute', paddingLeft: 65, top: 15}}>
                        <Text style ={{fontSize:18,fontWeight:'500'}}>{event.owner}</Text>
                        <View style={{position: 'absolute',paddingLeft: 65,  top: 25, flexDirection:'row'}}>
                            <View style={{paddingRight:10, flexDirection:'row'}}>
                                <MaterialIcons style={styles.icons} name='event-available'></MaterialIcons>
                                <Text style={{fontSize:11, top: 2}}>{event.attendees.length}</Text> 
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <MaterialIcons style={styles.icons} name='event-busy'></MaterialIcons>
                                <Text style={{fontSize:11, top: 2}}>{event.decliners.length}</Text>
                            </View>
                    </View>
                </View>
             
                    <View style={{height: 80, justifyContent: 'center'}}>
                        <Text style={{paddingLeft: 5, fontSize: 25}}>{event.eventDesc}</Text>
                    </View>

                </View>

                    <View style={{position: 'absolute', right: 150, top: 13, flexDirection: "column"}}>
                        <Text style={{fontSize: 25}}>{event.eventTime}</Text>
                        <Text style={{fontSize: 13}}>{event.eventDate}</Text>
                    </View>
                <View style={{flexDirection: 'row', position: 'absolute', width: '100%'}}>
                    <View style={{position: 'absolute', right: 10, paddingTop: 20, flexDirection: 'row'}}>
                        <Entypo style={{paddingRight: 25, fontSize:35}} name='check' onPress = {() =>
                            {this.attend()
                            this.setState({dummy: 1})
                            }}></Entypo>
                        <Entypo style={{paddingRight:5, fontSize:35}} name='circle-with-cross' onPress = {() => 
                            {this.decline()
                            this.setState({dummy: 1})
                            }}></Entypo>
                    </View>
                </View>
                <ScrollView style={{height: '70%', position: 'relative'}}>
                <View style={{height: '100%', flexDirection: 'column'}}>
                        <FlatList style={{ height: '100%', width: '100%', backgroundColor:'transparent', borderBottomColor:'grey', borderBottomWidth:0.3}}
                        data={this.state.comments}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item}) => <ListItem style={styles.listItem} 
                        title={item.username}
                        subtitle={item.commentText}
                        leftAvatar={{source: {uri: 'https://static.thenounproject.com/png/363633-200.png'}}}
                            
                        />}/>   
                </View>
                </ScrollView>   
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

    //method to attend the selected event
    attend(){
        let username = this.state.username;
        let attendees = this.state.event.attendees;
        let attending = false;

        attendees.forEach(attendee => {
            if(attendee.username === username){
                attending = true;
            }
        })
        if(attending === false){
        firebase.database().ref('/events/' + this.state.event.id + '/attendees/').push({
            username,
        }).then((data)=>{
            alert('You are attending this event');
        }).catch((error)=>{
            console.log('error', error)
        })
    } else {
        alert('You have already joined this event')
    }

    }

    //method to decline the selected event
    decline(){
        let username = this.state.username;
        let decliners = this.state.event.decliners;
        let declining = false;

        decliners.forEach(decliner => {
            if(decliner.username === username){
                declining = true;
            }
        })
        if(declining === false){
            firebase.database().ref('/events/' + this.state.event.id + '/decliners/').push({
                username,
            }).then((data) => {
                alert('You have declined joining the event');
            }).catch((error) =>{
                console.log('error', error)
            })
        }else {
            alert('You have already declined this event')
        }


    }

    //method to post comment to the selected event
    postComment(){
        let {commentText} = this.state;
        this.setState({
            error:'',
            loading: true
        });
        let username = this.state.username;
        firebase.database().ref('/events/' + this.state.event.id + '/comments/').push({
            username,
            commentText
        }).then((data)=>{
            alert('Comment created successfully');
          }).catch((error)=>{
            //error callback
            console.log('error', error)
          })
          this.state.commentText = '';
          this.setState({dummy: 1});
          this.getCommentsForEvent(this.state.event);
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
    },
    icons: {
        paddingRight:0, 
        fontSize:13
    }
});