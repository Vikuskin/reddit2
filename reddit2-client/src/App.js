import { ThemeProvider } from 'styled-components';
import { Header } from './Components/Header/Header';
import { GlobalStyle } from './Components/Style/GlobalStyle';
import { lightTheme, darkTheme } from './Components/Style/Themes';
import { useThemes } from './Components/Hooks/useThemes';
import { IntlProvider } from 'react-intl';
import { LOCALES } from './Components/Translate/locales';
import { messages } from './Components/Translate/messages';
import { useLocale } from './Components/Hooks/useLocale';
import { Context } from './Components/Functions/Context';
import { Main } from './Components/Main/Main';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Profile } from './Components/Profile/Profile';
import { NewPost } from './Components/Profile/NewPost';
import { Post } from './Components/Main/Post';
import { EditPost } from './Components/Profile/EditPost';
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import { useAuth } from './Components/Hooks/useAuth';
import { GoogleAuthProvider } from '@firebase/auth';
import { GithubAuthProvider } from '@firebase/auth';
import { useEffect } from 'react';
import axios from 'axios';
import { Search } from './Components/Main/Search';
import { Admin } from './Components/Admin/Admin';
import { AdminProfileUser } from './Components/Admin/AdminProfileUser';
import { AdminNewPost } from './Components/Admin/AdminNewPost';

const firebaseConfig = {
  apiKey: "AIzaSyDPiyF09zGSkGI45QGoaIDd3P95MnskkrY",
  authDomain: "reddit-332309.firebaseapp.com",
  projectId: "reddit-332309",
  storageBucket: "reddit-332309.appspot.com",
  messagingSenderId: "336653890933",
  appId: "1:336653890933:web:afb4202b8f28c791b7cf3c"
};

firebase.initializeApp(firebaseConfig);

function App() {
  const authFirebase = firebase.auth;
  const providerGoogle = new GoogleAuthProvider();
  const providerGit = new GithubAuthProvider();
  const [user, setUser] = useState(null);
  const authGoogle = useAuth(authFirebase, providerGoogle, setUser);
  const authGit = useAuth(authFirebase, providerGit, setUser);

  const [theme, themeToggler] = useThemes();
  const [currentLocale, handleChange] = useLocale();

  const [openPost, setOpenPost] = useState(null);
  const [editPost, setEditPost] = useState(null);
  const [search, setSearch] = useState(null);


  useEffect(() => {
    function GetUser() {
      if (user) {
        const userEmail = user.email;
        const userName = user.displayName;
        axios.post('https://reddit2-server.herokuapp.com/auth', {
          userEmail: userEmail,
          userName: userName
        })
      }
    }
    GetUser();
  }, [user])

  return (
    <BrowserRouter>
    <Context.Provider value={{
      theme,
      themeToggler,
      currentLocale,
      handleChange,
      setOpenPost,
      openPost, 
      editPost,
      setEditPost,
      authGit,
      authGoogle,
      user,
      setUser,
      search,
      setSearch
    }}>
      <IntlProvider messages={messages[currentLocale]} locale={currentLocale} defaultLocale={LOCALES.ENGLISH}>
        <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
          <GlobalStyle/>
          <Header/>
          <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/profile" element={user? <Profile/> : <Main/>}/>
            <Route path="/profile/new_review" element={user ? <NewPost/> : <Main/>}/>
            <Route path='/search' element={<Search/>}/>
            <Route path='/admin' element={user ? <Admin/> : <Main/> }/>
            <Route path='/admin/:id' element={user ? <AdminProfileUser/> : <Main/> }/>
            <Route path='/admin/:id/new_review' element={user ? <AdminNewPost/> : <Main/> }/>

          </Routes>
          <Post/>
          {editPost && <EditPost/>}
        </ThemeProvider>
      </IntlProvider>
    </Context.Provider>
    </BrowserRouter>
  );
}

export default App;
