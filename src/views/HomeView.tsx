'use client';
import Contest from '@/components/common/Contest';
import Features from '@/components/common/Features';
import HowToPlay from '@/components/common/HowToPlay';
import LatestWinner from '@/components/common/LatestWinner';
import Overview from '@/components/common/Overview';
import Support from '@/components/common/Support';
import Testimonial from '@/components/common/Testimonial';
import Hero from '@/components/home/Hero';

export default function HomeView() {
  return (
    <>
      {/* here section */}
      <Hero />

      {/* How To Play section */}
      <HowToPlay />

      {/* Contest section */}
      <Contest />

      {/* Winner section */}
      {/* <Winner /> */}

      {/*Latest Winner section */}
      <LatestWinner />

      {/*Overview section */}
      <Overview />

      {/*Features section */}
      <Features />

      {/*Testimonial section */}
      <Testimonial />

      {/*Support section */}
      <Support />
    </>
  );
}
