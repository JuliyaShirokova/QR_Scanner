import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import * as fonts from '../../../constants/fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
  } from 'react-native-popup-menu';
import * as colors from '../../../constants/colors';

const PopUpMenu = ( props ) => {    
    return (<Menu>
                <MenuTrigger customStyles={{triggerWrapper: styles.menuTrigger}}>
                        <Ionicons name='md-more' color='white' size={24} />
                </MenuTrigger>
                <MenuOptions customStyles={{optionsWrapper: styles.optionsWrapper, optionWrapper: {padding: 0, margin: 0}}}>
                    <MenuOption onSelect={() => props.navigation.navigate('History')}>
                        <View style={[styles.menuItemHolder, styles.borderBottomStyle]}>
                            <Text style={styles.menuItemText}>History</Text>
                        </View>
                    </MenuOption>
                    <MenuOption onSelect={() => props.navigation.navigate('About')} >
                        <View style={styles.menuItemHolder}>
                            <Text style={styles.menuItemText}>About QR Scanner</Text>
                        </View>
                    </MenuOption>
                </MenuOptions>
            </Menu>
    )}

const  styles = StyleSheet.create({
    optionsWrapper: {
        elevation: 5,
        paddingVertical: 7,
    },
    menuTrigger: {
        width: 48,
        height: 30,
        paddingRight: 16,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    menuItemHolder: {
        marginHorizontal: 14,
        alignItems: 'flex-end',
    },
    borderBottomStyle: {
        borderColor: '#979797',
        borderBottomWidth: 1
    },
    menuItemText: {
        fontFamily: fonts.HelveticaNeue,
        fontSize: 14,
        lineHeight: 16,
        paddingBottom: 10,
        paddingTop: 10,
    }

})

PopUpMenu.propTypes = {
  navigation: PropTypes.object
};

export default PopUpMenu;