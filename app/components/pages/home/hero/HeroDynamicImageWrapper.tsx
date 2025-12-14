'use client';
import dynamic from 'next/dynamic';

const HeroDynamicImage = dynamic(
  () => import('@/components/pages/home/hero/HeroDynamicImage'),
  { ssr: false }
);

export default function HeroDynamicImageWrapper() {
  return <HeroDynamicImage />;
}
