import { describe, expect, it } from 'vitest';
import {
  QR_LAYOUT_KEYS,
  defaultQrSlug,
  getQrCodeBySlug,
  qrCodeProfiles,
  qrColorThemes,
  qrImageOptions,
  type QrCodeConfig,
} from '@/lib/qrCodes';

const profiles: readonly QrCodeConfig[] = qrCodeProfiles;

describe('qrCodeProfiles', () => {
  it('has a default profile', () => {
    expect(getQrCodeBySlug(defaultQrSlug)).toBeDefined();
  });

  it('uses unique slugs', () => {
    const slugs = profiles.map((profile) => profile.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('uses absolute destinations for scanning', () => {
    for (const profile of profiles) {
      expect(() => new URL(profile.destination)).not.toThrow();

      for (const option of profile.destinationOptions ?? []) {
        expect(() => new URL(option.destination)).not.toThrow();
      }
    }
  });

  it('references supported layouts, colors, and images', () => {
    for (const profile of profiles) {
      expect(QR_LAYOUT_KEYS).toContain(profile.layout);
      expect(qrColorThemes[profile.colorTheme]).toBeDefined();
      expect(qrImageOptions[profile.imageKey]).toBeDefined();
    }
  });

  it('uses unique destination option keys per profile', () => {
    for (const profile of profiles) {
      const optionKeys = profile.destinationOptions?.map((option) => option.key);
      if (!optionKeys) continue;

      expect(new Set(optionKeys).size).toBe(optionKeys.length);
    }
  });
});
