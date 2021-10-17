import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const ErrorContext = createContext([undefined, () => {}]);

export const ErrorContextProvider = ({ children }) => {
  const errorState = useState();

  return (
    <ErrorContext.Provider value={errorState}>{children}</ErrorContext.Provider>
  );
};

ErrorContextProvider.propTypes = {
  children: PropTypes.any,
};

export default ErrorContext;
