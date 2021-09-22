import { useState, useEffect, useCallback } from 'react';

const useGqlError = (error) => {
  const [err, setErr] = useState();

  useEffect(() => {
    if (error && error.message) {
      setErr(error.message);
    }
  }, [error]);

  const clearError = useCallback(() => {
    setErr();
  }, []);

  return [err, clearError];
};

export default useGqlError;
