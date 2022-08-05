const INITIAL_STATE = {
  pontos: '',
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'GAME_PLAY':
    return action.GameData;
  default:
    return state;
  }
}

export default userReducer;
