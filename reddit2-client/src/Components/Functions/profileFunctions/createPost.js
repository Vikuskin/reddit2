import axios from 'axios';

export const createPost = async (group, tags, text, mark, user, files) => {
  try {
    const response = await axios.post('https://reddit2-server.herokuapp.com/profile/new_review', {
      group,
      tags,
      text,
      mark,
      user,
      images: files
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
}