'use client';
import dynamic from 'next/dynamic';

const HeroDynamicImage = dynamic(
  () => import('@/home/hero/HeroDynamicImage'),
  { ssr: false }
);

export default function HeroDynamicImageWrapper() {
  return <HeroDynamicImage />;
}
