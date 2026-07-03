'use client';

import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { QrColorTheme } from '@/lib/qrCodes';
import styles from './QRExperience.module.css';

type QRCodeVisualProps = {
  value: string;
  title: string;
  colorTheme: QrColorTheme;
};

export default function QRCodeVisual({
  value,
  title,
  colorTheme,
}: QRCodeVisualProps) {
  return (
    <div
      className={[
        styles.qrFrame,
        colorTheme.frame === 'white' ? styles.qrFrameWhite : styles.qrFrameBlue,
      ].join(' ')}
      data-testid="qr-frame"
    >
      <QRCodeSVG
        value={value}
        title={title}
        size={256}
        level="H"
        marginSize={4}
        fgColor={colorTheme.fgColor}
        bgColor={colorTheme.bgColor}
        className={styles.qrCode}
      />
    </div>
  );
}
