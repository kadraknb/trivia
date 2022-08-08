const INITIAL_STATE = {
  name: '',
  img: '',
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
      assertions: Number(action.performanceData.assertions),
      score: Number(action.performanceData.score),
    };
  case 'GET_IMG':
    return {
      ...state,
      img: action.payload,
    };
  default:
    return state;
  }
}

export default playerReducer;
