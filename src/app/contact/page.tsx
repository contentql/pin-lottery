import ContactView from '@/views/ContactView';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'This is a contact page',
};
export default function ContactPage() {
  return <ContactView />;
}
