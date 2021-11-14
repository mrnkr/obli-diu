import { useEffect, useState } from 'react';
import useAuth from './useAuth';

const useGuard = (onAuthReady) => {
  const [done, setDone] = useState(false);
  const userInfo = useAuth();

  useEffect(() => {
    if (!done && !userInfo.loading) {
      onAuthReady(userInfo);
      setDone(true);
    }
  }, [done, onAuthReady, userInfo]);
};

export default useGuard;
