import React, { Component } from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert, Linking} from 'react-native';
import * as colors from '../../constants/colors';
import * as fonts from '../../constants/fonts';
import { scale, moderateScale, verticalScale} from '../../utilits/scalable';
import urlify from '../../utilits/urlify';
import Icon from 'react-native-vector-icons/FontAwesome';

const urlJulia='www.linkedin.com/in/juliya-shyrokova-b859b2127';


class About extends Component{
    
    
    openUrl = (text)=> {
        
        const url = `${urlify(text)}`;
        
        return Linking.canOpenURL(url)
            .then((supported) => {
                if (!supported) {
                Alert.alert("Can't handle url: ", url);
                } else {
                return Linking.openURL(url);
                }
            })
            .catch((err) => console.err('An error occurred', err));
    }
    render(){
    
        return (
            <View
                style={styles.container}
            >
                <View style={styles.aboutContent}>
                    <Text style={styles.aboutText}>Design by: Andrii Tuma</Text>
                    <View style={{flexDirection: 'row', alignContent: 'center', }}>
                        <Text style={styles.aboutText}>Coding by: Julia Shirokova  </Text>    
                        <TouchableOpacity
                            onPress={() => this.openUrl(urlJulia)}
                        >
                            <Icon name="linkedin-square" size={24} color={'rgb(14,118,168)'} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}
const styles=StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: moderateScale(20),
    },
    aboutContent: {
        flex: 1,
        marginTop: moderateScale(16),
    },
    aboutText: {
        fontFamily: fonts.HelveticaNeue,
        fontSize: moderateScale(16),
        lineHeight: moderateScale(23),
        color: colors.contentText,
    },
    urlStyle: {
        color: 'blue'
    }
})
export default About;

