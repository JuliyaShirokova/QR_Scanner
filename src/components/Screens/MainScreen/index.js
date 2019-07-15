import React, { Component } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Camera from '../../Camera';

class MainScreen extends Component{
    render(){
        return (
            <View
                style={styles.container}
            >
                <Camera />
            </View>
        )
    }
}
const styles=StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
})
export default MainScreen;

