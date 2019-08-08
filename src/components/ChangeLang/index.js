import React, { Component } from 'react';
import {View, Text, TouchableOpacity, StyleSheet, ScrollView, SectionList} from 'react-native';
import * as colors from '../../constants/colors';
import * as fonts from '../../constants/fonts';
import { scale, moderateScale, verticalScale} from '../../utilits/scalable';
import { withTranslation } from 'react-i18next';
import languages from '../../constants/languages';

class ChangeLang extends Component{

    constructor(props){
        super(props);

        this.state={
            selectedKey: props.i18n.language,
        }
    }

    onItemPress = ( elKey, elData ) => {
        const { i18n } = this.props;

        this.setState({
            selectedKey: elKey
        })

        return i18n.changeLanguage(elKey);

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

    renderLangItem = (item, index) => {
        const { t } = this.props;
        const elKey = item.toString();
        return (
            <View
                key={index}
            >
                <TouchableOpacity
                    style={[styles.langItem, this.getItemStyle( elKey )]}
                    onPress={() => this.onItemPress( elKey, item ) }
                >
                    <Text style={[styles.langItemText, this.getItemTextStyle( elKey )]}>{ t(item) }</Text>
                </TouchableOpacity>
            </View>
        )
    }
    prepareData = ( arrData ) => {
        const preparedData = arrData.map( (val, ind, arr) => (arr[ind]));
        return [{ data: preparedData}] || [];
    }

    getList = () => {
        const list = (<SectionList
                        style={styles.sectionList}
                        renderItem={({item, index, section}) => this.renderLangItem(item, index)}
                        sections={this.prepareData( languages )}
                        keyExtractor={(item, index) => item + index}
                    />
                )
        return list;
    }

    render(){
        return (
            <View style={styles.container}>
                <View
                    style={styles.langContent}
                >
                    <ScrollView style={style=styles.scrollStyle}>
                        {this.getList()}
                    </ScrollView>
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
    langContent: {
        flex: 1,
    },
    scrollStyle: {
        flex: 1,
        paddingTop: moderateScale(16),
    },
    langItem: {
        paddingHorizontal: moderateScale(26),
    },
    langItemText: {
        fontFamily: fonts.HelveticaNeue,
        fontSize: moderateScale(16),
        lineHeight: moderateScale(23),
        color: colors.contentText,
        paddingTop: moderateScale(9),
        paddingBottom: moderateScale(8)
    },
})
export default withTranslation('changeLang')(ChangeLang)