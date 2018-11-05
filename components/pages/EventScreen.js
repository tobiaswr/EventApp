import React from 'react';
import {StyleSheet, Text, View, Button, ImageBackground, Image, TextInput, ScrollView} from 'react-native';

import {Ionicons, FontAwesome, Entypo, MaterialIcons} from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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
        const event = navigation.getParam('event', '');
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
                <View style={{height: 425, flexDirection: 'column'}}>
                    <ScrollView style={{height: '100%', position: 'relative'}}>
                <View style={{ height: 55, width: 365, backgroundColor:'white', borderRadius: 28, shadowRadius: 3, shadowOpacity:0.3, shadowOffset: {width: 1, height: 0}, shadowColor: '#000000', elevation: 4,}}>
                    <ImageBackground source={{uri: 'https://static.thenounproject.com/png/363633-200.png'}}
                        style={{top: 12, left: 8, width: 30, height: 30,}} ></ImageBackground>
                    <Text style={{position: "absolute", left: 80, top: 20}}>Seian</Text>
                </View>
            
            </ScrollView>
            </View>
            </View>
                <View style={{position:'absolute', bottom:30, flexDirection:'row', width:'100%', height:50}}>
                <TextInput placeholder='What would you like to comment?' style={styles.input}></TextInput>
                <Ionicons name='md-send' style={{fontSize:40, paddingLeft:13, paddingTop:5}} ></Ionicons>
                </View>
                <TextInput style={{backgroundColor:'transparent'}}></TextInput>
        </KeyboardAwareScrollView>
        
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
    },
    input: {
        height: 50,
        borderRadius:18,
        backgroundColor:'white',
        width:'85%',
    }, 
});