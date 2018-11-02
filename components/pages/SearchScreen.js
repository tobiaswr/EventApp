import React from 'react';
import {StyleSheet, Text, View, Button, ImageBackground, TextInput} from 'react-native';
import {Ionicons, MaterialIcons} from '@expo/vector-icons';
import {Font} from 'expo'
import { SearchBar } from 'react-native-elements';

var bgColor = this.backgColor;
Font.loadAsync({ 'Material Icons': require('@expo/vector-icons/fonts/MaterialIcons.ttf') })
Font.loadAsync({ 'Ionicons': require('@expo/vector-icons/fonts/Ionicons.ttf') })


export default class DetailsScreen extends React.Component {


    static navigationOptions = {
        headerTitle: 
        <View style={{width: '80%', backgroundColor: '#22561e'}}>
            <SearchBar 
            platform= "ios"
            value=''
            containerStyle={{backgroundColor: '#22561e', 
            borderTopColor: '#22561e', 
            borderBottomColor: '#22561e'}} 
            clearIcon={true} 
            placeholder='Search' 
            cancelButtonTitle='Cancel' 
            round
            
            />
        </View>
        ,
        headerStyle: {
            backgroundColor: '#22561e',
            shadowRadius: 4, 
            shadowOpacity:0.7, 
            shadowOffset: {
              width: 1, 
              height: 0
            }, 
            height: 75,
            shadowColor: '#000000', 
            elevation: 4,
         },
         headerTintColor: 'white'
    };

    render() {
        return(
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            </View>
        )
    }
}
