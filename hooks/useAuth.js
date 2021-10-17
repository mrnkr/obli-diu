import jwtDecode from 'jwt-decode';
import { useState } from 'react';
import useMountEffect from './useMountEffect';

const getUserInfoFromLocalStorage = () => {
  try {
    const { sub, ...payload } = jwtDecode(localStorage.getItem('token'));
    return {
      id: sub,
      ...payload,
    };
  } catch {
    return undefined;
  }
};

const useAuth = () => {
  const [userInfo, setUserInfo] = useState(getUserInfoFromLocalStorage());

  useMountEffect(() => {
    const onLogin = () => {
      setUserInfo(getUserInfoFromLocalStorage());
    };

    document.addEventListener('login', onLogin);
    return () => document.removeEventListener('login', onLogin);
  });

  return userInfo;
};

export default useAuth;
