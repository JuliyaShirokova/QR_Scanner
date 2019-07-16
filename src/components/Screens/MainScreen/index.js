import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, StatusBar, PixelRatio} from 'react-native';
import Camera from '../../Camera';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HeaderTitle from '../../Common/HeaderTitle';
import * as colors from '../../../constants/colors';

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
                <MaterialCommunityIcons name={ ( navigation.getParam("lightActiveState") ) ? 'flashlight-off' : 'flashlight'  } size={24} color="#fff" />

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
                <Camera lightActive = {this.state.lightActive} />
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
        width: 30,
        height: 30,
        marginRight: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    lightIconHolder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },


})
export default MainScreen;

