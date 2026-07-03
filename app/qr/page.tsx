import type { Metadata } from 'next';
import QRExperience from '@/components/qr/QRExperience';
import {
  defaultQrSlug,
  getQrCodeProfiles,
  getQrCodeBySlug,
} from '@/lib/qrCodes';

export const metadata: Metadata = {
  title: 'QR | RitoVision',
  description: 'Customizable RitoVision QR pages for networking and sharing.',
  alternates: {
    canonical: 'https://ritovision.com/qr',
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

export default function QrPage() {
  const profiles = getQrCodeProfiles();
  const activeProfile = getQrCodeBySlug(defaultQrSlug) ?? profiles[0];

  return <QRExperience profiles={profiles} activeSlug={activeProfile.slug} />;
}
