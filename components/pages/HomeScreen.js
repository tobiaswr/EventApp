import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class HomeScreen extends React.Component {
  static navigationOption = {
      title: "Home"
  };
  render(){
      return(
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'stretch'}}>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
});
