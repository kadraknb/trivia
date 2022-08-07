const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: '',
  gravatarEmail: '',
};

function playerReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'USER_PLAY':
    return action.loginData;
  case 'USER_PERFORMANCE':
    return {
      ...state,
      assertions: action.performanceData[0],
      score: action.performanceData[1],
    };
  default:
    return state;
  }
}

export default playerReducer;
