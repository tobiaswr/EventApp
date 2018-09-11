import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

export default class DetailsScreen extends React.Component {
    static navigationOptions = {
        title: "Profile"
    };

    render() {
        return(
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>Profile</Text>
            </View>
        )
    }
}