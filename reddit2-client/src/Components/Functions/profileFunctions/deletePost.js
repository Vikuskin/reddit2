import axios from 'axios';

export const deletePost = async (postId) => {
  try {
    const response = await axios.delete('https://reddit2-server.herokuapp.com/profile', {
      params: {
        id: postId
      }
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
}