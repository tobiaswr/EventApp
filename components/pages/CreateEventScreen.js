
import React, { Component } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import t from 'tcomb-form-native';

const Event = t.struct({
  email: t.String,
});

const Form = t.form.Form;

export default class CreateEventScreen extends Component {
    handleSubmit = () => {
        const value = this._form.getValue(); // use that ref to get the form value
        console.log('value: ', value);
    }
    
    render() {
        const { navigation } = this.props;
      return (
        <View style={styles.container}>
        <Form 
          ref={c => this._form = c} // assign a ref
          type={Event} 
        />
        <Button
          title="Sign Up!"
          onPress={this.handleSubmit}
        />
        </View>
      );
    }
  }
  
const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      marginTop: 50,
      padding: 20,
      backgroundColor: '#ffffff',
    },
});