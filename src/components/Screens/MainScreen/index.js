import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, StatusBar, Dimensions} from 'react-native';
import CameraContainer from '../../CameraContainer';
import HeaderTitle from '../../Common/HeaderTitle';
import * as colors from '../../../constants/colors';
import PopUpMenu from '../../Common/PopUpMenu';
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
        headerRight: (<View style={{flexDirection: 'row'}}>
                <View style={styles.lightContainer}>
                    <TouchableOpacity
                        onPress = { navigation.getParam("onToggleLight") }
                        style={styles.lightIconTouch}
                    >
                        <View style={styles.lightIconHolder}>
                            {( navigation.getParam("lightActiveState") ) ? <SvgComponents.highlightOff /> : <SvgComponents.highlightOn /> }
                        </View>
                    </TouchableOpacity>
                </View>
                <View>{navigation.getParam('renderMenu')}</View>
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
            onToggleLight: this.toggleLight.bind(this),
            renderMenu: this.renderMenu
        });
    }
    get renderMenu(){
        return (<PopUpMenu navigation={this.props.navigation} />)
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
        width: '100%',
        height: Dimensions.get('screen').height,
        position: 'absolute',
        top: -moderateScale(90),
        left: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    lightContainer: {
        width: moderateScale(28),
        paddingTop: moderateScale(2),
        height: moderateScale(30),
    },
    lightIconTouch: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    lightIconHolder: {
        width: moderateScale(24),
        height: moderateScale(24),
    }

})
export default MainScreen;

