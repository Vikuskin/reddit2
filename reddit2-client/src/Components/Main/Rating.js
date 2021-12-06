import StarsRating from 'stars-rating';
import { useContext } from 'react';
import { Context } from '../Functions/Context';
import { checkAuth } from '../Functions/secondaryFunctions';
import { postRating } from '../Functions/mainFunctions/postRating';

export const Rating = ({ postId, edit, stars, color }) => {
  const {
    user
  } = useContext(Context);

  const ratingChanged = (newRating) => {
    if (checkAuth(user) === null) {
      return;
    }
    postRating(Math.floor(newRating), postId, user.email);
  }
  return (
    <StarsRating
      count={5}
      value={+stars}
      onChange={ratingChanged}
      color1={color ? color : '#363537'}
      edit={edit === false ? false : true} />
  )
}