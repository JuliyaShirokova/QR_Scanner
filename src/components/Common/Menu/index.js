import React, {Component} from 'react';
import { ScrollView, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { NavigationActions, SafeAreaView } from 'react-navigation';
import * as fonts from '../../../constants/fonts';
import * as colors from '../../../constants/colors';

const Menu = ( props ) => {    
    const navigateToScreen = (route) => () => {
        const navigateAction = NavigationActions.navigate({
        routeName: route
        });
        props.navigation.dispatch(navigateAction);
    }
    
    return ( <SafeAreaView style={styles.saveAreaView}>
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.menuItemHolder}>
                        <TouchableOpacity
                            onPress={navigateToScreen('History')}
                            style={styles.menuItem}
                        >
                            <Text style={styles.menuItemText}>
                                History
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.menuItemHolder}>
                        <TouchableOpacity
                            onPress={navigateToScreen('About')}
                            style={styles.menuItem}
                        >
                            <Text style={styles.menuItemText}>
                                About QR Scanner
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const  styles = StyleSheet.create({
    saveAreaView: {
        flex: 1,
        paddingTop: 30,
    },
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

Menu.propTypes = {
  navigation: PropTypes.object
};

export default Menu;