import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, ActivityIndicator} from 'react-native';
import firebase from 'firebase';


export default class SignUpForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loading: false
        }
    }

    onButtonPress(){
        const {email, password} = this.state;

        this.setState({
            error:'',
            loading: true
        });

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(this.onSignUpSuccess.bind(this))
            .catch(this.onSignUpFailed.bind(this));
    }

    onSignUpSuccess() {
        this.setState({
            email:'',
            password:'',
            loading: false,
            error:'' });
            alert("User created successfully");
    }

    onSignUpFailed(err) {
        this.setState({
            loading:false,
            error: err.message
        });
    }

    render() {
        return (
            <View>            
                <TextInput 
                label='Username'
                placeholder='user@gmail.com'
                value={this.state.email}
                onChangeText={email => this.setState({email})}></TextInput>

                <TextInput 
                label='password'
                secureTextEntry={true}
                value={this.state.password}
                onChangeText={password => this.setState({password})}></TextInput>

                <Text>{this.state.error}</Text>

                {this.renderButton()}
            </View>
        );
    }

    renderButton(){
        if(this.state.loading){
            return <ActivityIndicator size='small'/>
        }
        return(
            <Button title='Sign up' onPress={this.onButtonPress.bind(this)}>
            </Button>
        );
    }
}