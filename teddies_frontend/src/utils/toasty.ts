import { toast } from 'react-toastify';

export const customToastStyle = {
  backgroundColor: '#CE8C3D',
  color: '#fff',
  background: '#CE8C3D',
  top: '50px',

  // Add any other custom styles you want to override here
};

export const toastSuccess = (message: string) => {
  toast.success(message);
};
export const toastError = (message: string) => {
  toast.error(message);
};
