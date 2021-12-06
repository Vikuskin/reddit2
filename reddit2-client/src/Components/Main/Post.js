import styled from 'styled-components';
import { Modal } from 'react-bootstrap';
import { useContext, useState, useEffect } from 'react';
import { Context } from '../Functions/Context';
import likeIcon from '../../image/like.svg';
import { Rating } from './Rating';
import { checkAuth } from '../Functions/secondaryFunctions';
import { postRating } from '../Functions/mainFunctions/postRating';
import { mainShowPostsLast } from '../Functions/mainFunctions/mainShowPostsLast';
import { Image } from 'cloudinary-react';
import ReactMarkdown from 'react-markdown';

const Overlay = styled.div`
  position: fixed;
  top:0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  z-index: 20;
`

export const Post = () => {
  const {
    openPost,
    setOpenPost,
    user
  } = useContext(Context);
  const [like, setLike] = useState(0);
  const [post, setPost] = useState([]);

  useEffect(() => {
    async function GetPost() {
      if (!openPost) {
        return
      }
      if (openPost.post_id) {
        let post = await mainShowPostsLast(openPost.post_id)
        .then((res) => {
          return res
        })
        setPost(post)
        setLike(post.likessum.likes)
      } else {
        let post = await mainShowPostsLast(openPost.id)
        .then((res) => {
          return res
        })
        setPost(post)
        setLike(post.likessum.likes)
      }
    }
    GetPost();
  }, [!openPost, like])

  if (!openPost) return null;
  const tag = openPost.tags.split(' ');
  const closeModal = (e) => {
    if (e.target.id === 'overlay' || e.target.className === 'btn-close') {
      setOpenPost(null);
      setPost([])
    }
  }

  const clickLike = async (e) => {
    if (checkAuth(user) === null) {
      return;
    }
    postRating(null, post.id, user.email, 1)
      .then(res => {
        setLike(res[0])})
  }

  let filesNumber = [];
  const renderImg = (file) => {
    if (!file) {
      return;  
    }
    for (let i = file[file.length - 1]; i > -1; i--) {
        filesNumber.push(i)
      }
  }

  return (
    <Overlay id='overlay' onClick={closeModal}>
    <Modal.Dialog className="mt-5" style={{ color: 'black' }} key={post.id}>
      <Modal.Header closeButton onClick={closeModal}>
        <Modal.Title className='mr-2'>
          {tag.map((tag, i) => (
          <span key={i}>#{tag}</span>
          ))}
        </Modal.Title>
        <Rating postId={post.id} edit={true} stars={openPost.ratingsum ? openPost.ratingsum.stars : post.ratingsum.stars}/>
      </Modal.Header>

      <Modal.Body>
        <p>{post.mark}/10</p>
        <p>Group: {post.groups}</p>

        <ReactMarkdown children={post.content} />

        {post.imagesFolder === 'no img'  ? 
          <></> :
          renderImg(post.imagesFolder)}

          {filesNumber !== [] ? 
          filesNumber.map((img, i) => (
            <Image
              key={i}
              publicId={post.imagesFolder.substring(0, post.imagesFolder.length - 1) + img}
              cloudName='vikuskin'
              height='150'
              width='33%'
            />
          )) : <></>}
        <div className='d-block mt-3'>
        <img className='mr-2' src={likeIcon} alt="Like" style={{ cursor: 'pointer' }} 
        onClick={(e) => {
          clickLike(e);
        }}/>
        {like}
        </div>
      </Modal.Body>

      <Modal.Footer>
        Comments
      </Modal.Footer>
    </Modal.Dialog>
    </Overlay>
  )
}