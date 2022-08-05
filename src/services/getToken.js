const TOKEN_API = 'https://opentdb.com/api_token.php?command=request';

const getToken = async () => {
  const getApiData = await fetch(TOKEN_API);
  const token = await getApiData.json();
  return token.token;
};

export default getToken;
