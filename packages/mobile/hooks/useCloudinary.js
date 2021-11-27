import { useRef } from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { CLOUDINARY_CLOUD_NAME } from '@env';

export {
  cartoonify,
  blackwhite,
  sepia,
} from '@cloudinary/url-gen/actions/effect';

const useCloudinary = () => {
  const cloudinary = useRef(
    new Cloudinary({
      cloud: {
        cloudName: CLOUDINARY_CLOUD_NAME,
      },
    }),
  );

  return cloudinary.current;
};

export default useCloudinary;
