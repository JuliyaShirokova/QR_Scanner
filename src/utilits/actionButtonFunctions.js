import React, { Component } from 'react';
import {Alert, Linking, Clipboard} from 'react-native';
import urlify from './urlify';

export const copyToClipboard = async (curr, t ) => {
    
    await Clipboard.setString(curr);

    Alert.alert(
        t('copyToClipboard'),
        curr,
        [
            {   
                text: t('OK'),
                onPress: () => console.log('OK')
            },
        ]
    );
};

export const onMove = (curr, t ) => {
    const url = `${urlify(curr)}`;
  
    return Linking.canOpenURL(url)
        .then((supported) => {
            if (!supported) {
                Alert.alert(t('canNotHandlerURL'), url);
            } else {
                return Linking.openURL(url);
            }
        })
        .catch((err) => console.err('An error occurred', err));
}

export const getOpacity = (dis) => {
    return (dis) ? 0.5 : 1
}