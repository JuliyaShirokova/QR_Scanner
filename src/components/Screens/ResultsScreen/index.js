import React, { Component } from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import HeaderTitle from '../../Common/HeaderTitle';
import * as colors from '../../../constants/colors';
import ResultContainer from '../../ResultContainer';
import PopUpMenu from '../../Common/PopUpMenu';
  
  class ResultsScreen extends Component{

    static navigationOptions = ({ navigation }) => ({
        headerRight: (<View>{navigation.getParam('renderMenu')}</View>),
        headerLeft: null,
        headerTitle: (<HeaderTitle text={'QR Scanner - Result'} textColor={colors.titleText} />),
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
})
export default ResultsScreen;

