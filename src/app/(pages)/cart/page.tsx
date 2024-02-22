import CartView from '@/views/CartView';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cart',
  description: 'this is cart page',
};
export default function CartPage() {
  return <CartView />;
}
