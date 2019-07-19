import React, { Component } from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import HeaderTitle from '../../Common/HeaderTitle';
import HistoryContainer from '../../HistoryContainer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as colors from '../../../constants/colors';
import * as fonts from '../../../constants/fonts';

class HistoryScreen extends Component{
    static navigationOptions = ({ navigation }) => ({
        headerRight: (<View style={styles.menuContainer}>
            <TouchableOpacity style={styles.manuIconHolder} onPress = {() => navigation.openDrawer()}>
                <Ionicons name="md-more" color={colors.white} size={24} />
            </TouchableOpacity>
        </View>),
        headerLeft: null,
        headerTitle: (<HeaderTitle text={'QR Scanner - History'} textColor={colors.titleText} />),
        headerStyle: { 
            height: 80,
            paddingTop: 26,
            backgroundColor: colors.mainContrast,
        }
    });

    render(){
        return (
            <View
                style={styles.container}
            >
                <HistoryContainer />
            </View>
        )
    }
}
const styles=StyleSheet.create({
    container: {
        flex: 1,
    },
    menuContainer: {
        width: 30,
        height: 30,
        marginRight: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    manuIconHolder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
export default HistoryScreen;


const MyNavScreen = ({
    navigation,
    banner,
  }: {
    navigation: NavigationScreenProp<NavigationState>;
    banner: string;
  }) => (
    <ScrollView>
      <SafeAreaView forceInset={{ top: 'always' }}>
        <SampleText>{banner}</SampleText>
        <Button onPress={() => navigation.openDrawer()} title="Open drawer" />
        <Button
          onPress={() => navigation.navigate('Email')}
          title="Open other screen"
        />
        <Button onPress={() => navigation.navigate('Index')} title="Go back" />
      </SafeAreaView>
      <StatusBar barStyle="default" />
    </ScrollView>
  );
  

const DraftsScreen = ({
    navigation,
  }: {
    navigation: NavigationScreenProp<NavigationState>;
  }) => <MyNavScreen banner={'Drafts Screen'} navigation={navigation} />;
  DraftsScreen.navigationOptions = {
    headerTitle: 'Drafts',
  };