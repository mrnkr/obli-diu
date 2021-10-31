import { useMemo } from 'react';
import { useTheme } from 'react-native-elements';
import { useTheme as useThemeRN } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const makeStyles = (styleFactory) => () => {
  const { theme } = useTheme();
  const themeNavigation = useThemeRN();
  const safeAreaInsets = useSafeAreaInsets();
  const styles = useMemo(
    () => styleFactory({ ...theme, ...themeNavigation }, safeAreaInsets),
    [theme, themeNavigation, safeAreaInsets],
  );
  return styles;
};

export default makeStyles;
