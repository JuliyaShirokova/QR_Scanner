import React, { Component } from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert, Linking, Clipboard} from 'react-native';
import * as colors from '../../constants/colors';
import * as fonts from '../../constants/fonts';


class About extends Component{
    
    render(){
    
        return (
            <View
                style={styles.container}
            >
                <View style={styles.aboutContent}>
                    <Text style={styles.aboutText}>About this QR Scanner</Text>
                </View>
            </View>
        )
    }
}
const styles=StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    aboutContent: {
        marginTop: 35,
    },
    aboutText: {
        fontFamily: fonts.HelveticaNeue,
        fontSize: 20,
        color: colors.contentText,
    },
})
export default About;

