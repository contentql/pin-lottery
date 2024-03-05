import { Metadata } from 'next';

import { getMeUser } from '@/utils/getMeUser';
import CartView from '@/views/CartView';

export const metadata: Metadata = {
  title: 'Cart',
  description: 'this is cart page',
};

const Cart = async () => {
  await getMeUser({ nullUserRedirect: '/login' });

  return <CartView />;
};

export default Cart;
