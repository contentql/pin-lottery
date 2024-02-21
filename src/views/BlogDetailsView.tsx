import Banner from '@/components/common/Banner';
import Details from '@/components/single-blog/Details';
import Image from 'next/image';
import inner_hero_shape_2 from '/public/images/elements/inner-hero-shape-2.png';

const BlogDetailsView = () => {
  return (
    <>
      {/* Banner section here */}
      <div className='inner-hero-section style--six'>
        <div className='bg-shape'>
          <Image src={inner_hero_shape_2} alt='inner hero shape 2' />
        </div>
        <Banner
          breadcrumb={[
            ['Home', '/'],
            ['Pages', '/'],
            ['Blog', '/'],
            ['Single Blog', '/'],
          ]}
        />
      </div>

      {/* Details section here */}
      <Details />
    </>
  );
};

export default BlogDetailsView;
