import React, { Component } from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import HeaderTitle from '../../Common/HeaderTitle';
import About from '../../About';
import * as colors from '../../../constants/colors';
import PopUpMenu from '../../Common/PopUpMenu';
import { scale, moderateScale, verticalScale} from '../../../utilits/scalable';

class AboutScreen extends Component{
    static navigationOptions = ({ navigation }) => ({
        headerRight: (<View>{navigation.getParam('renderMenu')}</View>),
        headerTintColor: colors.white,
        headerTitle: (<HeaderTitle text={'QR Scanner - About'} textColor={colors.titleText} />),
        headerStyle: { 
            height: moderateScale(90),
            paddingTop: moderateScale(30),
            backgroundColor: colors.mainContrastWithoutOpacity,
            elevation: 0,
            shadowOpacity: 0,
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
                <About />
            </View>
        )
    }
}
const styles=StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
})
export default AboutScreen;
