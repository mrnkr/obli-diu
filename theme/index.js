import createMuiTheme from '@material-ui/core/styles/createTheme';

const createTheme = (type) =>
  createMuiTheme({
    palette: {
      type,
      primary: {
        main: '#ec407a',
      },
    },
  });

export default createTheme;
