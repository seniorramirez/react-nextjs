import { auth }  from '../firebase/Firebase';
import {  signInWithEmailAndPassword     } from 'firebase/auth';

export const useLogin = () => {
  const login = async (email: string, password: string) => {
    const data = await signInWithEmailAndPassword(auth,email, password);
    
    //console.info(data);
    if (data.user) {
        localStorage.setItem("token",data.user.accessToken);
    }

    return data;
  };

  return { login };
};