import { useEffect, useState } from 'react';

const useChangeEffect = (effect, value) => {
  const [prevValue, setPrevValue] = useState();

  useEffect(() => {
    effect(value, prevValue);
    return () => setPrevValue(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, prevValue]);
};

export default useChangeEffect;
