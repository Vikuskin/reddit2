import axios from 'axios';

export const searchPost = async (searchValue) => {
  try {
    const response = await axios.get('https://reddit2-server.herokuapp.com/search', {
      params: {
        search: searchValue
      }
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
}