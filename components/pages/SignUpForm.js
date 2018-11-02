import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, ActivityIndicator, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard} from 'react-native';
import firebase from 'firebase';
import SignInForm from './SignInForm';


export default class SignUpForm extends React.Component{
    static navigationOptions = {
        headerTitle: (
          <Image source={require('./pictures/hangoutslogod8d8d8.png')} style={{height: 115, width:115}}/>
        )
    };
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
            
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled >    
                <Image source={require('./pictures/hangoutslogod8d8d8.png')} style={{height: 200, width:200}}></Image>       
                    <TextInput 
                    style={styles.input}
                    label='Username'
                    placeholder='user@gmail.com'
                    value={this.state.email}
                    onChangeText={email => this.setState({email})}></TextInput>

                    <TextInput 
                    style={styles.input}
                    label='password'
                    secureTextEntry={true}
                    placeholder='password'
                    value={this.state.password}
                    onChangeText={password => this.setState({password})}></TextInput>

                    <Text>{this.state.error}</Text>

                {this.renderButton()}
            </KeyboardAvoidingView>
            
        );
    }

    renderButton(){
        if(this.state.loading){
            return <ActivityIndicator size='small'/>
        }
        return(
            <KeyboardAvoidingView>
            <Button title='Sign up' onPress={this.onButtonPress.bind(this)} style={styles.button}>
            </Button>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#22561e',
        alignItems: 'center',
        justifyContent: 'center',
      },
    input: {
        borderColor: '#f0eff5',
        backgroundColor: 'white',
        height: 50,
        width: 250,
        marginBottom: 10,
        borderWidth: 1,
        borderRadius: 8,
        fontSize: 17,
        shadowRadius: 2, 
        shadowOpacity:0.3, 
        shadowOffset: {
            width: 0, 
            height: 0
        }, 
        shadowColor: '#000000', 

    },
    button: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 20,
    }
});