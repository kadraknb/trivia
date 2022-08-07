export const playerLogin = (loginData) => ({ type: 'USER_PLAY', loginData });

export const playerPerformance = (performanceData) => ({
  type: 'USER_PERFORMANCE', performanceData });

export const GET_TRIVIA = 'GET_TRIVIA';
export const getTriviaAction = (payload) => ({ type: GET_TRIVIA, payload });

//  default userLogin;
