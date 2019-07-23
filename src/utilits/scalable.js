import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

//size 360x768 dp
const guidelineBaseWidth = 360;
const guidelineBaseHeight = 768;

const scale = size => width / guidelineBaseWidth * size;
const verticalScale = size => height / guidelineBaseHeight * size;
const moderateScale = (size, factor = 0.5) => size + ( scale(size) - size ) * factor;

export {scale, verticalScale, moderateScale};