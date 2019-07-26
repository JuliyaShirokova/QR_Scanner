import { ADD_RESULT } from "../constants/action-types";
import {Alert} from 'react-native';
const initialState = {
  results: ["Donec facilisis tortor ut augue lacinia, at viverra est semper.",
  "Sed sapien metus, scelerisque nec pharetra id, tempor a tortor.",
  "Pellentesque non dignissim neque. Ut porta viverra est, ut dignissim elit elementum ut.",
  "Nunc vel rhoncus nibh, ut tincidunt turpis.",
  "Sed sapien metus, scelerisque nec pharetra id, tempor a tortor.",
  "Pellentesque non dignissim neque. Ut porta viverra est, ut dignissim elit elementum ut.",
  "Nunc vel rhoncus nibh, ut tincidunt turpis.",
  "Sed sapien metus, scelerisque nec pharetra id, tempor a tortor.",
  "Pellentesque non dignissim neque. Ut porta viverra est, ut dignissim elit elementum ut.",
  "Nunc vel rhoncus nibh, ut tincidunt turpis."]
};

function results(state = initialState, action) {
  if (action.type === ADD_RESULT) {
    return {
      results: [action.payload, ...state.results]
    }
  }
  return state;
}
export default results;