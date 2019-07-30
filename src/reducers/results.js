import { ADD_RESULT, RESET_STORE } from "../constants/action-types";

const INITIAL_STATE = {
  results: []
};

function results(state = INITIAL_STATE, action) {
  switch (action.type){
    case ADD_RESULT:
      return {
        results: [action.payload, ...state.results]
      }
    case RESET_STORE: { return INITIAL_STATE }
    default : { return state }
  }
  
}
export default results;