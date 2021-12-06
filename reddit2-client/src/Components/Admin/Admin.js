import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const Admin = () => {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    async function GetUsers() {
      let users = await axios.get('https://reddit2-server.herokuapp.com/admin')
      setAllUsers(users.data);
    }
    GetUsers();
  }, [])

  return (
    <Container className='pt-5 mt-5'>

        <div className='d-flex flex-column'>
          {allUsers.map(user => (
            <div className='d-flex'>
            <div className='mb-1 col-9' style={{ border: '1px solid grey', borderRadius: '8px' }}>
              <p>{user.name}</p>
              <p>{user.email}</p>
            </div>
            <div className='col-3'>
            <Link to={`/admin/${user.email}`}>
              <Button variant="light" className="p-1 d-flex align-items-center justify-content-between" style={{ borderRadius: '8px', fontSize: '12px' }}>
                Перейти
              </Button>
            </Link>
            </div>
            </div>
          ))}
        </div>

    </Container>
  )
}