import React, { Component } from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert, Linking} from 'react-native';
import * as colors from '../../constants/colors';
import * as fonts from '../../constants/fonts';
import { moderateScale } from '../../utilits/scalable';
import urlify from '../../utilits/urlify';
import Icon from 'react-native-vector-icons/FontAwesome';
import { withTranslation } from 'react-i18next';

const urlJulia='www.linkedin.com/in/juliya-shyrokova-b859b2127';
const urlAndrii='www.linkedin.com/in/andriituma/'

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
        const { t, i18n } = this.props;
        return (
            <View
                style={styles.container}
            >
                <View style={styles.aboutContent}>
                    <View style={{flexDirection: 'row', alignContent: 'center', }}>
                        <Text style={styles.aboutText}>{t('design')}</Text>
                        <TouchableOpacity
                            onPress={() => this.openUrl(urlAndrii)}
                        >
                            <Icon name="linkedin-square" size={24} color={'rgb(14,118,168)'} />
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: 'row', alignContent: 'center', }}>
                        <Text style={styles.aboutText}>{t('codding')}</Text>    
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
        lineHeight: moderateScale(25),
        color: colors.contentText,
    },
})
export default withTranslation('about')(About);

