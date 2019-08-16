import React, { Component } from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Linking, Dimensions} from 'react-native';
import * as colors from '../../constants/colors';
import * as fonts from '../../constants/fonts';
import { moderateScale } from '../../utilits/scalable';
import getBottomPadding from '../../utilits/getBotomPadding';
import { copyToClipboard, onMove, getOpacity } from '../../utilits/actionButtonFunctions';
import { withTranslation } from 'react-i18next';

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

    render(){
        const { t, i18n } = this.props;
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
                            onPress={() => copyToClipboard(this.state.result, t)}
                            style={[styles.actionButton, {opacity: getOpacity(this.state.disableCopy)}]}
                            disabled={ this.state.disableCopy }
                        >
                            <Text style={styles.actionButtonText}>{t('copy')}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={style=styles.actionButtonHolder}>
                        <TouchableOpacity
                            onPress={() => onMove(this.state.result, t)}
                            style={[styles.actionButton, {opacity: getOpacity(this.state.disableMove)}]}
                            disabled={ this.state.disableMove }
                        >    
                            <Text style={styles.actionButtonText}>{t('move')}</Text>
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
        height: moderateScale(40),
        borderRadius: moderateScale(40)/2
    },
    actionButton: {
        width: '100%',
        height: '100%',
        backgroundColor: colors.mainContrast,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: moderateScale(40)/2    
    },
    actionButtonText: {
        fontFamily: fonts.HelveticaNeueMedium, 
        fontSize: moderateScale(18),
        lineHeight: moderateScale(20),
        color: colors.white,
    
    }

})
export default withTranslation('common')(Result);

