import React, { Component } from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import HeaderTitle from '../../Common/HeaderTitle';
import HistoryContainer from '../../HistoryContainer';
import * as colors from '../../../constants/colors';
import PopUpMenu from '../../Common/PopUpMenu';


class HistoryScreen extends Component{
    static navigationOptions = ({ navigation }) => ({
        headerRight: (<View>{navigation.getParam('renderMenu')}</View>),
        headerLeft: null,
        headerTitle: (<HeaderTitle text={'QR Scanner - History'} textColor={colors.titleText} />),
        headerStyle: { 
            height: 80,
            paddingTop: 26,
            backgroundColor: colors.mainContrast,
        }
    });

    componentDidMount = () => {
      this.props.navigation.setParams({
        renderMenu: this.renderMenu
      })
    };
    
    get renderMenu(){
        return (<PopUpMenu navigation={this.props.navigation} />)
    }


    render(){
        return (
            <View
                style={styles.container}
            >
                <HistoryContainer />
            </View>
        )
    }
}
const styles=StyleSheet.create({
    container: {
        flex: 1,
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
export default HistoryScreen;