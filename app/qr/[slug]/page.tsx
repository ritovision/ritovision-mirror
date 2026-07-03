import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import QRExperience from '@/components/qr/QRExperience';
import {
  getQrCodeBySlug,
  getQrCodeProfiles,
  getQrProfilePath,
} from '@/lib/qrCodes';

export const dynamicParams = false;

type QrSlugPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getQrCodeProfiles().map((profile) => ({
    slug: profile.slug,
  }));
}

export async function generateMetadata({
  params,
}: QrSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const profile = getQrCodeBySlug(slug);

  if (!profile) {
    return {
      title: 'QR | RitoVision',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: `${profile.title} QR | RitoVision`,
    description: profile.description,
    alternates: {
      canonical: `https://ritovision.com${getQrProfilePath(profile.slug)}`,
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
}

export default async function QrSlugPage({ params }: QrSlugPageProps) {
  const { slug } = await params;
  const profile = getQrCodeBySlug(slug);

  if (!profile) {
    notFound();
  }

  return <QRExperience profiles={getQrCodeProfiles()} activeSlug={profile.slug} />;
}
