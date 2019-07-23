
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
import {StyleSheet} from 'react-native';
export default function HighlightOff(props) {
  return (
    <Svg height="240" width="240" viewBox="0 0 24 24" style={styles.svg}>
    	<G fill="none" fillRule="evenodd">
    		<Rect height="24" width="24" fill="#D8D8D8" fillOpacity=".01"/>
    		<Polygon fill="#fff" fillRule="nonzero" points="6 14 9 17 9 22 15 22 15 17 18 14 18 9 6 9"/>
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