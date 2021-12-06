import { useEffect, useState } from "react";
import axios from "axios";

export function useAuth(authFirebase, provider, setUser) {

  const [authentication, setAuthentication] = useState(null);

  const auth = authFirebase();

  const logIn = () => auth.signInWithPopup(provider);

  const logOut = () => auth.signOut()
    .catch(err => console.error())

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user)
        setAuthentication(user);
      } else {
        setAuthentication(null)
      }
    })
  }, [auth, authentication]);

  return { authentication, logIn, logOut };
}