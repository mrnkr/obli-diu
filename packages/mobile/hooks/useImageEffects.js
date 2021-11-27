import { useCallback, useState } from 'react';
import { Image } from 'react-native';
import useLoadingNotifier from 'shared/hooks/useLoadingNotifier';
import useCloudinary, { blackwhite, cartoonify, sepia } from './useCloudinary';

const filters = [
  { name: 'None', effect: undefined },
  { name: 'Black & White', effect: blackwhite },
  { name: 'Cartoonify', effect: cartoonify },
  { name: 'Sepia', effect: sepia },
];

const useImageEffects = (image) => {
  const cloudinary = useCloudinary();
  const [currentFilter, setCurrentFilter] = useState(0);
  const [loading, setLoading] = useState(false);
  const [imgWithEffect, setImgWithEffect] = useState(image);

  useLoadingNotifier(loading);

  const nextEffect = useCallback(async () => {
    const nextEffect = (currentFilter + 1) % filters.length;
    setCurrentFilter(nextEffect);

    if (nextEffect === 0) {
      setImgWithEffect(image);
    }

    setLoading(true);
    const img = cloudinary.image(image);

    if (filters[nextEffect].effect) {
      img.effect(filters[nextEffect].effect());
    }

    const url = img.toURL();
    await Image.prefetch(url);
    setImgWithEffect(url);
    setLoading(false);
  }, [cloudinary, currentFilter, image]);

  return [imgWithEffect, { loading, nextEffect }];
};

export default useImageEffects;
