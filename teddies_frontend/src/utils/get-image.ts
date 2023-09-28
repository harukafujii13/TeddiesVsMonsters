export const getProductImage = (identifier: string) => {
  const imageUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/merchandise/${identifier}`;
  return imageUrl;
};
