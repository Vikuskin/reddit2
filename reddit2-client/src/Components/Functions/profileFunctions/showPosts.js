import axios from 'axios';

export const showPosts = async (user) => {
  try {
    const response = await axios.get('https://reddit2-server.herokuapp.com/profile', {
      params: {
        user: user
      }
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
}