import React, { Component } from 'react';
import {View, Text, StyleSheet} from 'react-native';

class MainScreen extends Component{
    render(){
        return (
            <View
                style={styles.container}
            >
                <Text>Adding</Text>
            </View>
        )
    }
}
const styles=StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
export default MainScreen;

