import CheckoutView from '@/views/CheckoutView';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Checkout',
  description: 'this is a checkout page',
};

export default function CheckoutPage() {
  return <CheckoutView />;
}
