import { useCallback, useEffect, useMemo, useState } from 'react';
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

  const appliedFilters = useMemo(
    () =>
      filters.map(({ effect }) => {
        const img = cloudinary.image(image).format('auto').quality('auto');

        if (effect) {
          img.effect(effect());
        }

        return img.toURL();
      }),
    [cloudinary, image],
  );

  const imgWithEffect = useMemo(
    () => appliedFilters[currentFilter],
    [appliedFilters, currentFilter],
  );

  useEffect(() => {
    (async () => {
      await Promise.all(appliedFilters.map(Image.prefetch));
    })();
  }, [appliedFilters]);

  const nextEffect = useCallback(() => {
    setCurrentFilter((value) => (value + 1) % filters.length);
  }, []);

  return [imgWithEffect, { nextEffect }];
};

export default useImageEffects;
