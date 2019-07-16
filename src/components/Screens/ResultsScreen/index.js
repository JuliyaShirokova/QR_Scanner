import React, { Component } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LightingButton from '../MainScreen/LightingButton';
import HeaderTitle from '../../Common/HeaderTitle';
import * as colors from '../../../constants/colors';


class ResultsScreen extends Component{
    static navigationOptions = {
        headerTitle: (<HeaderTitle text={'Results'} textColor={colors.titleText} />),
        headerRight: (<LightingButton iconSize={24} iconColor={colors.white} />),
        headerStyle: { 
            height: 80,
            paddingTop: 26,
            backgroundColor: colors.mainContrast,
        }
    };

    render(){
        return (
            <View
                style={styles.container}
            >
                <Text>Results</Text>
            </View>
        )
    }
}
const styles=StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
export default ResultsScreen;

