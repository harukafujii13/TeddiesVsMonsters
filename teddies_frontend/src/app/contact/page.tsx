import Contact from '@/components/contact/Contact';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact us',
};

const ContactPage = () => {
  return <Contact />;
};

export default ContactPage;
