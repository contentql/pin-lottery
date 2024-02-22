import WinnerView from '@/views/WinnerView';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Winner',
  description: 'This is a winner page',
};
export default function WinnerPage() {
  return <WinnerView />;
}
