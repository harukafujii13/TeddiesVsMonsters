// import { resolvers } from '@hookform/resolvers';
import Signup from '@/components/signup/Signup';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Signup',
};

interface FormData {
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

const Form: React.FC = () => {
  return <Signup />;
};

export default Form;
