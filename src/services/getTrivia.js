const getTrivia = async (token) => {
  const TRIVIA_API = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const getApiData = await fetch(TRIVIA_API);
  const trivia = await getApiData.json();
  return trivia;
};

export default getTrivia;
