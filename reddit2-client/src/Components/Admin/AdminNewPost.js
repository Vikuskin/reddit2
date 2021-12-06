import { Container } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { createPost } from '../Functions/profileFunctions/createPost';
import { useState, useMemo, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import MDEditor from '@uiw/react-md-editor';
import { getTagsDB } from '../Functions/profileFunctions/getTagsDB';
import 'react-autocomplete-input/dist/bundle.css';

const baseStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  transition: 'border .3s ease-in-out'
};
const activeStyle = {
  borderColor: '#2196f3'
};
const acceptStyle = {
  borderColor: '#00e676'
};
const rejectStyle = {
  borderColor: '#ff1744'
};

export const AdminNewPost = () => {
  const [group, setGroup] = useState(false);
  const [tags, setTags] = useState('');
  const [text, setText] = useState('');
  const [mark, setMark] = useState(0);
  const [files, setFiles] = useState([]);
  const [tagsDB, setTagsDB] = useState([]);

  useEffect(() => {
    async function GetTags() {
      let tagsDB = await getTagsDB();
      let tag = [];
      if (tagsDB) {
        let tagStr = tagsDB.map(tag => Object.values(tag).toString().split(' '));
        for (let i = 0; i < tagStr.length; i++) {
          tag.push(...tagStr[i]);
        }
      }
      setTagsDB(tag);
    }
    GetTags();
  }, [])
  

  const onDrop = useCallback(acceptedFiles => {
    setFiles(acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })));
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png',
    maxFiles: 3
  });

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);

  const thumbs = files.map(file => (
    <div key={file.name}>
      <img
        src={file.preview}
        alt={file.name}
        style={{ width: '50px', marginRight: '10px' }}
      />
    </div>
  ));

  useEffect(() => () => {
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  const blobToBase64 = blob => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise(resolve => {
      reader.onloadend = () => {
        resolve(reader.result);
      };
    });
  };

    let dataImg = [];
    const buffer = files.forEach(file => {
      blobToBase64(file).then(res => {
        dataImg.push(res)
        return dataImg;
      });
      return dataImg
    });

  const checkInput = () => {
    if (group === false || tags === '' || text === '') {
      alert("Не все поля заполнены")
      return false;
    }
  }
  const emailUser = document.location.pathname.slice(7, -11);
  
  return (
    <Container className='pt-5 mt-5'>
      <div className="col-12">
        <FormattedMessage id='create_new_review'/>

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
              <MDEditor
                value={text}
                onChange={setText}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              Изображения
            </Form.Label>
            <Col sm={10}>
              <section>
                <div {...getRootProps({style})}>
                  <input {...getInputProps()} />
                  <div>Drag and drop your images here.</div>
                </div>
                <aside className='d-flex align-items-center mt-2'>
                  {thumbs}
                </aside>
              </section>
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

          <Form.Group as={Row} className="mb-3" variant='light'>
            <Col sm={{ span: 10, offset: 2 }}>
              <Button type="submit" style={{ border: 'none' }} 
              onClick={(e) => {
                e.preventDefault();
                if (checkInput() === false) {
                  return;
                } else {
                  createPost(group, tags, text, mark, emailUser, dataImg);
                  setText('');
                  setTags('');
                  setGroup(false);
                  setMark(0);
                  setFiles([])
                }
              }}
                >Send</Button>
            </Col>
          </Form.Group>
        </Form>
      </div>
    </Container>
  )  
}