import Login from '@/components/login/Login';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
};

const LoginPage = () => {
  return <Login />;
};

export default LoginPage;
