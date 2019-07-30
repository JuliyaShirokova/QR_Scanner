import { Alert } from 'react-native';
import { ADD_RESULT, RESET_STORE } from "../constants/action-types";

export function addResult( payload ) {
    return { type: ADD_RESULT, payload }
  };
export function resetStore(payload){
  return { type: RESET_STORE, payload }
}