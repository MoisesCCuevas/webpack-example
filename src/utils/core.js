const sum = (a, b) => {
  return a + b;
}

const API = 'https://randomuser.me/api/';

const getData = async (id) => {
  const apiURL = id ? `${API}${id}` : API;
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    return data.results[0];
  } catch (e) {
    console.error('Fetch Fail'. e)
  }
}

export {
  sum,
  getData
};
