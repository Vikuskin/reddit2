import { Row, Card, Button } from "react-bootstrap";
import { useContext } from 'react';
import { Context } from "../Functions/Context";
import { Rating } from "./Rating";
import likeIcon from '../../image/like.svg';
import { Image } from 'cloudinary-react';
import ReactMarkdown from 'react-markdown';

export const PostsCards = ({ post }) => {
  const {
    setOpenPost
  } = useContext(Context);

  return (
      <Row className='d-flex justify-content-center align-items-center'>
        {post.map((post) => (
          
          <Card style={{ width: '18rem', margin: '5px' }} key={post.id}>
            <div style={{ margin: 'auto' }}>
            {post.imagesFolder === 'no img'  ? 
              <></> :
              <Image
              publicId={post.imagesFolder.substring(0, post.imagesFolder.length - 1) + '0'}
              cloudName='vikuskin'
              height='150'
              width='100%'
              />}
            </div>
            <Card.Body>
              <div className='d-flex align-items-start justify-content-between'>
                <Card.Title>{post.tags}</Card.Title>
                <Rating edit={false} stars={post.ratingsum.stars}/>
              </div>

              <ReactMarkdown children={post.content.slice(0,100)}/>
              
              <div className='d-flex justify-content-between'>
              <Button variant="light" 
              onClick={() => {
                setOpenPost(post);
              }}>Read</Button>
              <div className='d-flex align-items-center'>
                <img className='mr-2' src={likeIcon} alt='Likes'/>
                  {post.likessum.likes}
                </div>
              </div>
            </Card.Body>
          </Card>
        ))}
      </Row>
  )
}