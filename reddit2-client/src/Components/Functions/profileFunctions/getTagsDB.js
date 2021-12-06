import axios from 'axios';

export const getTagsDB = async () => {
  try {
    const response = await axios.get('https://reddit2-server.herokuapp.com/profile/new_review');
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}
