import React from 'react';
import PropTypes from 'prop-types';
import ThemeProvider from '@material-ui/styles/ThemeProvider';

import '../styles/globals.css';
import theme from '../theme';

const MyApp = ({ Component, pageProps }) => (
  <ThemeProvider theme={theme}>
    <Component {...pageProps} />
  </ThemeProvider>
);

MyApp.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any,
};

export default MyApp;
