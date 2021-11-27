/* eslint-disable camelcase */
import { useCallback, useState } from 'react';
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from '@env';

const useImageUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState();
  const [secureUrl, setSecureUrl] = useState();
  const [publicId, setPublicId] = useState();

  const upload = useCallback(async (fileUrl) => {
    setUploading(true);

    try {
      const body = new FormData();
      body.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
      body.append('cloud_name', CLOUDINARY_CLOUD_NAME);
      body.append('file', {
        uri: fileUrl,
        name: fileUrl.split('/').pop(),
        type: 'image/jpeg',
      });

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`,
        {
          body,
          method: 'POST',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
          },
        },
      );

      if (!response.ok) {
        throw await response.json();
      }

      const { secure_url, public_id } = await response.json();
      setSecureUrl(secure_url);
      setPublicId(public_id);
    } catch (err) {
      setError(err.error.message);
    } finally {
      setUploading(false);
    }
  }, []);

  return [upload, { publicId, secureUrl, uploading, error }];
};

export default useImageUpload;
