import React, { Component } from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import HeaderTitle from '../../Common/HeaderTitle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as colors from '../../../constants/colors';
import * as fonts from '../../../constants/fonts';
import ResultContainer from '../../ResultContainer';

class ResultsScreen extends Component{
    static navigationOptions = ({ navigation }) => ({
        headerRight: (<View style={styles.menuContainer}>
            <TouchableOpacity style={styles.manuIconHolder} onPress = {()=>{}}>
                <Ionicons name="md-more" color={colors.white} size={24} />
            </TouchableOpacity>
        </View>),
        headerLeft: null,
        headerTitle: (<HeaderTitle text={'QR Scanner - Result'} textColor={colors.titleText} />),
        headerStyle: { 
            height: 80,
            paddingTop: 26,
            backgroundColor: colors.mainContrast,
        }
    });

    render(){
        return (
            <View
                style={styles.container}
            >
                <ResultContainer />
            </View>
        )
    }
}
const styles=StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
    },
    menuContainer: {
        width: 30,
        height: 30,
        marginRight: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    manuIconHolder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
export default ResultsScreen;

