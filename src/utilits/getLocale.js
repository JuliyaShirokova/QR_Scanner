import React from 'react';
import { Platform } from 'react-native';
import { NativeModules } from 'react-native';

export default getLocale = () => {
    if (Platform.OS === 'android') {
      return NativeModules.I18nManager.localeIdentifier.slice(0,1);
    } else {
      return NativeModules.SettingsManager.settings.AppleLocale.slice(0,1);
    }
  }