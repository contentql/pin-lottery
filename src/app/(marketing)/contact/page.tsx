import { Metadata } from 'next';

import { getMeUser } from '@/utils/getMeUser';
import ContactView from '@/views/ContactView';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'This is a contact page',
};

const Contact = async () => {
  await getMeUser({ nullUserRedirect: '/login' });

  return <ContactView />;
};

export default Contact;
