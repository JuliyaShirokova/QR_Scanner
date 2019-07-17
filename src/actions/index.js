import { Alert } from 'react-native';
import { ADD_RESULT } from "../constants/action-types";

export function addResult( payload ) {
    return { type: ADD_RESULT, payload }
  };