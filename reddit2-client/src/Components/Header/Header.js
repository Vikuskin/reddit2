import redditLogo from '../../image/reddit.svg';
import searchIcon from '../../image/search.svg';
import loginImg from '../../image/loginImg.svg';
import googleLogo from '../../image/googleLogo.png';
import githubLogo from '../../image/githubLogo.png';
import { Navbar, Image, Dropdown, DropdownButton, ButtonGroup, Button } from 'react-bootstrap';
import { ChangeTheme } from './ChangeTheme';
import { FormattedMessage } from 'react-intl';
import { LanguagesSelect } from './LanguagesSelect';
import { useContext, useState, useEffect } from 'react';
import { Context } from '../Functions/Context';
import logoutIcon from '../../image/logout.svg';
import { Link } from 'react-router-dom';
import axios from 'axios';


export const Header = () => {
  const {
    theme,
    themeToggler,
    currentLocale,
    handleChange, 
    authGoogle,
    authGit,
    user,
    setUser,
    search, 
    setSearch
  } = useContext(Context);

  const [role, setRole] = useState('reader');

  useEffect(() => {
    async function checkRole() {
        if (user) {
          const role = await axios.get('https://reddit2-server.herokuapp.com/admin', {
            params: {
              userEmail: user.email 
            }
          })
          setRole(role.data);
        }
        
    }
    checkRole()
  }, [user])

  const logOutSocial = () => {
    if (authGoogle.authentication) {
      authGoogle.logOut();
    } else {
      authGit.logOut();
    }
    setUser(null);
    setRole('reader')
  }
  
  

  return (
    <Navbar className="row d-flex align-items-center justify-content-between" fixed="top" style={{ zIndex: '10' }}>
      <Link to="/" className='col'>
        <div className="d-flex align-items-center">
          <Image src={redditLogo}/>
          <div className="pl-2 d-none d-md-block">Reddit 2.0</div>
        </div>
      </Link>
      <div className="col p-0 position-relative">
        <FormattedMessage id='search'>
          {(msg) => (
            <>
            <input type='text' placeholder={msg} style={{ borderRadius: "5px", border: '1px solid grey', outline: 'none', position: 'relative', padding: "0 15px 0 45px"}} value={search} onChange={(e) => setSearch(e.target.value)}></input>
            <Link to='/search' search={search}>
            <Button style={{ position: 'absolute', top: 0, left: 0, bottom: 0 , width: "40px", border: '1px solid grey'}}>
              <Image src={searchIcon} style={{ width: '20px', position: 'absolute', top: 2, left: 8 }}/>
            </Button>
            </Link>
            </>
          )}
        </FormattedMessage>
      </div>
      <div className="col d-flex justify-content-end p-0">
        {['start'].map((direction) => (
        <DropdownButton
          as={ButtonGroup}
          key={direction}
          id={`dropdown-button-drop-${direction}`}
          drop={direction}
          variant="light"
          title={
            <Image src={loginImg} style={{ maxWidth: "25px" }}/>
          }
        >
        <div className="p-3" style={{ width: '250px' }}>
        <div>
          {user ? 
            <>
            <img src={user.photoURL} alt='Avatar' style={{ width: '25px', borderRadius: "50%" }}/>
            <span className="ml-2">{user.displayName}</span>
            <div className="d-flex justify-content-between pt-2">
            <Link to='/profile' className="col-9 p-0">
              <Button variant="light" className="col-12" >
                <FormattedMessage id='account'/>
              </Button>
            </Link>
            <Button variant="light" className="col-3 p-0" onClick={logOutSocial}>
              <img src={logoutIcon} alt="Logout"/>
            </Button>
            </div>
              {role === 'admin' ? 
                <>
                <Dropdown.Divider />
                <Link to='/admin'>
                  <Button variant="light" className="col-12 d-block">
                    Admin панель
                  </Button>
                </Link>
                </> : <></>}
            </>
            :
            <>
            <div eventkey="1">
          <FormattedMessage id="sign_in"/>
          <Button variant="light" className="col-12 d-block" 
          onClick={() => {
            authGoogle.logIn()
          }}>
            <div className="d-flex align-items-center">
              <Image src={googleLogo} style={{ width: "25px" }}/>
              <span className="pl-1"><FormattedMessage id="sign_in_google"/></span>
            </div>
          </Button>
        </div>
        <div eventkey="2">
          <Button variant="light" className="col-12 d-block" 
          onClick={() => {
            authGit.logIn()
          }}>
            <div className="d-flex align-items-center">
              <Image src={githubLogo} style={{ width: "25px" }}/>
              <span className="pl-1"><FormattedMessage id="sign_in_github"/></span>
            </div>
          </Button>
        </div>
        </>
        }
        </div>
        
        <Dropdown.Divider />
        <div eventkey="3">
          <FormattedMessage id="view_options"/>
          <ChangeTheme theme={theme} themeToggler={themeToggler}/>
        </div>
        <Dropdown.Divider/>
        <div eventkey="4">
          <LanguagesSelect currentLocale={currentLocale} handleChange={handleChange} />
        </div>
        </div>
      </DropdownButton>
      ))}
      </div>
    </Navbar>
  )
}