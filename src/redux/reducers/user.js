const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: '',
  gravatarEmail: '',
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'USER_PLAY':
    return action.loginData;
  default:
    return state;
  }
}

export default userReducer;
