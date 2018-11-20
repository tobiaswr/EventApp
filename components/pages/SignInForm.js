import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, ActivityIndicator, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard} from 'react-native';
import firebase from 'firebase';
import SignUpForm from './SignUpForm'

export default class SignInForm extends React.Component{
    static navigationOptions = {
        headerTitle: (
          <Image source={require('./pictures/joininglogowhite.png')} style={{height: 115, width:115}}/>
        )
    };
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loading: false,
            hasLogin: true
        }
    }

    setLoginStateFalse(){
        this.setState({
            hasLogin: false
        });
    }

    setLoginStateTrue(){
        this.setState({
            hasLogin: true
        });
    }

    onButtonPress(){
        const {email, password} = this.state;

        this.setState({
            error:'',
            loading: true
        });

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess.bind(this))
            .catch(this.onLoginFailed.bind(this));
    }

    onLoginSuccess() {
        this.setState({
            email:'',
            password:'',
            loading: false,
            error:'' });
            alert("User logged in successfully");
    }

    onLoginFailed(err) {
        this.setState({
            loading:false,
            error: err.message
        });
    }

    render() {
        switch (this.state.hasLogin) {
            case true:
            return (
            
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled >    
                <Image source={require('./pictures/joininglogowhite.png')} style={{height: 200, width:200}}></Image>       
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
                <Button title='Sign up' onPress= {this.setLoginStateFalse.bind(this)}></Button>
            </KeyboardAvoidingView>
            
            );
            case false: 
            return (
                <View style={styles.container}>
                    <SignUpForm></SignUpForm>
                    <Button title='Go back' onPress={this.setLoginStateTrue.bind(this)}></Button>
                </View>

            )
        }
    }

    renderButton(){
        if(this.state.loading){
            return <ActivityIndicator size='small'/>
        }
        return(
            <KeyboardAvoidingView>
            <Button title='Log in' onPress={this.onButtonPress.bind(this)} style={styles.button}>
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