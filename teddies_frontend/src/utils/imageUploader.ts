import { getCookies } from '@/utils/auth';
import { api } from '@/utils/axios';
import axios from 'axios';

export const imageUploader = async (
  username: string,
  folderName: string,
  image: File,
) => {
  const formData = new FormData();
  const file = image;
  file && formData.append('file', file);
  formData.append('public_id', username);
  formData.append('folder', folderName);

  // formData.append('folder', '/${public_id}');

  const signatureResponse = await api.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/cloudinary`,
    { username: username, folderName: folderName },
  );

  const { signature, timestamp } = signatureResponse.data;
  console.log(signatureResponse);

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload?api_key=${process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY}&timestamp=${timestamp}&signature=${signature}`,
      formData,
    );

    const { public_id } = response.data;
    const avatorName = public_id.split('/')[1];
    const { jwt, id } = getCookies();
    const url = process.env.NEXT_PUBLIC_API_URL;

    const userResponse = await api.put(
      `${url}/api/users/${id}`,
      {
        avatar: avatorName,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      },
    );

    return userResponse;
  } catch (error) {
    console.log(error);
    return Promise.reject('Image upload failed');
  }
};
