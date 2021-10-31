/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';

const useMountEffect = (effect) => {
  useEffect(effect, []);
};

export default useMountEffect;
