import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

export default class DetailsScreen extends React.Component {
    static navigationOptions = {
        title: "Profile",
        headerRight: ( 
            <Ionicons name = 'md-create' size= {25} />
          ),
    };

    render() {
        return(
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>Profile</Text>
            </View>
        )
    }
}
