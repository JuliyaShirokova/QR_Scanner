import { Dimensions } from 'react-native';
export default getBottomNavigationHeight = () => {
    screenH = Dimensions.get('screen').height;
    windowH = Dimensions.get('window').height;
    return (screenH - windowH) || 0;
  }
  