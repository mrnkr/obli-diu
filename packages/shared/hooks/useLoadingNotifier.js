import { useContext, useEffect } from 'react';
import LoadingContext from '../contexts/LoadingContext';

const useLoadingNotifier = (loading) => {
  const [_, setLoadingCounter] = useContext(LoadingContext);

  useEffect(() => {
    const diff = loading ? 1 : -1;
    setLoadingCounter((value) => value + diff);
  }, [loading, setLoadingCounter]);
};

export default useLoadingNotifier;
