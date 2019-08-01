import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import * as fonts from '../../../constants/fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
  } from 'react-native-popup-menu';
import { scale, moderateScale, verticalScale} from '../../../utilits/scalable';


const PopUpMenu = ( props ) => {    
    return (<Menu>
                <MenuTrigger customStyles={{triggerWrapper: styles.menuTrigger}}>
                        <Ionicons name='md-more' color='white' size={24} />
                </MenuTrigger>
                <MenuOptions customStyles={{optionsContainer: styles.optionsContainer, optionsWrapper: styles.optionsWrapper, optionWrapper: {padding: 0, margin: 0}}}>
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
    optionsContainer: {
        width: moderateScale(180),
        alignItems: 'flex-start',
        padding: 0, 
        margin: 0
    },
    optionsWrapper: {
        flex: 1,
        padding: 0,
        margin: 0,
        elevation: 2,
        paddingVertical: moderateScale(7),
    },
    menuTrigger: {
        width: moderateScale(46),
        height: moderateScale(30),
        paddingTop: moderateScale(2),
        paddingRight: moderateScale(22),
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    menuItemHolder: {
        width: '100%',
        marginHorizontal: moderateScale(14),
        alignItems: 'flex-end',
    },
    borderBottomStyle: {
        borderColor: '#979797',
        borderBottomWidth: 1
    },
    menuItemText: {
        fontFamily: fonts.HelveticaNeue,
        fontSize: moderateScale(14),
        lineHeight: moderateScale(16),
        paddingVertical: moderateScale(10),
    }

})

PopUpMenu.propTypes = {
  navigation: PropTypes.object
};

export default PopUpMenu;