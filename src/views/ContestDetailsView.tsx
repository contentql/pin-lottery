'use client';

import Image from 'next/image';

import Banner from '@/components/common/Banner';
import ContestBody from '@/components/contest-details/ContestBody';
import inner_hero_shape from '/public/images/elements/inner-hero-shape.png';
interface PageProps {
  params: {
    [key: string]: string | string[] | undefined;
  };
}

const ContestDetailsView = ({ params }: PageProps) => {

  return (
    <>
      {/* Banner section here */}
      <div className='inner-hero-section'>
        <div className='bg-shape'>
          <Image src={inner_hero_shape} alt='inner_hero_shape' />
        </div>
        <Banner
          breadcrumb={[
            ['Home', '/'],
            ['Lottery', '/'],
            ['Contest No: B2T', '/'],
          ]}
        />
      </div>

      {/* Bdy section here */}
      <ContestBody />
    </>
  );
};

export default ContestDetailsView;
