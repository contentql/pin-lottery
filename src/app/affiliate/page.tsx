import AffiliateView from '@/views/AffiliateView';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Affiliate',
  description: 'This is a about page',
};
export default function AffiliatePage() {
  return <AffiliateView />;
}
