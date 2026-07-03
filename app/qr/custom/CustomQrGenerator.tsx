'use client';

import React from 'react';
import QRControlsToggle from '@/components/qr/QRControlsToggle';
import QRProfileSelector from '@/components/qr/QRProfileSelector';
import QRCodeVisual from '@/components/qr/QRCodeVisual';
import StaticOrbs from '@/components/utilities/particles/StaticOrbs';
import { QrCodeConfig, qrColorThemes } from '@/lib/qrCodes';
import styles from './CustomQrGenerator.module.css';

const defaultUri = 'https://ritovision.com';
const defaultHeading = 'Custom QR';
const uriStorageKey = 'ritovision:custom-qr-uri:v1';
const headingStorageKey = 'ritovision:custom-qr-heading:v1';

type CustomQrGeneratorProps = {
  profiles: readonly QrCodeConfig[];
};

export default function CustomQrGenerator({ profiles }: CustomQrGeneratorProps) {
  const [inputValue, setInputValue] = React.useState(defaultUri);
  const [qrValue, setQrValue] = React.useState(defaultUri);
  const [headingInput, setHeadingInput] = React.useState(defaultHeading);
  const [heading, setHeading] = React.useState(defaultHeading);
  const [controlsOpen, setControlsOpen] = React.useState(false);
  const controlsId = 'custom-qr-controls-panel';

  React.useEffect(() => {
    const storedValue = window.localStorage.getItem(uriStorageKey)?.trim();
    const storedHeading = window.localStorage
      .getItem(headingStorageKey)
      ?.trim();

    if (storedValue) {
      setInputValue(storedValue);
      setQrValue(storedValue);
    }

    if (storedHeading) {
      setHeadingInput(storedHeading);
      setHeading(storedHeading);
    }

  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedValue = inputValue.trim();
    const trimmedHeading = headingInput.trim() || defaultHeading;

    if (trimmedValue) {
      setQrValue(trimmedValue);
      window.localStorage.setItem(uriStorageKey, trimmedValue);
    }

    setHeading(trimmedHeading);
    setHeadingInput(trimmedHeading);
    window.localStorage.setItem(headingStorageKey, trimmedHeading);
  };

  return (
    <main className={styles.page}>
      <StaticOrbs />

      <div className={styles.content}>
        <div className={styles.profileControls}>
          <div className={styles.profileSelector}>
            <QRProfileSelector profiles={profiles} />
          </div>
          <QRControlsToggle
            expanded={controlsOpen}
            controlsId={controlsId}
            onToggle={() => setControlsOpen((current) => !current)}
          />
        </div>

        <section className={styles.card} aria-labelledby="custom-qr-title">
          <p className={styles.kicker}>RitoVision</p>
          <h1 className={styles.title} id="custom-qr-title">
            {heading}
          </h1>

          <QRCodeVisual
            value={qrValue}
            title={`${heading} QR`}
            colorTheme={qrColorThemes.white}
          />

          <p className={styles.destination}>{qrValue}</p>
        </section>

        {controlsOpen && (
          <section
            className={styles.settingsPanel}
            id={controlsId}
            aria-label="Custom QR settings"
          >
            <form className={styles.form} onSubmit={handleSubmit}>
              <label className={styles.label} htmlFor="custom-heading">
                Heading
              </label>
              <input
                id="custom-heading"
                className={styles.input}
                type="text"
                value={headingInput}
                onChange={(event) => setHeadingInput(event.target.value)}
                placeholder="Custom QR"
              />

              <label className={styles.label} htmlFor="custom-uri">
                URI
              </label>
              <input
                id="custom-uri"
                className={styles.input}
                type="text"
                inputMode="url"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                placeholder="https://ritovision.com"
              />

              <button className={styles.button} type="submit">
                Update
              </button>
            </form>
          </section>
        )}
      </div>
    </main>
  );
}
