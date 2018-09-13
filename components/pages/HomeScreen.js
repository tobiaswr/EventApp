import React from 'react';
import { StyleSheet, Text, View, Button, Alert, ListView, ScrollView} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Quickevent',
    headerTitleStyle: {
      fontSize: 18,
   },
   headerStyle: {
      backgroundColor: '#22561e',
      borderBottomColor: '#143311',
       borderBottomWidth: 1.5
   },
   headerTintColor: 'white',
    headerRight: ( 
      <View style={{flex: 1, paddingRight: 12, alignItems: 'center', justifyContent: 'center'}}>
        <Ionicons name = 'md-create' size= {25} color='#d8d8d8'
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
        <View>
          <ScrollView>
            <DataView>
              
            </DataView>
          </ScrollView>
        </View>
      )
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  event: {
    backgroundColor: '#3c4f3b',
    
  }
});
