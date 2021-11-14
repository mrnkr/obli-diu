import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import CssBaseline from '@material-ui/core/CssBaseline';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { ApolloProvider } from '@apollo/client';
import useMountEffect from 'shared/hooks/useMountEffect';
import ColorModeContext from 'shared/contexts/ColorModeContext';
import { LoadingContextProvider } from 'shared/contexts/LoadingContext';
import { ErrorContextProvider } from 'shared/contexts/ErrorContext';
import { AuthContextProvider } from 'shared/contexts/AuthContext';
import '../styles/globals.css';
import createTheme from '../theme';
import client from '../apollo/config';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorSnackbar from '../components/ErrorSnackbar';

const initialColorMode = process.browser
  ? localStorage.getItem('colorMode') ?? 'dark'
  : 'dark';

const MyApp = ({ Component, pageProps }) => {
  const [mode, setMode] = useState(initialColorMode);
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        const nextMode = mode === 'light' ? 'dark' : 'light';
        setMode(nextMode);
        localStorage.setItem('colorMode', nextMode);
      },
      mode,
    }),
    [mode],
  );

  const theme = useMemo(() => createTheme(mode), [mode]);

  const tokenProvider = useMemo(
    () => ({
      getToken: () => (process.browser ? localStorage.getItem('token') : ''),
      subscribe: (next) => {
        next();
        addEventListener('login', next);
        return {
          unsubscribe: () => removeEventListener('login', next),
        };
      },
    }),
    [],
  );

  useMountEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  });

  return (
    <>
      <Head>
        <title>Obligatorio DIU</title>
      </Head>
      <ApolloProvider client={client}>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <LoadingContextProvider>
              <ErrorContextProvider>
                <AuthContextProvider tokenProvider={tokenProvider}>
                  <CssBaseline />
                  <LoadingIndicator />
                  <Component {...pageProps} />
                  <ErrorSnackbar />
                </AuthContextProvider>
              </ErrorContextProvider>
            </LoadingContextProvider>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </ApolloProvider>
    </>
  );
};

MyApp.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any,
};

export default MyApp;
