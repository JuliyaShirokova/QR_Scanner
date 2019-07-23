import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, StatusBar, PixelRatio} from 'react-native';
import CameraContainer from '../../CameraContainer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HeaderTitle from '../../Common/HeaderTitle';
import * as colors from '../../../constants/colors';
import SvgComponents from '../../../components/Common/SvgComponents';

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
                style={styles.lightIconHolder}
            >
                <View style={{width: 24, height: 24}}>
        {( navigation.getParam("lightActiveState") ) ? <SvgComponents.highlightOff /> : <SvgComponents.highlightOn /> }
                </View>
            </TouchableOpacity>
        </View>
        ), 
        headerTitle: (<HeaderTitle text={'QR Scanner'} textColor={colors.titleText} />),
        headerStyle: { 
            height: 80,
            paddingTop: 26,
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
        width: 50,
        height: 30,
    },
    lightIconHolder: {
        flex: 1,
        paddingRight: 16,
        justifyContent: 'center',
        alignItems: 'flex-end',
    }

})
export default MainScreen;

