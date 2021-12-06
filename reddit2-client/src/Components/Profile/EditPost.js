import styled from 'styled-components';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { Context } from '../Functions/Context'; 
import { putEditPost } from '../Functions/profileFunctions/editPost';

const Overlay = styled.div`
  position: fixed;
  top:0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  z-index: 20;
`

export const EditPost = () => {
  const {
    editPost,
    setEditPost
  } = useContext(Context);
  
  const [group, setGroup] = useState(editPost.groups);
  const [tags, setTags] = useState(editPost.tags);
  const [text, setText] = useState(editPost.content);
  const [mark, setMark] = useState(editPost.mark);

  const closeModal = (e) => {
    if (e.target.id === 'overlay' || e.target.className === 'btn-close' || e.target.className === 'btn btn-secondary') {
      setEditPost(null)
    }
  }
  
  return (
    <Overlay id='overlay' onClick={closeModal}>
    <Modal.Dialog scrollable={true} className="mt-5" style={{ color: 'black', overflowY: 'auto' }}>
      <Modal.Header closeButton onClick={closeModal} className='align-items-start'>
        <div className='d-block'>
        <Modal.Title>Edit post</Modal.Title>       
        </div>
      </Modal.Header>

      <Modal.Body scrollable={true}>
        <Form className='mt-2 p-2' style={{ border: '1px solid grey', borderRadius: '8px' }}>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              Выберите группу
            </Form.Label>
            <Col sm={10} value={group} >
              <Form.Check
              className='d-flex align-items center'
              inline
              label="Film"
              name="class"
              type='radio'
              id={`inline-radio-1`}
              value='film'
              onChange={(e) => setGroup(e.target.value)}
              checked={group === 'film' ? true : false}
              />
              <Form.Check
                className='d-flex align-items center'
                inline
                label="Book"
                name="class"
                type='radio'
                id={`inline-radio-2`}
                value='book'
                onChange={(e) => setGroup(e.target.value)}
                checked={group === 'book' ? true : false}
              />
              <Form.Check
                className='d-flex align-items center'
                inline
                label="Game"
                name='class'
                type='radio'
                id={`inline-radio-3`}
                value='game'
                onChange={(e) => setGroup(e.target.value)}
                checked={group === 'game' ? true : false}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              Тэги
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" value={tags} onChange={(e) => setTags(e.target.value)}/>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              Текст обзора
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" as='textarea' style={{ height: '200px' }} 
              value={text} onChange={(e) => setText(e.target.value)}/>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              Оценка
            </Form.Label>
            <Col sm={10}>
              <Form.Range min='0' max='10' style={{ maxWidth: '150px' }}
              value={mark} onChange={(e) => setMark(e.target.value)}/>
            </Col>
          </Form.Group>

        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary">Close</Button>
        <Button variant="primary" onClick={(e) => {
                e.preventDefault();
                putEditPost(group, tags, text, mark, editPost.id);
                setText('');
                setTags('');
                setGroup(false);
                setMark(0);
                setEditPost(null);
              }}>Save changes</Button>
      </Modal.Footer>
    </Modal.Dialog>
    </Overlay>
  )
}