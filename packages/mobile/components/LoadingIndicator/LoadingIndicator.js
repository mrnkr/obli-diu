import { useTheme } from '@react-navigation/native';
import React, { useContext, useMemo } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import LoadingContext from 'shared/contexts/LoadingContext';

const LoadingIndicator = () => {
  const theme = useTheme();
  const [loadingCounter] = useContext(LoadingContext);

  const isLoading = useMemo(() => loadingCounter > 0, [loadingCounter]);

  return (
    <>
      {isLoading && (
        <View
          style={[styles.self, { backgroundColor: theme.colors.background }]}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  self: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    opacity: 0.6,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
});

export default LoadingIndicator;
