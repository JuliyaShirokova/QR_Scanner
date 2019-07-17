import { ADD_RESULT } from "../constants/action-types";
import {Alert} from 'react-native';
const initialState = {
  results: []
};

function results(state = initialState, action) {
  if (action.type === ADD_RESULT) {
    return {
      results: [...state.results, action.payload]
    }
  }
  return state;
}
export default results;