import axios from 'axios';

export const putEditPost = async (group, tags, text, mark, postId) => {
  try {
    const response = await axios.put('https://reddit2-server.herokuapp.com/profile', {
      group,
      tags,
      text,
      mark, 
      postId
    });
    return response.data
  } catch (e) {
    console.log(e);
  }
}