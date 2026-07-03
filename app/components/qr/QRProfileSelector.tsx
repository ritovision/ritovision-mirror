'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Dropdown from '@/components/utilities/dropdown/Dropdown';
import { QrCodeConfig, getQrProfilePath } from '@/lib/qrCodes';

const QR_HOME_LABEL = 'QR Home';
const QR_HOME_PATH = '/qr';
const CUSTOM_QR_LABEL = 'Custom QR';
const CUSTOM_QR_PATH = '/qr/custom';

type QRProfileSelectorProps = {
  profiles: readonly QrCodeConfig[];
  activeProfile?: QrCodeConfig;
};

export default function QRProfileSelector({
  profiles,
  activeProfile,
}: QRProfileSelectorProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isQrHome = pathname === QR_HOME_PATH || pathname === `${QR_HOME_PATH}/`;
  const isCustomQr =
    pathname === CUSTOM_QR_PATH || pathname === `${CUSTOM_QR_PATH}/`;
  const profileLabels = [
    QR_HOME_LABEL,
    ...profiles.flatMap((profile) =>
      profile.slug === 'contact-card'
        ? [profile.title, CUSTOM_QR_LABEL]
        : [profile.title]
    ),
  ];
  const dropdownItems = profileLabels.includes(CUSTOM_QR_LABEL)
    ? profileLabels
    : [QR_HOME_LABEL, CUSTOM_QR_LABEL, ...profiles.map((profile) => profile.title)];
  const selectedValue = isQrHome
    ? QR_HOME_LABEL
    : isCustomQr
      ? CUSTOM_QR_LABEL
      : activeProfile?.title;

  return (
    <Dropdown
      headerText="QR Profile"
      label="Choose QR"
      items={dropdownItems}
      selectedValue={selectedValue}
      onChange={(selectedTitle) => {
        if (selectedTitle === QR_HOME_LABEL) {
          router.push(QR_HOME_PATH);
          return;
        }

        if (selectedTitle === CUSTOM_QR_LABEL) {
          router.push(CUSTOM_QR_PATH);
          return;
        }

        const selectedProfile = profiles.find(
          (profile) => profile.title === selectedTitle
        );

        if (selectedProfile) {
          router.push(getQrProfilePath(selectedProfile.slug));
        }
      }}
    />
  );
}
