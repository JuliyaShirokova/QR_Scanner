import React, { Component } from 'react';
import {View, Text, TouchableOpacity, SectionList, StyleSheet, Alert, Linking, Clipboard, Dimensions} from 'react-native';
import * as colors from '../../constants/colors';
import * as fonts from '../../constants/fonts';
import { ScrollView } from 'react-native-gesture-handler';
import { scale, moderateScale, verticalScale} from '../../utilits/scalable';
import getBottomPadding from '../../utilits/getBotomPadding';
import urlify from '../../utilits/urlify';
import { withTranslation } from 'react-i18next';

class History extends Component{
    constructor(props){
        super(props);
    
        this.state = {
            disableMove: true,
            disableCopy: true,
            selectedKey: '',
            selectedData: '',
        };
        
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
            .catch((err) => console.err('An error occurred', err));  
        
    }

    onItemPress = async ( elKey, elData ) => {
        const isSelected = (elKey == this.state.selectedKey) ? true : false;
        const valKey = ( isSelected ) ? '' : elKey; 
        const valData = ( isSelected ) ? '' : elData; 
        const isEmpty = (valKey == '') ? true : false;
        
        const url = `${urlify(valData)}`;

        if ( url != ''){
            isURL = await this.canOpen(url);      
        }else{
            isURL=false;
        }
        
        this.setState({
            disableMove: !isURL,
            disableCopy: isEmpty,
            selectedKey: valKey,
            selectedData: valData
        })
    }

    getItemStyle = ( elKey ) => {
    
        const bColor = (elKey == this.state.selectedKey) ? colors.selectBackground : 'transparent'; 
        return {
            backgroundColor: bColor
        }
    }

    getItemTextStyle = ( elKey ) => {
    
        const tColor = (elKey == this.state.selectedKey) ? colors.white : colors.black; 
        return {
            color: tColor
        }
    }


    renderHistoryItem = (item, index) => {
        const elKey = item.toString()+index;
        return (
            <View
                key={index}
            >
                <TouchableOpacity
                    style={[styles.historyItem, this.getItemStyle( elKey )]}
                    onPress={() => this.onItemPress( elKey, item ) }
                >
                    <Text style={[styles.historyItemText, this.getItemTextStyle( elKey )]}>{ item }</Text>
                </TouchableOpacity>
            </View>
        )
    }
    prepareData = ( arrData ) => {
        const preparedData = arrData.map( (val, ind, arr) => (arr[ind]));
        return [{ data: preparedData}] || [];
    }

    getList = () => {
        const { results } = this.props;
        const list = (<SectionList
                        style={styles.sectionList}
                        renderItem={({item, index, section}) => this.renderHistoryItem(item, index)}
                        sections={this.prepareData( results )}
                        keyExtractor={(item, index) => item + index}
                    />
                )
        return list || 'No results';
    }

    onMove = () => {
        const curr = this.state.selectedData;    
        const url = `${urlify(curr)}`;
        return Linking.canOpenURL(url)
            .then((supported) => {
                if (!supported) {
                    Alert.alert(t('canNotHandlerURL'), url);
                } else {
                    return Linking.openURL(url);
                }
            })
            .catch((err) => console.err('An error occurred', err));
    }

    copyToClipboard = async () => {
        const curr = this.state.selectedData;
        await Clipboard.setString(curr);
        Alert.alert(t('copyToClipboard'), curr);
    };
    getOpacity = (dis) => {
        return (dis) ? 0.5 : 1
    }

    render(){
        const { t, i18n } = this.props;
        return (
            <View
                style={styles.container}
            >
                <View
                    style={styles.historyContent}
                >
                    <ScrollView style={style=styles.scrollStyle}>
                        {this.getList()}
                    </ScrollView>
                </View>
                <View style={styles.actionButtons}>
                    <View style={style=styles.actionButtonHolder}>
                    
                        <TouchableOpacity
                            onPress={() => this.copyToClipboard('text')}
                            style={[styles.actionButton, {opacity: this.getOpacity(this.state.disableCopy)}]}
                            disabled={ this.state.disableCopy }
                        >
                            <Text style={styles.actionButtonText}>{t('copy')}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={style=styles.actionButtonHolder}>
                        <TouchableOpacity
                            onPress={() => this.onMove()}
                            style={[styles.actionButton, {opacity: this.getOpacity(this.state.disableMove)}]}
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
    },
    historyContent: {
        flex: 1,
    },
    scrollStyle: {
        flex: 1,
        paddingTop: moderateScale(16),
    },
    sectionList: {
        paddingBottom: moderateScale(28)
    },
    historyItem: {
        paddingHorizontal: moderateScale(26),
    },
    historyItemText: {
        fontFamily: fonts.HelveticaNeue,
        fontSize: moderateScale(16),
        lineHeight: moderateScale(23),
        color: colors.contentText,
        paddingTop: moderateScale(9),
        paddingBottom: moderateScale(8)
    },
    actionButtons: {
        marginTop: moderateScale(10),
        marginBottom: Math.min(moderateScale(getBottomPadding(11.2)), moderateScale(86)),
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: moderateScale(20),
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
export default withTranslation('common')(History);

