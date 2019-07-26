import React, { Component } from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert, Linking, Dimensions, Clipboard} from 'react-native';
import * as colors from '../../constants/colors';
import * as fonts from '../../constants/fonts';
import { scale, moderateScale, verticalScale} from '../../utilits/scalable';
import getBottomPadding from '../../utilits/getBotomPadding';
import urlify from '../../utilits/urlify'

class Result extends Component{
    constructor(props){
        super(props);

        this.state={
            result: '', 
            disableMove: true,
            disableCopy: false,
        }
        this._setValues();
    }

    _setValues = async () => {
        const { results } = this.props;
        const isURL = await this.canOpen(results);
        return this.setState({
            disableMove: !isURL,
            result: results
        })
    }
    
    canOpen = (text) => {
        return Linking.canOpenURL(text)
            .then((supported) => {
                if (supported) {
                    return true;
                }else{
                    return false;
                }
                
            })
    }

    getResult = () => this.state.result;

    
    onMove = () => {
        const curr = this.state.result;
        const url = `${urlify(curr)}`;
        return Linking.canOpenURL(url)
            .then((supported) => {
                if (!supported) {
                Alert.alert("Can't handle url: ", url);
                } else {
                return Linking.openURL(url);
                }
            })
            .catch((err) => console.err('An error occurred', err));
    }

    copyToClipboard = async (text) => {
        await Clipboard.setString(text);
        Alert.alert('Copied to Clipboard!', text);
    };
  
    getOpacity = (dis) => {
        return (dis) ? 0.5 : 1
    }

    render(){
        return (
            <View
                style={styles.container}
            >
                <View
                    style={styles.resultContent}
                >
                    <Text style={styles.resultText}>{this.getResult()}</Text>
                </View>
                <View style={styles.actionButtons}>
                    <View style={style=styles.actionButtonHolder}>
                    
                        <TouchableOpacity
                            onPress={() => this.copyToClipboard(this.state.result)}
                            style={[styles.actionButton, {opacity: this.getOpacity(this.state.disableCopy)}]}
                            disabled={ this.state.disableCopy }
                        >
                            <Text style={styles.actionButtonText}>COPY</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={style=styles.actionButtonHolder}>
                        <TouchableOpacity
                            onPress={() => this.onMove()}
                            style={[styles.actionButton, {opacity: this.getOpacity(this.state.disableMove)}]}
                            disabled={ this.state.disableMove }
                        >    
                            <Text style={styles.actionButtonText}>MOVE</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}
const styles=StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: moderateScale(20),
    },
    resultContent: {
        flex: 1,
        marginTop: moderateScale(37),
    },
    resultText: {
        fontFamily: fonts.HelveticaNeue,
        fontSize: moderateScale(20),
        color: colors.contentText,
    },
    actionButtons: {
        marginTop: moderateScale(10),
        marginBottom: Math.min(moderateScale(getBottomPadding(11.2)), moderateScale(86)),
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    actionButtonHolder: {
        width: Math.min(Dimensions.get('window').width*0.406, moderateScale(146)),
        height: moderateScale(40)
    },
    actionButton: {
        width: '100%',
        height: '100%',
        backgroundColor: colors.mainContrast,
        justifyContent: 'center',
        alignItems: 'center'
    },
    actionButtonText: {
        fontFamily: fonts.HelveticaNeueMedium, 
        fontSize: moderateScale(18),
        lineHeight: moderateScale(20),
        color: colors.white,
    
    }

})
export default Result;

