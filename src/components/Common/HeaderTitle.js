import React, { Component } from 'react';
import {Text, View, StyleSheet, StatusBar } from 'react-native';
import * as fonts from '../../constants/fonts';
import { scale, moderateScale, verticalScale} from '../../utilits/scalable';

export default HeaderTitle = (props) => {
    return (
        <View style={styles.container}>
            <Text style={[styles.headerText, {color: props.textColor}]}>{props.text+'H'}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: moderateScale(16),
    },
    headerText: {
        fontSize: moderateScale(24),
        lineHeight: moderateScale(26),
        fontFamily: fonts.HelveticaNeue,
    }
})