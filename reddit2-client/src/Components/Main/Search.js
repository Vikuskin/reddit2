import { useContext, useEffect, useState } from "react";
import { Context } from "../Functions/Context";
import { searchPost } from '../Functions/searchFunctions/search';
import { Container, Row } from "react-bootstrap";
import { PostsCards } from "./PostsCards";

export const Search = () => {
  const {
    search
  } = useContext(Context);

  const [postSearch, setPostSearch] = useState([]);

  useEffect(() => {
    async function GetPost() {
      let posts = await searchPost(search)
      if (posts) {
        setPostSearch(posts);
      }
    }
    GetPost();
  }, [search])

  return (
    <Container className='mb-5'>
      {postSearch[0] ?
      <> 
      <Row className='pt-5 mt-5 d-flex justify-content-center align-items-center'>
      </Row>
      <PostsCards post={postSearch}/>
      </> : <div className='pt-5 mt-5 text-center'>Нет постов</div>}

    </Container>
  )
}