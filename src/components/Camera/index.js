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
import { scale, moderateScale, verticalScale} from '../../utilits/scalable';
import getBottomNavigationHeight from '../../utilits/getBottomNavigationHeight';

class Camera extends React.Component {
    state = {
      autoFocus: 'on',
      autoFocusPoint: {
        normalized: { x: 0.5, y: 0.484 }, // normalized values required for autoFocusPointOfInterest
        drawRectPosition: {
          x: Dimensions.get('window').width * 0.5 - moderateScale(100),
          y: Dimensions.get('window').height * 0.484 - moderateScale(110),
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
      let y = 0.484;
  
      this.setState({
        autoFocusPoint: {
          normalized: { x, y },
          drawRectPosition: {  
            x: Dimensions.get('window').width * 0.5 - moderateScale(100),
            y: Dimensions.get('window').height * 0.484 - moderateScale(110),
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
            width: '100%',
            height: '100%',
            justifyContent: 'space-between',
          }}
          flashMode={this.props.lightActive ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}
          type={this.state.type}
          autoFocus={this.state.autoFocus}
          autoFocusPointOfInterest={this.state.autoFocusPoint.normalized}
          zoom={0}
          ratio={this.state.ratio}
          focusDepth={0}
          captureAudio={false}
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
                <View style={{position: 'absolute', top: 0, left: 0, right: 0, width: '100%', height: 42, borderLeftWidth: 4, borderColor: colors.white, borderRightWidth: 4}}></View>
                <View style={{position: 'absolute', bottom: 0, left: 0, right: 0, width: '100%', height: 42, borderLeftWidth: 4, borderColor: colors.white, borderRightWidth: 4}}></View>
                <View style={{position: 'absolute', top: 0, left: 0, bottom: 0, height: '100%', width: 42, borderTopWidth: 4, borderColor: colors.white, borderBottomWidth: 4}}></View>
                <View style={{position: 'absolute', top: 0, right: 0, bottom: 0, height: '100%', width: 42, borderTopWidth: 4, borderColor: colors.white, borderBottomWidth: 4}}></View>
              </View>
            </View>
            <TouchableWithoutFeedback onPress={this.touchToFocus.bind(this)}>
              <View style={{ flex: 1 }} />
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.actionContent}>
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
        fontSize: moderateScale(18),
        paddingVertical: moderateScale(100),
        paddingHorizontal: moderateScale(20),
        color: 'white'
    },
    actionContent: { 
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    actionBlock: {
        width: '58%',
        marginBottom: Math.min(Dimensions.get('screen').height*0.105, moderateScale(83))
    },
    actionText: {
        fontFamily: fonts.HelveticaNeue,
        fontSize: moderateScale(14),
        lineHeight: moderateScale(20),
        color: colors.white,
        textShadowColor: 'rgba(0, 0, 0, 0.45)',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 4,
        textAlign: 'center'
    },
    actionButtonHolder: {
        width: '100%',
        height: moderateScale(40),
        marginTop: moderateScale(9),
        backgroundColor: colors.mainContrast,
        justifyContent: 'center',
        alignItems: 'center'
    },
    actionButtonText: {
        fontFamily: fonts.HelveticaNeueMedium,
        fontSize: moderateScale(18),
        lineHeight: moderateScale(20),
        color: colors.white
    },
    autoFocusBox: {
      position: 'absolute',
      height: moderateScale(200),
      width: moderateScale(200),
    },
  });