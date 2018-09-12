import React from 'react';
import { StyleSheet, Text, View, Button, Alert} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
    headerTitleStyle: {
      fontSize: 18,
   },
   headerStyle: {
      backgroundColor: '#3F3F54',
      borderBottomColor: '#282828',
       borderBottomWidth: 0,
   },
   headerTintColor: 'white',
    headerRight: ( 
      <View style={{flex: 1, paddingRight: 12, alignItems: 'center', justifyContent: 'center'}}>
        <Ionicons name = 'md-create' size= {25} color='#8F8FA8'
        onPress ={() => Alert.alert(
          '',
          'What would you like to invite to?',
          [
            {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false }
        )}
        />
      </View>
      ),
};
  render(){
      return(
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>

            <Text>Home!</Text>
            <Button
            title='Go to details'
            onPress={() => this.props.navigation.navigate('Details')}
            />
          </View>
      );
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});
