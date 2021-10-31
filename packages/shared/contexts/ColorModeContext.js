import { createContext } from 'react';

const ColorModeContext = createContext({
  toggleColorMode: () => {},
  mode: 'dark',
});

export default ColorModeContext;
