// app/styles/page.tsx

import { redirectIfProd } from 'lib/pages/redirectIfProd';
import React from 'react';
import Button from '../components/utilities/buttons/Button';
import ButtonSection from '../components/utilities/buttons/ButtonSection';
import { oneButtonBlueSection, twoButtonsBlueSection } from '../components/utilities/buttons/presets';
import { ButtonProps } from '../components/utilities/buttons/Button';
import styles from './styles.module.css';

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

// Customized preset for two buttons (unchanged)
const customizedTwoButtonsSection = {
  ...twoButtonsBlueSection,
  buttonGroupProps: {
    ...twoButtonsBlueSection.buttonGroupProps,
    buttons: twoButtonsBlueSection.buttonGroupProps.buttons.map(
      (btn, i): Omit<ButtonProps, 'action'> => ({
        ...btn,
        text: i === 0 ? 'Custom Learn More' : 'Custom Inquire Here',
      })
    ),
  },
  title: 'Customized Two Buttons Section',
};

// Custom inline section with a red background (unchanged)
const customSection = {
  buttonGroupProps: {
    isSingle: false,
    buttons: [
      { variant: 'redButton', text: 'Red Action', href: '/red' },
      { variant: 'blueAccentButton', text: 'Black Action', href: '/black' },
    ] as Omit<ButtonProps, 'action'>[],
  },
  title: 'Custom Section with Red Background!',
  withBackground: true,
  backgroundColor: 'black',
  textColor: 'white',
};

// NEW: Customized one-button preset with inline style overrides.
// We add a custom className ("customOne") to target inline.
const customizedOneButtonSection = {
  ...oneButtonBlueSection,
  title: 'this is a test preset',
  className: 'customOne', // This class will be used to apply inline overrides.
};

// List all variants for a simple grid demo.
const variants = [
  'blueAccentButton',
  'redButton',
  'blackAndRedButton',
  'blackButton',
  'blackButton2',
  'blueAccentButton2',
  'redButton2',
  'whiteAndRedButton',
  'whiteAndRedButton2',
] as const;

export default function DemoPage() {
  redirectIfProd();

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <h1>Button & Section Demo</h1>
        
        {/* Inline style override using a plain style tag */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              /* Target the title within our custom one-button section */
              .customOne h1 {
                font-size: clamp(9px, 1.5vw, 12px) !important;
              }
              /* Target the container wrapping each button inside ButtonSection's .button-group */
              .customOne .button-group > div {
                width: 100% !important;
              }
                .customOne button {
  width: 400px !important;
  justify-self: center;
  margin: 0 auto;
}

            `,
          }}
        />
        
        {/* Section: Grid of individual button variants */}
        <section className={styles.section}>
          <h2>All Button Variants</h2>
          <div className={styles.buttonGrid}>
            {variants.map((variant) => (
              <div key={variant} className={styles.buttonWrapper}>
                <Button variant={variant} text={variant} />
              </div>
            ))}
          </div>
        </section>
        
        {/* Section: Preset with one button using the original oneButtonBlueSection
            Here we use our customized preset with inline overrides */}
        <section className={styles.section}>
          <ButtonSection {...customizedOneButtonSection} />
        </section>
        
        {/* Section: Customized preset with two buttons */}
        <section className={styles.section}>
          <ButtonSection {...customizedTwoButtonsSection} />
        </section>
        
        {/* Section: Inline custom section with custom background and title */}
        <section className={styles.section}>
          <ButtonSection {...customSection} />
        </section>
        
      </div>
    </main>
  );
}
