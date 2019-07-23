import React, { Component } from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert, Linking, Clipboard, Dimensions} from 'react-native';
import * as colors from '../../constants/colors';
import * as fonts from '../../constants/fonts';


class Result extends Component{
    constructor(props){
        super(props);

        this.state={
            result: '', 
            disableMove: true,
            disableCopy: false,
        }
    }
    componentDidMount(){

        this.setResult();
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

    setResult = async () => {
        const { results } = this.props;
        const last = results.length-1;
        const res = results[last] || 'No results';

        const isURL = await this.canOpen(res);      
       
        return this.setState({
            disableMove: !isURL,
            result: res
        });
    }

    getResult = () => this.state.result;

    
    urlify = (text) => {
        var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
        return text.replace(urlRegex, function(url,b,c) {
            var urlTransform = (c == 'www.') ? 'http://' + url : url;
            return urlTransform;
        }); 
    }

    onMove = () => {
        const curr = this.state.result;
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
        marginBottom: Math.min((Dimensions.get('window').height*0.11), 86),
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
export default Result;

