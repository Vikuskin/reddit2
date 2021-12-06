import { Container, Row } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import { PostsCards } from "./PostsCards";
import { useState, useEffect, useContext } from "react";
import { mainShowPostsLast } from "../Functions/mainFunctions/mainShowPostsLast";
import { Context } from "../Functions/Context";
import ReactWordcloud from 'react-wordcloud';

export const Main = () => {
  const {
    openPost
  } = useContext(Context);

  const [post, setPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const [popularPosts, setPopularPosts] = useState([]);

  useEffect(() => {
    async function GetPost() {
      let posts = await mainShowPostsLast()
      .then((res) => {
        return res
      })
      if (posts) {
        let tags = posts[posts.length - 1];
        setTags(tags);
        posts.pop();
        let popularPosts = posts[posts.length - 1];
        setPopularPosts(popularPosts);
        posts.pop();
        setPosts(posts);
      }
    }
    GetPost();
  }, [!openPost])

 
  const callbacks = {
    onWordClick: console.log,
    onWordMouseOver: console.log,
  }

  const size = [400, 400]; 

  const words = tags.map(obj => {
    const tag = obj.tags;
    return {
      text: tag,
      value: Math.floor(Math.random() * 101)
    }
  })

  return (
    <Container className='mb-5'>
      {post[0] ? 
      <>
      <Row className='pt-5 mt-5 d-flex justify-content-center align-items-center'>
      <div className="col-9">
        <FormattedMessage id='latest_posts'/>
      </div>
      </Row>
      <PostsCards post={post}/>

      <Row className='pt-5 mt-5 d-flex justify-content-center align-items-center'>
      <div className="col-9">
        <FormattedMessage id='popular_posts'/>
      </div>
      </Row>
      <PostsCards post={popularPosts}/>
      

      <Row className='pt-5 mt-5 d-flex justify-content-center align-items-center'>
      <div className="col-9">
        <FormattedMessage id='tags'/>
      </div>
      <div className='d-flex col-9 flex-wrap'>
        <ReactWordcloud
          callbacks={callbacks}
          size={size}
          words={words}
        />
      </div>
      </Row>
      </>
      : <div className='pt-5 mt-5 text-center'>Нет постов</div>}
    </Container>
  )
}