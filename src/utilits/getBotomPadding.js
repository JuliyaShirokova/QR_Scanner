import {Dimensions} from 'react-native';
import getBottomNavigationHeight from './getBottomNavigationHeight';
export default getBottomPadding = (percent) => {
    return (Dimensions.get('screen').height*(percent/100)-getBottomNavigationHeight()) || 0;
}