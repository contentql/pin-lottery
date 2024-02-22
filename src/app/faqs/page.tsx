import FaqView from '@/views/FaqView';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Faq',
  description: 'This is a Faq page',
};
export default function FaqPage() {
  return <FaqView />;
}
