
import React from 'react';
import {
  Svg,
  Circle,
  Ellipse,
  G,
  LinearGradient,
  RadialGradient,
  Line,
  Path,
  Polygon,
  Polyline,
  Rect,
  Symbol,
  Text,
  Use,
  Defs,
  Stop
} from 'react-native-svg';
import { StyleSheet } from 'react-native';
export default function HighlightOn(props) {
  return (
    <Svg 
      height="240" 
      width="240" 
      viewBox="0 0 24 24"
      style={styles.svg}
      >
    	<Defs>
    		<Path id="ic_highlight_on-a" d="M6,14 L9,17 L9,22 L15,22 L15,17 L18,14 L18,9 L6,9 L6,14 Z M11,2 L13,2 L13,6 L11,6 L11,2 Z M3.5,5.875 L4.914,4.46 L7.034,6.582 L5.62,7.997 L3.5,5.875 Z M16.96,6.585 L19.083,4.465 L20.497,5.879 L18.375,8 L16.96,6.585 Z"/>
    	</Defs>
    	<G fill="none" fillRule="evenodd">
    		<Rect height="24" width="24" fill="#FFF" fillOpacity=".01"/>
    		<Path d="M6,14 L9,17 L9,22 L15,22 L15,17 L18,14 L18,9 L6,9 L6,14 Z M11,2 L13,2 L13,6 L11,6 L11,2 Z M3.5,5.875 L4.914,4.46 L7.034,6.582 L5.62,7.997 L3.5,5.875 Z M16.96,6.585 L19.083,4.465 L20.497,5.879 L18.375,8 L16.96,6.585 Z" fill="#fff" fillRule="nonzero"/>
    	</G>
    </Svg>
  );
}
const styles=StyleSheet.create({
  svg: {
    maxWidth: '100%',
    maxHeight: '100%'
  }
})