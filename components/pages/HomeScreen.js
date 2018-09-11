import React from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
    headerRight: ( 
      <View style={{flex: 1, paddingRight: 12, alignItems: 'center', justifyContent: 'center'}}>
        <Ionicons name = 'md-create' size= {25} />
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
