import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, StatusBar, PixelRatio} from 'react-native';
import CameraContainer from '../../CameraContainer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HeaderTitle from '../../Common/HeaderTitle';
import * as colors from '../../../constants/colors';
import SvgComponents from '../../../components/Common/SvgComponents';
import { scale, moderateScale, verticalScale} from '../../../utilits/scalable';


class MainScreen extends Component{
    constructor(props){
        super(props);
        this.state = {
            lightActive: false,
        }   
    }
    
    static navigationOptions = ({ navigation }) => ({
        headerRight: (<View style={styles.lightContainer}>
            <TouchableOpacity
                onPress = { navigation.getParam("onToggleLight") }
                style={styles.lightIconTouch}
            >
                <View style={styles.lightIconHolder}>
        {( navigation.getParam("lightActiveState") ) ? <SvgComponents.highlightOff /> : <SvgComponents.highlightOn /> }
                </View>
            </TouchableOpacity>
        </View>
        ), 
        headerTitle: (<HeaderTitle text={'QR Scanner'} textColor={colors.titleText} />),
        headerStyle: { 
            height: moderateScale(90),
            paddingTop: moderateScale(30),
            backgroundColor: colors.mainContrast,
        }
    });
    
    componentDidMount() {
        this.props.navigation.setParams({ 
            lightActiveState: this.state.lightActive,
            onToggleLight: this.toggleLight.bind(this)
        });
    }

    toggleLight = () => {
        this.setState({lightActive: !this.state.lightActive }, () => {
            return this.props.navigation.setParams({ 
                lightActiveState: this.state.lightActive,
            });
            
        })
    }
  

    render(){
        return (
            <View
                style={styles.container}
            >
                <CameraContainer lightActive = {this.state.lightActive} />
            </View>
        )
    }
}
const styles=StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    lightContainer: {
        width: moderateScale(52),
        paddingTop: moderateScale(2),
        height: moderateScale(26),
    },
    lightIconTouch: {
        flex: 1,
        paddingRight: moderateScale(16),
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    lightIconHolder: {
        width: moderateScale(24),
        height: moderateScale(24),
    }

})
export default MainScreen;

