import HowWorksView from '@/views/HowWorksView';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How it works',
  description: 'This is a  how works page',
};

export default function HowWorkView() {
  return <HowWorksView />;
}
