import jwtDecode from 'jwt-decode';
import { useState } from 'react';
import useMountEffect from './useMountEffect';

const useAuth = () => {
  const [userInfo, setUserInfo] = useState();

  useMountEffect(() => {
    const onLogin = () => {
      setUserInfo(jwtDecode(localStorage.getItem('token')));
    };

    onLogin();
    document.addEventListener('login', onLogin);
    return () => document.removeEventListener('login', onLogin);
  });

  return userInfo;
};

export default useAuth;
