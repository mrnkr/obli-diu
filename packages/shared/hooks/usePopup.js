import { useState, useCallback } from 'react';

const usePopup = () => {
  const [visible, setVisible] = useState(false);

  const openPopup = useCallback(() => {
    setVisible(true);
  }, []);

  const closePopup = useCallback(() => {
    setVisible(false);
  }, []);

  return [visible, openPopup, closePopup];
};

export default usePopup;
