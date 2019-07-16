import React, { Component } from 'react';
import {Text, View, StyleSheet, StatusBar } from 'react-native';
import * as fonts from '../../constants/fonts';

export default HeaderTitle = (props) => {
    return (
        <View style={styles.container}>
            <Text style={[styles.headerText, {color: props.textColor}]}>{props.text}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
    },
    headerText: {
        fontSize: 24,
        lineHeight: 26,
        fontFamily: fonts.HelveticaNeue,
    }
})