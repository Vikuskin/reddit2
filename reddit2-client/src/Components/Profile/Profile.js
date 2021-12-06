import Button from "@restart/ui/esm/Button"
import { Container, Col } from "react-bootstrap"
import { FormattedMessage } from "react-intl"
import { Link } from "react-router-dom";
import deleteReview from '../../image/deleteReview.svg';
import editReview from '../../image/editReview.svg';
import newReview from '../../image/newReview.svg';
import readReview from '../../image/readReview.svg';
import { useContext, useState, useEffect } from "react";
import { Context } from '../Functions/Context';
import { showPosts } from '../Functions/profileFunctions/showPosts';
import { Post } from "../Main/Post";
import { deletePost } from '../Functions/profileFunctions/deletePost';
import { Rating } from '../Main/Rating';

export const Profile = () => {
  const {
    user, 
    setOpenPost,
    setEditPost,
    editPost
  } = useContext(Context);

  const [post, setPosts] = useState([]);
  const [update, setUpdate] = useState([]);
  useEffect(() => {
    async function GetPost() {
      let posts = await showPosts(user.email)
      setPosts(posts);
    }
    GetPost();
  }, [update, user.email, !editPost])


  return (
    <Container className='pt-5 mt-5'>
      <FormattedMessage id='review' className=''/>

      <div className='d-flex justify-content-center'>
      <Col className='col-9 m-0 p-0' >
      {post[0] ? 
      post.map(post => (
        <div className='d-flex justify-content-between p-2 mb-1' style={{ border: '1px solid grey', borderRadius: '8px' }} key={post.id}>
          <div>
            <p className='m-0'>{post.mark}/10</p>
            <span>
              <Rating edit={false} stars={post.ratingsum.stars} color='#ffffff'/>
            </span>
            <p className='m-0'>Tags: {post.tags}</p>
            <p className='m-0'>Group: {post.groups}</p>
            <p className='m-0'>{post.content.slice(0,20)}</p>
          </div>
          <div className='d-flex flex-column justify-content-right'>

            {/* EDIT */}

              <Button className='d-flex align-items-center p-1 justify-content-end' style={{ borderRadius: '8px', fontSize: '12px' }}
              onClick={() => {
                setEditPost(post);
              }}>
                <span className='m-auto'><FormattedMessage id='edit_review'/></span>
                <img style={{ width: '20px' }} src={editReview} alt="Edit review" className='pl-1'/>
              </Button>

            {/* DELETE */}

            <Button className='d-flex align-items-center p-1 justify-content-end' style={{ borderRadius: '8px', fontSize: '12px' }}
            onClick={async () => {
              await deletePost(post.id);
              setUpdate(update => update + 1);
            }}>
              <span className='m-auto'><FormattedMessage id='delete_review'/></span>
              <img style={{ width: '20px' }} src={deleteReview} alt="Delete review" className='pl-1'/>
            </Button>

            {/* READ */}

            <Button className='d-flex align-items-center p-1 justify-content-end' style={{ borderRadius: '8px', fontSize: '12px' }}
            onClick={() => setOpenPost(post)}>
              <span className='m-auto'><FormattedMessage id='read_review'/></span>
              <img style={{ width: '20px' }} src={readReview} alt="Read review" className='pl-1'/>
            </Button>
          </div>
        </div>
      ))
       : <div>Нет обзоров</div>   }
      </Col>
      <Post/>
      
      <Col className='col-3'>
        <Link to='/profile/new_review'>
          <Button variant="light" className="p-1 d-flex align-items-center justify-content-between" style={{ borderRadius: '8px', fontSize: '12px' }}>
            <FormattedMessage id="new_review"/>
            <img src={newReview} alt="New review" className="pl-1" style={{ width: '20px' }}/> 
          </Button>
        </Link>
      </Col>
      </div>
    </Container>
  )
}