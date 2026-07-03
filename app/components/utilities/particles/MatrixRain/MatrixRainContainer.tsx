// ./app/components/utilities/particles/MatrixRain/MatrixRainContainer.tsx
'use client';
import React, { useState, useRef, useEffect } from 'react';
import { MatrixRain } from './MatrixRain';
import { MatrixColorPicker } from './ColorPicker';
import { SymbolTypeDropdown } from './SymbolTypeDropdown';
import { Preset } from './symbols';
import styles from './MatrixRainContainer.module.css';

export const MatrixRainContainer: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [color, setColor] = useState('#FC1819');
  const [preset, setPreset] = useState<Preset>('default');
  const [fadeOut, setFadeOut] = useState(false);
  const [textVisible, setTextVisible] = useState(false);

  // Button state
  const [buttonPressed, setButtonPressed] = useState(false);     // immediately on click
  const [buttonDisabled, setButtonDisabled] = useState(false);   // toggles 1s after click

  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    const mobile = window.innerWidth < 768;
    const threshold = mobile ? 0.2 : 0.1;
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTextVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );
    observer.observe(overlay);
    return () => observer.disconnect();
  }, []);

  const handleReveal = () => {
    if (buttonPressed) return;

    setButtonPressed(true);   // start the 1s timer for the button transition
    setFadeOut(true);         // begin overlay fade

    // After 1s: fade button text out + fade secondary-blue bg in + disable interactions
    setTimeout(() => {
      setButtonDisabled(true);
    }, 1000);

    // After 2s: start Matrix rain
    setTimeout(() => {
      setIsActive(true);
    }, 2000);
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>
        Fully Encrypted Access to ERC
      </h3>

      <div className={`${styles.rainBox} ${fadeOut ? styles.fadeBackground : ''}`}>
        {!isActive && (
          <div
            ref={overlayRef}
            className={`${styles.overlay} ${textVisible ? styles.visible : ''} ${fadeOut ? styles.fadeOut : ''}`}
          >
            <p>
              William Entriken wanted payment and commitment before releasing the ERC publicly, but Rito won’t leave you empty-handed.
              <br /><br />
              For a limited time, RIGHT HERE in this window, you get exclusive access to the fully encrypted Universal Asset Signing ERC paper we co-authored.
              <br /><br />
              <em>*Unauthorized screenshots are FORBIDDEN*</em>
            </p>
          </div>
        )}
        {isActive && <MatrixRain color={color} preset={preset} />}
      </div>

      <div className={styles.buttonRow}>
        <button
          type="button"
          onClick={handleReveal}
          className={`${styles.revealButton} ${buttonPressed ? styles.revealButtonPressed : ''} ${buttonDisabled ? styles.revealButtonDisabled : ''}`}
          aria-disabled={buttonDisabled ? 'true' : 'false'}
          disabled={buttonDisabled}
          tabIndex={buttonDisabled ? -1 : 0}
        >
          <span className={styles.revealButtonText}>Reveal Encrypted ERC</span>
        </button>
      </div>

      <div className={styles.controlRow} aria-hidden={buttonDisabled}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontFamily: 'agencyb', color: 'white', fontSize: '14px' }}>
            Encryption Color
          </span>
          <MatrixColorPicker color={color} onChange={setColor} />
        </div>
      </div>

      <div className={styles.controlRow} aria-hidden={buttonDisabled}>
        <SymbolTypeDropdown preset={preset} onChange={setPreset} />
      </div>
    </div>
  );
};
