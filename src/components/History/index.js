import React, { Component } from 'react';
import {View, Text, TouchableOpacity, SectionList, StyleSheet, Alert, Linking, Clipboard} from 'react-native';
import * as colors from '../../constants/colors';
import * as fonts from '../../constants/fonts';
import { ScrollView } from 'react-native-gesture-handler';
import { tsImportEqualsDeclaration } from '@babel/types';


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
        
        const url = `${this.urlify(valData)}`;
        //Alert.alert('val data', valData.toString())
        if ( url != ''){
            isURL = await this.canOpen(url);      
        }else{
            isURL=false;
        }
        
       // Alert.alert("onItem", isURL.toString());
        this.setState({
            disableMove: !isURL,
            disableCopy: isEmpty,
            selectedKey: valKey,
            selectedData: valData
        })
    }

    getItemStyle = ( elKey ) => {
    
        const bColor = (elKey == this.state.selectedKey) ? '#919191' : 'transparent'; 
        return {
            backgroundColor: bColor
        }
    }

    renderHistoryItem = (item, index) => {
        const elKey = item.toString()+index;
        return (
            <View
                key={index}
                style={styles.historyItemHolder}
            >
                <TouchableOpacity
                    style={[styles.historyItem, this.getItemStyle( elKey )]}
                    onPress={() => this.onItemPress( elKey, item ) }
                >
                    <Text style={styles.historyItemText}>{ item }</Text>
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
                        renderItem={({item, index, section}) => this.renderHistoryItem(item, index)}
                        sections={this.prepareData( results )}
                        keyExtractor={(item, index) => item + index}
                    />
                )
        return list || 'No results';
    }
    urlify = (text) => {
        var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
        return text.replace(urlRegex, function(url,b,c) {
            var urlTransform = (c == 'www.') ? 'http://' + url : url;
            return urlTransform;
        }); 
    }

    onMove = () => {
        const curr = this.state.selectedData;    
        const url = `${this.urlify(curr)}`;
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

    copyToClipboard = async () => {
        const curr = this.state.selectedData;
        await Clipboard.setString(curr);
        Alert.alert('Copied to Clipboard!', curr);
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
                    style={styles.historyContent}
                >
                    <ScrollView style={{flex: 1}}>
                        {this.getList()}
                    </ScrollView>
                </View>
                <View style={styles.actionButtons}>
                    <View style={style=styles.actionButtonHolder}>
                    
                        <TouchableOpacity
                            onPress={() => this.copyToClipboard('text')}
                            style={[styles.actionButton, {opacity: this.getOpacity(this.state.disableCopy)}]}
                            disabled={ this.state.disableCopy }
                            activeOpacity={ () => this.getOpacity(this.state.disableCopy) }
                        >
                            <Text style={styles.actionButtonText}>COPY</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={style=styles.actionButtonHolder}>
                        <TouchableOpacity
                            onPress={() => this.onMove()}
                            style={[styles.actionButton, {opacity: this.getOpacity(this.state.disableMove)}]}
                            disabled={ this.state.disableMove }
                            activeOpacity={ ()=> this.getOpacity(this.state.disableMove) }
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
        flex: 1,
        justifyContent: 'space-between',
    },
    historyContent: {
        flex: 1,
        marginTop: 24,
    },
    historyItem: {
        paddingHorizontal: 26,
    },
    historyItemText: {
        fontFamily: fonts.HelveticaNeue,
        fontSize: 16,
        lineHeight: 23,
        color: colors.contentText,
        paddingVertical: 8,
    },
    actionButtons: {
        paddingHorizontal: 16,
        marginTop: 10,
        marginBottom: '10%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    actionButtonHolder: {
        width: '44%',
    },
    actionButton: {
        width: '100%',
        paddingVertical: 10,
        backgroundColor: colors.mainContrast,
        justifyContent: 'center',
        alignItems: 'center'
    },
    actionButtonText: {
        fontFamily: fonts.HelveticaNeueMedium, 
        fontSize: 18,
        lineHeight: 20,
        color: colors.white,
    
    }

})
export default History;

