import { Metadata } from 'next';

import { getMeUser } from '@/utils/getMeUser';
import CheckoutView from '@/views/CheckoutView';

export const metadata: Metadata = {
  title: 'Checkout',
  description: 'this is a checkout page',
};

const Checkout = async () => {
  await getMeUser({ nullUserRedirect: '/login' });

  return <CheckoutView />;
};

export default Checkout;
