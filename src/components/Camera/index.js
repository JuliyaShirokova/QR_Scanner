import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  Alert,
  Linking, 
  Clipboard,
  TextInput,
  Animated,
  Easing,
} from 'react-native';
import { withNavigationFocus } from "react-navigation";
import { RNCamera } from 'react-native-camera';
import Communications from 'react-native-communications';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
  
const iconSize = 25;
const iconColor='#000';
const iconContrastColor = 'white';
class Camera extends React.Component {
    constructor(props){
      super(props);
      this.positionY = new Animated.Value(0);      
    }

    state = {
      autoFocus: 'on',
      autoFocusPoint: {
        normalized: { x: 0.5, y: 0.5 }, // normalized values required for autoFocusPointOfInterest
        drawRectPosition: {
          x: Dimensions.get('window').width * 0.5 - 32,
          y: Dimensions.get('window').height * 0.5 - 32,
        },
      },
      type: 'back',
      ratio: '16:9',
      canDetectBarcode: true,
      textBlocks: [],
      barcodes: [],
      barcodeObj: null,
      showDetails: false,
      lightActive: false,
      focusedScreen: true,
    };

    componentDidMount() {
      const { navigation } = this.props;
      navigation.addListener('willFocus', () =>
        this.setState({ focusedScreen: true })
      );
      navigation.addListener('willBlur', () =>
        this.setState({ focusedScreen: false })
      );

      this.animatePositionY();
    }

    animatePositionY = () => {
      this.positionY.setValue(0);
      return  Animated.timing( 
                this.positionY,
                {
                  toValue: 1,
                  duration: 1000,
                 // useNativeDriver: true
                }).start(() => {
              this.animatePositionY()
            });
    }

    toggleFocus() {
      this.setState({
        autoFocus: this.state.autoFocus === 'on' ? 'off' : 'on',
      });
    }
  
    touchToFocus(event) {
      const { pageX, pageY } = event.nativeEvent;
      const screenWidth = Dimensions.get('window').width;
      const screenHeight = Dimensions.get('window').height;
      const isPortrait = screenHeight > screenWidth;
  
      let x = pageX / screenWidth;
      let y = pageY / screenHeight;
      // Coordinate transform for portrait. See autoFocusPointOfInterest in docs for more info
      if (isPortrait) {
        x = pageY / screenHeight;
        y = -(pageX / screenWidth) + 1;
      }
  
      this.setState({
        autoFocusPoint: {
          normalized: { x, y },
          drawRectPosition: { x: pageX, y: pageY },
        },
      });
    }
 
    takePicture = async function() {
      if (this.camera) {
        const data = await this.camera.takePictureAsync();
        Alert.alert('takePicture ', JSON.stringify(data));
      }
    };
  
    toggleValue = value => () => this.setState(prevState => ({ [value]: !prevState[value] }));

    barcodeRecognized = (ev) => {
      this.setState({barcodeObj: ev});
      return  this.setState({ barcodes: ev.data })
    };

    urlify = (text) => {
      var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
      return text.replace(urlRegex, function(url,b,c) {
          var urlTransform = (c == 'www.') ? 'http://' + url : url;
          return urlTransform;
      }); 
    }
    openInBrowser = () => {
      console.log('open in browser');
      const url = `${this.urlify(this.state.barcodes)}`;
      return Linking.canOpenURL(url)
          .then((supported) => {
              if (!supported) {
              console.log("Can't handle url: " + url);
              } else {
              return Linking.openURL(url);
              }
          })
          .catch((err) => console.error('An error occurred', err));
    }
    
    clearBarcode = () => {
      this.clearClipboard();
      return this.setState({ barcodes: []})
    }

    getFormatedDate = (d) => {
      const datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
    d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
      return datestring;
    }
    getBarcodeMessageBody = () => {
      const formatedDate = this.getFormatedDate(new Date());
      const massage = `You were scanning this barcode ${formatedDate}. Barcode content: ${this.state.barcodes}`
      return massage;
    }
    clearClipboard = async () => {
      await Clipboard.setString('');
    }
    copyToClipboard = async (body) => {
      await Clipboard.setString(body);
      Alert.alert('Copied to Clipboard!', body);
    };

    showDetails = () => {
      return this.setState({showDetails: !this.state.showDetails })
    }

    renderBarcodes = () => (
      <View style={styles.barcodeContainer}>
        <View
          style={styles.barcodeContent}
        >
          <View style={styles.barcodeContentTop}>
            <View style={styles.barcodeRow}>
              <Text style={styles.barcodeShortText}>{this.state.barcodes}</Text>
              <TouchableOpacity
                onPress={this.showDetails}
              >
                <View style={styles.holderIcon}>
                  <Icon name={this.getIconName(this.state.showDetails,'angle-down','angle-up')} size={iconSize} />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.barcodeContenDetail}>
                {this.state.showDetails
                 &&
                <TextInput
                  style={styles.barcodeTextArea}
                  underlineColorAndroid="transparent"
                  numberOfLines={5}
                  multiline={true}
                  scrollEnabled={true}
                  value={JSON.stringify(this.state.barcodeObj, null, ' ')}
                />}
            </View>
            
          </View>
          <View style={styles.barcodeTools}>
            <View style={styles.barcodeButton}>
              <TouchableOpacity
                style={styles.barcodeButtonTouch}
                onPress = { this.openInBrowser }
              >
                <MaterialIcons name='open-in-browser' size={iconSize} color={iconColor} />
              </TouchableOpacity>
            </View>
            <View style={styles.barcodeButton}>
              <TouchableOpacity
                style={styles.barcodeButtonTouch} 
                onPress={() => Communications.email(['email'],null,null,'Barcode',this.getBarcodeMessageBody())}>
                <MaterialIcons name='email' size={iconSize} color={iconColor} />
              </TouchableOpacity>
            </View>
            <View style={styles.barcodeButton}>
              <TouchableOpacity
                style={styles.barcodeButtonTouch} 
                onPress={() => this.copyToClipboard(this.state.barcodes)}>
                <MaterialIcons name='content-copy' size={iconSize} color={iconColor} />
              </TouchableOpacity>
            </View>
            <View style={styles.barcodeButton}>
              <TouchableOpacity
                style={styles.barcodeButtonTouch}
                onPress = { this.clearBarcode }
              >
                <MaterialIcons name='exit-to-app' size={iconSize} color={iconColor} />
              </TouchableOpacity>
            </View>
            
          </View>
        </View>
      </View>
    );

    getIconName = (val, name1, name2) => {
      return val ? name2 : name1;
    }

    getIconNameForFocus = (val, name1, name2) =>{
      return val === 'on' ? name1 : name2
    }

    toggleLight = () => {
      return this.setState({ 
        lightActive: !this.state.lightActive 
      });
    }

    renderCamera() { 
      const drawFocusRingPosition = {
        top: this.state.autoFocusPoint.drawRectPosition.y - 32,
        left: this.state.autoFocusPoint.drawRectPosition.x - 32,
      };

      const animateY = this.positionY.interpolate({
        inputRange: [0, .5, 1],
        outputRange: [0, 120, 0]
      });

      return (
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={{
            flex: 1,
            justifyContent: 'space-between',
          }}
          flashMode={this.state.lightActive ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}
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
          onBarCodeRead={this.barcodeRecognized.bind(this)}
        >
          <View style={StyleSheet.absoluteFill}>
            <View style={[styles.autoFocusBox, drawFocusRingPosition]}>
              <Animated.View style={{height: 2, width: '100%', backgroundColor: 'green', transform: [{translateY: animateY }]}} />
            </View>
             <TouchableWithoutFeedback
              style={styles.fillAll}
              onPress={this.touchToFocus.bind(this)}>
              <View style={styles.fillAll} />
            </TouchableWithoutFeedback>
          </View>
          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <View
              style={{
                height: 56,
                backgroundColor: 'transparent',
                flexDirection: 'row',
                alignSelf: 'center',
              }}
            >
              <TouchableOpacity
                style={[styles.flipButton, { flex: 0.3, alignSelf: 'flex-end' }]}
                onPress={this.toggleLight.bind(this)} 
              >
                <MaterialCommunityIcons name={this.getIconName(this.state.lightActive, 'flashlight', 'flashlight-off')} size={iconSize} color={iconContrastColor} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.flipButton, { flex: 0.3, alignSelf: 'flex-end' }]}
                onPress={this.toggleFocus.bind(this)}
              >
                <MaterialIcons name={this.getIconNameForFocus(this.state.autoFocus, 'center-focus-strong', 'center-focus-weak')} size={iconSize} color={iconContrastColor} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.flipButton, styles.picButton, { flex: 0.3, alignSelf: 'flex-end' }]}
                onPress={this.takePicture.bind(this)}
              >
                <MaterialIcons name='photo-camera' size={iconSize} color={iconContrastColor} />
              </TouchableOpacity>
            </View>
          </View>
          {!!this.state.barcodes.length && this.renderBarcodes()}
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
    //  return <View style={styles.container}>{this.renderCamera()}</View>;
    }
  }
  export default withNavigationFocus(Camera);

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      paddingTop: 10,
      backgroundColor: '#000',
    },
    errorText: {
      fontSize: 18,
      padding: 20,
      color: 'white'
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
      height: 120,
      width: 120,
      borderWidth: 2,
      borderColor: '#ccc',
      opacity: 0.4,
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
    holderIcon: {
      width: iconSize,
      height: iconSize,
      justifyContent: 'center',
      alignItems: 'flex-end'
    },
    barcodeContentDetail: {
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
    fillAll: {
      flex: 1.
    }
  });