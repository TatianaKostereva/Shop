import React, { useState } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

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

export const BIG_THEME_KEY = 'bigTheme';
export const SMALL_THEME_KEY = 'smallTheme';

const map = {
  [BIG_THEME_KEY]: bigTheme,
  [SMALL_THEME_KEY]: smallTheme,
};

const MyTheme = ({ children }) => {
  const [themeKey, setTheme] = useState(BIG_THEME_KEY);

  return (
    <MyThemeContext.Provider value={setTheme}>
      <ThemeProvider theme={map[themeKey]}>
        {children}
      </ThemeProvider>
    </MyThemeContext.Provider>
  );
};

export default MyTheme;
