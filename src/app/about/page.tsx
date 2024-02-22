import AboutView from '@/views/AboutView';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'About',
  description: 'This is a about page',
};
export default function AboutPage() {
  return <AboutView />;
}
