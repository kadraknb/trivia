const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

function playerReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'USER_PLAY':
    return action.loginData;
  case 'USER_PERFORMANCE':
    return {
      ...state,
      assertions: action.performanceData.assertions,
      score: action.performanceData.score,
    };
  default:
    return state;
  }
}

export default playerReducer;
