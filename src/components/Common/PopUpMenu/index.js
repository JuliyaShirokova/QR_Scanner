import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import navigation from 'react-navigation';
import * as fonts from '../../../constants/fonts';
import * as colors from '../../../constants/colors';

const PopUpMenu = ( props ) => {    

    return (<View style={styles.container}>
                <View style={styles.menuItemHolder}>
                    <TouchableOpacity
                        onPress={()=>props.navigation.navigate('History')}
                        style={styles.menuItem}
                    >
                        <Text style={styles.menuItemText}>
                            History
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.menuItemHolder}>
                    <TouchableOpacity
                        onPress={()=>props.navigation.navigate('About')}
                        style={styles.menuItem}
                    >
                        <Text style={styles.menuItemText}>
                            About QR Scanner
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
    );
}

const  styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 7,
        paddingHorizontal: 16,
    },
    menuItemHolder: {
        borderColor: '#979797',
        borderBottomWidth: 1
    },
    menuItem: {
        flex: 1,
    },
    menuItemText: {
        fontFamily: fonts.HelveticaNeue,
        fontSize: 14,
        lineHeight: 36,
    }

})

PopUpMenu.propTypes = {
  navigation: PropTypes.object
};

export default PopUpMenu;