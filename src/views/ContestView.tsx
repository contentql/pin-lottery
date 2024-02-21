'use client';

import Banner from '@/components/common/Banner';
import Feature from '@/components/contest/Feature';
import LatestContest from '@/components/contest/LatestContest';

const ContestView = () => {
  return (
    <>
      {/* Banner section here */}
      <div className='inner-hero-section style--three'>
        <Banner
          breadcrumb={[
            ['Home', '/'],
            ['Lottery', '/'],
            ['Contest', '/'],
          ]}
        />
      </div>

      {/* Letest contest here */}
      <LatestContest />

      {/* Feature section here */}
      <Feature />
    </>
  );
};

export default ContestView;
