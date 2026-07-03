export const QR_SITE_URL = 'https://ritovision.com';

export const QR_LAYOUT_KEYS = ['default', 'poster', 'neon', 'logo-stack'] as const;
export type QrLayoutKey = (typeof QR_LAYOUT_KEYS)[number];

export const QR_COLOR_THEME_KEYS = [
  'white',
  'red-blue',
  'red',
  'scanner',
] as const;
export type QrColorThemeKey = (typeof QR_COLOR_THEME_KEYS)[number];

export const QR_IMAGE_KEYS = [
  'none',
  'rito-picture',
  'rito-ceo',
  'rito-mic',
  'rito-rhymes-logo',
  'ritoswap-logo',
  'ritography-logo',
  'ritovision-wordmark',
] as const;
export type QrImageKey = (typeof QR_IMAGE_KEYS)[number];

export type QrCodeConfig = {
  slug: string;
  title: string;
  destination: string;
  layout: QrLayoutKey;
  colorTheme: QrColorThemeKey;
  imageKey: QrImageKey;
  cta: string;
  description: string;
  destinationOptions?: readonly QrDestinationOption[];
};

export type QrDestinationOption = {
  key: string;
  label: string;
  destination: string;
  cta?: string;
  description?: string;
};

export type QrLayoutOption = {
  key: QrLayoutKey;
  label: string;
  supportsImage: boolean;
};

export type QrColorTheme = {
  key: QrColorThemeKey;
  label: string;
  fgColor: string;
  bgColor: string;
  frame: 'blue' | 'white';
};

export type QrImageOption = {
  key: QrImageKey;
  label: string;
  src?: string;
  alt: string;
};

export const qrLayoutOptions: readonly QrLayoutOption[] = [
  { key: 'default', label: 'Default', supportsImage: false },
  { key: 'poster', label: 'Poster', supportsImage: true },
  { key: 'neon', label: 'Neon', supportsImage: false },
  { key: 'logo-stack', label: 'Logo Stack', supportsImage: false },
] as const;

export const qrColorThemes: Record<QrColorThemeKey, QrColorTheme> = {
  white: {
    key: 'white',
    label: 'White on Blue',
    fgColor: '#ffffff',
    bgColor: 'transparent',
    frame: 'blue',
  },
  'red-blue': {
    key: 'red-blue',
    label: 'Red on Blue',
    fgColor: '#FC1819',
    bgColor: 'transparent',
    frame: 'blue',
  },
  red: {
    key: 'red',
    label: 'Red on White',
    fgColor: '#FC1819',
    bgColor: '#ffffff',
    frame: 'white',
  },
  scanner: {
    key: 'scanner',
    label: 'Scanner Safe',
    fgColor: '#000000',
    bgColor: '#ffffff',
    frame: 'white',
  },
};

export const qrImageOptions: Record<QrImageKey, QrImageOption> = {
  none: {
    key: 'none',
    label: 'No Image',
    alt: '',
  },
  'rito-picture': {
    key: 'rito-picture',
    label: 'Rito Portrait',
    src: '/images/home/hero/rito-ponder.jpg',
    alt: 'Rito portrait',
  },
  'rito-ceo': {
    key: 'rito-ceo',
    label: 'Rito CEO',
    src: '/images/home/intro/Rito-CEO.png',
    alt: 'Rito in a suit',
  },
  'rito-mic': {
    key: 'rito-mic',
    label: 'Rito Mic',
    src: '/images/home/cobrands/Rito-mic-hold.jpg',
    alt: 'Rito holding a microphone',
  },
  'rito-rhymes-logo': {
    key: 'rito-rhymes-logo',
    label: 'Rito Rhymes',
    src: '/images/brand/cobrands/RitoRhymes-logo.png',
    alt: 'Rito Rhymes logo',
  },
  'ritoswap-logo': {
    key: 'ritoswap-logo',
    label: 'RitoSwap',
    src: '/images/pages/projects/ritoswap/ritoswap.png',
    alt: 'RitoSwap',
  },
  'ritography-logo': {
    key: 'ritography-logo',
    label: 'Ritography',
    src: '/images/brand/cobrands/ritography-logo.png',
    alt: 'Ritography',
  },
  'ritovision-wordmark': {
    key: 'ritovision-wordmark',
    label: 'RitoVision',
    src: '/images/brand/ritovision-wordmark-tm.png',
    alt: 'RitoVision wordmark',
  },
};

export const qrCodeProfiles = [
  {
    slug: 'connect',
    title: 'Connect',
    destination: `${QR_SITE_URL}/connect`,
    layout: 'default',
    colorTheme: 'white',
    imageKey: 'none',
    cta: 'Scan to connect',
    description: 'RitoVision contact, booking, case studies, socials, and links.',
  },
  {
    slug: 'site-links',
    title: 'Site Links',
    destination: QR_SITE_URL,
    layout: 'default',
    colorTheme: 'white',
    imageKey: 'none',
    cta: 'Scan for RitoVision',
    description: 'Selectable RitoVision site page QR.',
  },
  {
    slug: 'contact-card',
    title: 'Contact Card',
    destination: `${QR_SITE_URL}/contact/ritovision.vcf`,
    layout: 'default',
    colorTheme: 'scanner',
    imageKey: 'none',
    cta: 'Scan to save contact',
    description: 'Direct vCard download for saving RitoVision contact details.',
  },
  {
    slug: 'music',
    title: 'Rito Rhymes',
    destination: 'https://ritorhymes.com',
    layout: 'neon',
    colorTheme: 'red',
    imageKey: 'rito-rhymes-logo',
    cta: 'Scan for music',
    description: 'Music, creative work, and Rito Rhymes links.',
  },
  {
    slug: 'ritoswap',
    title: 'RitoSwap',
    destination: 'https://docs.ritoswap.com',
    layout: 'logo-stack',
    colorTheme: 'white',
    imageKey: 'ritoswap-logo',
    cta: 'Scan for RitoSwap Docs',
    description: 'RitoSwap documentation, mainnet, testnet, and Storybook links.',
    destinationOptions: [
      {
        key: 'docs',
        label: 'Docs',
        destination: 'https://docs.ritoswap.com',
        cta: 'Scan for RitoSwap Docs',
        description: 'RitoSwap documentation QR.',
      },
      {
        key: 'mainnet',
        label: 'Mainnet',
        destination: 'https://ritoswap.com',
        cta: 'Scan for RitoSwap Mainnet',
        description: 'RitoSwap mainnet QR.',
      },
      {
        key: 'testnet',
        label: 'Testnet',
        destination: 'https://testnet.ritoswap.com',
        cta: 'Scan for RitoSwap Testnet',
        description: 'RitoSwap testnet QR.',
      },
      {
        key: 'storybook',
        label: 'Storybook',
        destination: 'https://ui.ritoswap.com',
        cta: 'Scan for RitoSwap Storybook',
        description: 'RitoSwap Storybook QR.',
      },
    ],
  },
  {
    slug: 'ritography',
    title: 'Ritography',
    destination: 'https://ritography.com',
    layout: 'logo-stack',
    colorTheme: 'white',
    imageKey: 'ritography-logo',
    cta: 'Scan for Ritography',
    description: 'Ritography photography and creative work.',
  },
] as const satisfies readonly QrCodeConfig[];

export type QrSlug = (typeof qrCodeProfiles)[number]['slug'];

export const defaultQrSlug = 'site-links' satisfies QrSlug;

export function getQrCodeBySlug(slug: string): QrCodeConfig | undefined {
  return qrCodeProfiles.find((profile) => profile.slug === slug);
}

export function getQrProfilePath(slug: string): string {
  return `/qr/${slug}`;
}

export function getQrCodeProfiles(): readonly QrCodeConfig[] {
  return qrCodeProfiles;
}

export function isQrLayoutKey(value: string): value is QrLayoutKey {
  return QR_LAYOUT_KEYS.includes(value as QrLayoutKey);
}

export function isQrColorThemeKey(value: string): value is QrColorThemeKey {
  return QR_COLOR_THEME_KEYS.includes(value as QrColorThemeKey);
}

export function isQrImageKey(value: string): value is QrImageKey {
  return QR_IMAGE_KEYS.includes(value as QrImageKey);
}
