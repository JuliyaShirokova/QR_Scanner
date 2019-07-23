import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  Alert,
} from 'react-native';
import { withNavigationFocus } from "react-navigation";
import { RNCamera } from 'react-native-camera';
import * as fonts from '../../constants/fonts';
import * as colors from '../../constants/colors';
  

const iconSize = 25;
const iconColor='#000';
const iconContrastColor = 'white';
class Camera extends React.Component {
    state = {
      autoFocus: 'on',
      autoFocusPoint: {
        normalized: { x: 0.5, y: 0.5 }, // normalized values required for autoFocusPointOfInterest
        drawRectPosition: {
          x: Dimensions.get('window').width * 0.5 - 90,
          y: Dimensions.get('window').height * 0.5 - 180,
        },
      },
      type: 'back',
      ratio: '16:9',
      canDetectBarcode: false,
      barcodes: null,
      barcodeObj: null,
      showDetails: false,
    };

    componentDidMount() {
      const { navigation } = this.props;
      navigation.addListener('willFocus', () =>
        this.setState({ focusedScreen: true })
      );
      navigation.addListener('willBlur', () =>
        this.setState({ focusedScreen: false })
      );
    }

    touchToFocus(event) {
      let x = 0.5;
      let y = 0.5;
  
      this.setState({
        autoFocusPoint: {
          normalized: { x, y },
          drawRectPosition: {  
            x: Dimensions.get('window').width * 0.5 - 90,
            y: Dimensions.get('window').height * 0.5 - 180,
          },
        },
      });
    }
 
   
    toggleValue = value => () => this.setState(prevState => ({ [value]: !prevState[value] }));
    
    pushResult = () => {
        const { onAddResult } = this.props;
        onAddResult( this.state.barcodes );
        return this.props.navigation.push('Results');
    }

    barcodeRecognized = (ev) => {
      this.setState(
            {
                barcodes: ev.data,
                barcodeObj: ev
            },
            this.pushResult
            );
    };

   
    onCameraReadyHandle = () => {

    }

    renderCamera() {
      const { canDetectBarcode } = this.state;
      
      const drawFocusRingPosition = {
        top: this.state.autoFocusPoint.drawRectPosition.y,
        left: this.state.autoFocusPoint.drawRectPosition.x,
      };
      return (
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={{
            flex: 1,
            justifyContent: 'space-between',
          }}
          flashMode={this.props.lightActive ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}
          type={this.state.type}
          autoFocus={this.state.autoFocus}
          autoFocusPointOfInterest={this.state.autoFocusPoint.normalized}
          zoom={0}
          ratio={this.state.ratio}
          focusDepth={0}
          androidCameraPermissionOptions={
              {title: 'Permission to use camera',
               message: 'We need your permission to use your camera phone'}
            }
          onBarCodeRead={canDetectBarcode ? this.barcodeRecognized : null}
          onCameraReady={this.onCameraReadyHandle}
        >
          <View style={StyleSheet.absoluteFill}>
            <View style={[styles.autoFocusBox, drawFocusRingPosition]}>
            <View style={{flex: 1, position: 'relative'}}>
                <View style={{position: 'absolute', top: 0, left: 0, right: 0, width: '100%', height: 42, borderLeftWidth: 4, borderColor: '#000', borderRightWidth: 4}}></View>
                <View style={{position: 'absolute', bottom: 0, left: 0, right: 0, width: '100%', height: 42, borderLeftWidth: 4, borderColor: '#000', borderRightWidth: 4}}></View>
                <View style={{position: 'absolute', top: 0, left: 0, bottom: 0, height: '100%', width: 42, borderTopWidth: 4, borderColor: '#000', borderBottomWidth: 4}}></View>
                <View style={{position: 'absolute', top: 0, right: 0, bottom: 0, height: '100%', width: 42, borderTopWidth: 4, borderColor: '#000', borderBottomWidth: 4}}></View>
              </View>
            </View>
            <TouchableWithoutFeedback onPress={this.touchToFocus.bind(this)}>
              <View style={{ flex: 1 }} />
            </TouchableWithoutFeedback>
          </View>
          <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
            <View style={styles.actionBlock}>
              <Text style={styles.actionText}>Point the camera at the QR code and press</Text>
              <TouchableOpacity 
                style={styles.actionButtonHolder}
                onPress={ this.toggleValue('canDetectBarcode') } >
                <Text style={styles.actionButtonText}>
                  {!canDetectBarcode ? 'SCAN' : 'SCANNING'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </RNCamera>
      );
    }
  
    render() {
        const { hasCameraPermission, focusedScreen } = this.state;
        if (hasCameraPermission === null) {
          return <View style={styles.container}><Text style={styles.errorText}>Has no camera permission</Text></View>;
        } else if (hasCameraPermission === false) {
          return <View style={styles.container}><Text style={styles.errorText}>No access to camera</Text></View>;
        } else if (focusedScreen){
          return <View style={styles.container}>{this.renderCamera()}</View>
        } else {
          return <View />;
        }
    }
  }
  export default withNavigationFocus(Camera);

  const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#000',
    },
    errorText: {
        fontSize: 18,
        padding: 20,
        color: 'white'
    },
    actionBlock: {
        width: '60%',
        marginBottom: Math.min(Dimensions.get('window').height*0.11, 83)
    },
    actionText: {
        fontFamily: fonts.HelveticaNeue,
        fontSize: 14,
        lineHeight: 20,
        textAlign: 'center'
    },
    actionButtonHolder: {
        width: '100%',
        paddingVertical: 8,
        marginTop: 9,
        backgroundColor: colors.mainContrast,
        justifyContent: 'center',
        alignItems: 'center'
    },
    actionButtonText: {
        fontFamily: fonts.HelveticaNeueMedium,
        fontSize: 18,
        color: colors.white
    },
    flipButton: {
      width: 150,
      height: 40,
      marginHorizontal: 2,
      marginBottom: 10,
      marginTop: 10,
      borderRadius: 8,
      borderColor: 'white',
      borderWidth: 1,
      padding: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    autoFocusBox: {
      position: 'absolute',
      height: 180,
      width: 180,
    },
    flipText: {
      flex: 1,
      color: 'white',
      fontSize: 15,
    },
    picButton: {
      backgroundColor: 'darkseagreen',
    },
    barcodeContainer: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: 0,
      top: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    barcodeContent: {
      width: '80%',
      paddingTop: 20,
      backgroundColor: 'white'
    },
    barcodeContentTop: {
      paddingHorizontal: 15,
      paddingBottom: 15,
    },
    barcodeRow: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    barcodeShortText: {
      fontSize: 18,
      color: '#000'
    },
    barcodeTextArea: {
      fontSize: 14,
      maxHeight: 100,
    },
    barcodeTools: {
      width: '100%',
      flexDirection: 'row',
      borderColor: '#ccc',
      borderTopWidth: 1,
    },
    barcodeButton: {
      flex: 1,
      height: 56,
    },
    barcodeButtonTouch: {
      width: '100%',
      height: '100%',
      padding: 20,
    },
    deleteText: {
      color: 'red'
    },
    text: {
      padding: 10,
      borderWidth: 2,
      borderRadius: 2,
      position: 'absolute',
      borderColor: '#F00',
      justifyContent: 'center',
    },
    textContainer: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: 0,
      top: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    textBlock: {
      color: 'white',
      position: 'absolute',
      textAlign: 'center',
      backgroundColor: 'transparent',
    },
  });