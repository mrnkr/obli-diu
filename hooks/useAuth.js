import jwtDecode from 'jwt-decode';
import { useState } from 'react';
import useMountEffect from './useMountEffect';

const useAuth = () => {
  const [userInfo, setUserInfo] = useState();

  useMountEffect(() => {
    const onLogin = () => {
      const { sub, ...payload } = jwtDecode(localStorage.getItem('token'));
      setUserInfo({
        id: sub,
        ...payload,
      });
    };

    onLogin();
    document.addEventListener('login', onLogin);
    return () => document.removeEventListener('login', onLogin);
  });

  return userInfo;
};

export default useAuth;
