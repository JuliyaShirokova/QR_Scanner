import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as fonts from '../../../constants/fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
  } from 'react-native-popup-menu';
import { moderateScale } from '../../../utilits/scalable';
import { useTranslation } from 'react-i18next';

const PopUpMenu = ( props ) => {    
    const { t, i18n } = useTranslation('menu');
    return (<Menu>
                <MenuTrigger customStyles={{triggerWrapper: styles.menuTrigger}}>
                        <Ionicons name='md-more' color='white' size={24} />
                </MenuTrigger>
                <MenuOptions customStyles={{optionsWrapper: styles.optionsWrapper, optionWrapper: {padding: 0, margin: 0}}}>
                    <MenuOption onSelect={() => props.navigation.navigate('History')}>
                        <View style={[styles.menuItemHolder, styles.borderBottomStyle]}>
                            <Text style={styles.menuItemText}>{t('history')}</Text>
                        </View>
                    </MenuOption>
                    <MenuOption onSelect={() => props.navigation.navigate('About')} >
                        <View style={[styles.menuItemHolder, styles.borderBottomStyle]}>
                            <Text style={styles.menuItemText}>{t('about')}</Text>
                        </View>
                    </MenuOption>
                    <MenuOption onSelect={() => props.navigation.navigate('ChangeLang')} >
                        <View style={styles.menuItemHolder}>
                            <Text style={styles.menuItemText}>{t('changeLang')}</Text>
                        </View>
                    </MenuOption>
                </MenuOptions>
            </Menu>
    )
}


export default PopUpMenu;

const  styles = StyleSheet.create({
    optionsWrapper: {
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
        width: moderateScale(170),
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
