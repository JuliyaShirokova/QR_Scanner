import React, { Component } from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Tooltip} from 'react-native-elements';
import HeaderTitle from '../../Common/HeaderTitle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as colors from '../../../constants/colors';
import * as fonts from '../../../constants/fonts';
import ResultContainer from '../../ResultContainer';
import PopUpMenu from '../../Common/PopUpMenu';

class ResultsScreen extends Component{

    constructor(props){
        super(props);

        this.state={
            visibleMenu: false,
        }
    }

    static navigationOptions = ({ navigation }) => ({
        headerRight: (<View style={styles.menuContainer}>
            <Tooltip 
                popover={navigation.getParam('renderMenu')}
                toogleOnPress={false}
                withPointer={false}
                width={180}
                height={86}
                backgroundColor='white'
                withOverlay={false}
            >
                <Ionicons name="md-more" color="white" size={24} />
            </Tooltip>
        </View>),
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
        });
    };

    get toggleMenu(){
        return this.setState({
            visibleMenu: !this.state.visibleMenu,
        })
    }
    

    get renderMenu(){
        return (<PopUpMenu navigation={ this.props.navigation } />)
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

