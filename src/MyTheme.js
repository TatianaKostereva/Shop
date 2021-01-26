import React, { useState } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';

export const MyThemeContext = React.createContext(
  [],
);

const bigTheme = createMuiTheme({
  fontSizes: {
    mainTitle: '20px',
  },
});

const smallTheme = createMuiTheme({
  fontSizes: {
    mainTitle: '10px',
  },
});

const MyTheme = ({ children }) => {
  const [theme, setTheme] = useState(smallTheme);

  return (
    <MyTheme.Provider value={theme}>
      {children}
    </MyTheme.Provider>
  );
};

export default MyTheme;
