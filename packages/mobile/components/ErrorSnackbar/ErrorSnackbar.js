import { useCallback, useContext, useEffect } from 'react';
import { Alert } from 'react-native';
import ErrorContext from 'shared/contexts/ErrorContext';

const ErrorSnackbar = () => {
  const [error, setError] = useContext(ErrorContext);

  const clearError = useCallback(() => {
    setError();
  }, [setError]);

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error, [{ text: 'OK', onPress: clearError }]);
    }
  }, [clearError, error]);

  return null;
};

export default ErrorSnackbar;
