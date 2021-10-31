import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import jwtDecode from 'jwt-decode';
import useMountEffect from '../hooks/useMountEffect';

const decodeToken = (token) => {
  try {
    const { sub, ...payload } = jwtDecode(token);
    return {
      id: sub,
      ...payload,
    };
  } catch {
    return undefined;
  }
};

const AuthContext = createContext();

export const AuthContextProvider = ({ children, tokenProvider }) => {
  const [userInfo, setUserInfo] = useState(
    decodeToken(tokenProvider.getToken()),
  );

  useMountEffect(() => {
    const subscription = tokenProvider.subscribe(() => {
      setUserInfo(decodeToken(tokenProvider.getToken()));
    });

    return () => subscription.unsubscribe();
  });

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.any,
  tokenProvider: PropTypes.shape({
    getToken: PropTypes.func,
    subscribe: PropTypes.func,
  }).isRequired,
};

export default AuthContext;
