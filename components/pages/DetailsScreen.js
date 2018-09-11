import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

export default class DetailsScreen extends React.Component {
    static navigationOptions = {
        title: "Details"
    };

    render() {
        return(
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>Details!</Text>
            </View>
        )
    }
}