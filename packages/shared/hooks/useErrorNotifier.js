import { useEffect, useContext } from 'react';
import ErrorContext from '../contexts/ErrorContext';

const useErrorNotifier = (error) => {
  const [_, setError] = useContext(ErrorContext);

  useEffect(() => {
    if (error && error.message) {
      setError(error.message);
    }
  }, [error, setError]);
};

export default useErrorNotifier;
