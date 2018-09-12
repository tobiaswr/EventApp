import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

export default class DetailsScreen extends React.Component {
    static navigationOptions = {
        title: 'Profile',
        headerTitleStyle: {
           fontSize: 18,
        },
        headerStyle: {
           backgroundColor: '#3F3F54',
           borderBottomColor: '#282828',
            borderBottomWidth: 0,
        },
        headerTintColor: 'white',
     }

    render() {
        return(
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>Profile</Text>
            </View>
        )
    }
}
