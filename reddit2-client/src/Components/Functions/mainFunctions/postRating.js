import axios from 'axios';

export const postRating = async (newRating, postId, userEmail, like) => {
  try {
    const response = await axios.put('https://reddit2-server.herokuapp.com/', {
      rating: newRating,
      postId: postId,
      userEmail: userEmail,
      likes: like
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
}