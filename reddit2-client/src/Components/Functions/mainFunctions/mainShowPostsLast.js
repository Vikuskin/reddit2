import axios from 'axios';

export const mainShowPostsLast = async (postId) => {
  try {
    const response = await axios.get('https://reddit2-server.herokuapp.com/', {
      params: {
        postId
      }
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
}
