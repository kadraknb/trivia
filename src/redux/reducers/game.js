import { GET_TRIVIA } from '../actions';

const INITIAL_STATE = {
  game: [],
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_TRIVIA:
    return action.payload.results;
  default:
    return state;
  }
}

export default userReducer;
