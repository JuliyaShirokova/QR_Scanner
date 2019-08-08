import React from 'react';
import { Text, View, Modal, StyleSheet, Alert} from 'react-native';
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
import { store } from '../../../store';
import { resetStore } from '../../../actions';
import { useTranslation } from 'react-i18next';

const clearStore = () => {
    const { t, i18n } = useTranslation('common');
    return Alert.alert(
        t('sureClearHistory'),
        '',
        [
            {
                text: t('cancel'),
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {   
                text: t('OK'),
                onPress: () => store.dispatch(resetStore())
            },
          ],
          {cancelable: false},
    );
}
const PopUpMenuHistory = ( props ) => {  
    const { t, i18n } = useTranslation('menu');
    
    return (<Menu>
                <MenuTrigger customStyles={{triggerWrapper: styles.menuTrigger}}>
                        <Ionicons name='md-more' color='white' size={24} />
                </MenuTrigger>
                <MenuOptions customStyles={{optionsWrapper: styles.optionsWrapper, optionWrapper: {width: '100%', padding: 0, margin: 0}}}>
                    <MenuOption onSelect={() => clearStore()}>
                        <View style={[styles.menuItemHolder, styles.borderBottomStyle]}>
                            <Text style={styles.menuItemText}>{t('clearHistory')}</Text>
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
    )}

const  styles = StyleSheet.create({
    optionsWrapper: {
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
        width: moderateScale(170),
        marginHorizontal: moderateScale(14),
        alignItems: 'flex-end',
        borderWidth: 1
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

PopUpMenuHistory.propTypes = {
  navigation: PropTypes.object
};

export default PopUpMenuHistory;