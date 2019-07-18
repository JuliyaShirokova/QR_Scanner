import React, { Component } from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert, Linking, Clipboard} from 'react-native';
import * as colors from '../../constants/colors';
import * as fonts from '../../constants/fonts';


class History extends Component{
    
    getResult = () => {
        const { results } = this.props;
        const last = results.length-1;
        return results[last] || 'No results';
    }
    urlify = (text) => {
        var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
        return text.replace(urlRegex, function(url,b,c) {
            var urlTransform = (c == 'www.') ? 'http://' + url : url;
            return urlTransform;
        }); 
    }

    onMove = () => {
        const { results } = this.props;
        const last = results.length-1;
        const curr = results[last] || null;
        
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

    copyToClipboard = async (text) => {
        await Clipboard.setString(text);
        Alert.alert('Copied to Clipboard!', text);
    };
  

    render(){
        const { results } = this.props;
        const last = results.length-1;
        const curr = results[last] || null;
    
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
                            onPress={() => this.copyToClipboard(curr)}
                            style={styles.actionButton}
                        >
                            <Text style={styles.actionButtonText}>COPY</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={style=styles.actionButtonHolder}>
                        <TouchableOpacity
                            onPress={() => this.onMove()}
                            style={styles.actionButton}
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
    resultContent: {
        marginTop: 35,
    },
    resultText: {
        fontFamily: fonts.HelveticaNeue,
        fontSize: 20,
        color: colors.contentText,
    },
    actionButtons: {
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

