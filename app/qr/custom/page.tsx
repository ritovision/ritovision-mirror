import type { Metadata } from 'next';
import { getQrCodeProfiles } from '@/lib/qrCodes';
import CustomQrGenerator from './CustomQrGenerator';

export const metadata: Metadata = {
  title: 'Custom QR | RitoVision',
  description: 'Generate a custom QR code for any URI.',
  alternates: {
    canonical: 'https://ritovision.com/qr/custom',
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      nocache: true,
      noimageindex: true,
    },
  },
};

export default function CustomQrPage() {
  return <CustomQrGenerator profiles={getQrCodeProfiles()} />;
}
