import React from 'react';
import {StyleSheet, Text, View, Button, ImageBackground} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

var bgColor = this.backgColor;

export default class DetailsScreen extends React.Component {
    static navigationOptions = {
        title: "Profile",
        headerTitleStyle: {
            fontSize: 18,
         },
         headerStyle: {
            backgroundColor: '#22561e',
            borderBottomColor: '#143311',
             borderBottomWidth: 0,
         },
         headerTintColor: 'white'
    };

    render() {
        return(
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            
                <View style={styles.topBox}>
                    <View style={styles.imageContainer}>
                        <ImageBackground source={{uri: 'https://static.thenounproject.com/png/363633-200.png'}}
                        style={styles.image} ></ImageBackground>
                    </View>
                        <View style={styles.infoContainer}>
                            <Text style={styles.name}>Name</Text>
                        <View style={styles.rows}>
                            <Ionicons name = 'md-at' size = {15} style= {styles.icons}></Ionicons>
                            <Text style={styles.infoText}>Username</Text>
                        </View>
                        <View style={styles.rows}>
                            <Ionicons name = 'md-compass' size = {15} style= {styles.icons}></Ionicons>                                       
                            <Text style={styles.infoText}>Location</Text>
                        </View> 
                    </View>
                </View>
                <View style={styles.mainBox}>

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    topBox: {
        width: '100%',
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'white',
        borderBottomWidth: 1.5,
        borderBottomColor: '#143311',
    },
    mainBox: {
        width: '100%',
        height: 385,
    },
    image: {
        width: 100,
        height: 100,

    },
    imageContainer: {
        position: 'absolute',
        left: 0, 
        paddingLeft: 20,
        paddingTop: 20,
    },
    infoContainer: {
        position: 'absolute',
        left: 0,
        paddingLeft: 20,
        paddingTop: 130,
        flexDirection: 'column',
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',

    },
    rows: {
       flexDirection: 'row',
    },
    icons: {
        paddingRight: 2,

    }
    
});