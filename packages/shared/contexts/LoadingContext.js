import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const LoadingContext = createContext([0, () => {}]);

export const LoadingContextProvider = ({ children }) => {
  const loadingState = useState(0);

  return (
    <LoadingContext.Provider value={loadingState}>
      {children}
    </LoadingContext.Provider>
  );
};

LoadingContextProvider.propTypes = {
  children: PropTypes.any,
};

export default LoadingContext;
