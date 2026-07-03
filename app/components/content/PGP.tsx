'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { BigAccordion } from '@/components/utilities/accordion/BigAccordion';
import styles from './PGP.module.css';

const fingerprintText =
  '702F F5FD 95ED 2C77 38EA  4C14 4107 AE68 68ED B784';
const publicKeyPath = '/.well-known/ritovision-publickey.asc';
const publicKeyViewPath = '/.well-known/ritovision-publickey.txt';
const proofPath = '/.well-known/security.txt';
const copyResetDelayMs = 1800;

const PGP: React.FC = () => {
  const [copyLabel, setCopyLabel] = useState('Copy');
  const timeoutRef = useRef<number | null>(null);

  const resetCopyLabel = useCallback(() => {
    setCopyLabel('Copy');
  }, []);

  const setCopyState = useCallback(
    (nextLabel: string) => {
      setCopyLabel(nextLabel);
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = window.setTimeout(resetCopyLabel, copyResetDelayMs);
    },
    [resetCopyLabel]
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCopy = useCallback(async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(fingerprintText);
        setCopyState('Copied!');
        return;
      }

      const textArea = document.createElement('textarea');
      textArea.value = fingerprintText;
      textArea.setAttribute('readonly', 'true');
      textArea.style.position = 'absolute';
      textArea.style.left = '-9999px';
      document.body.appendChild(textArea);
      textArea.select();
      const success = document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopyState(success ? 'Copied!' : 'Failed.');
    } catch (error) {
      setCopyState('Failed.');
    }
  }, [setCopyState]);

  return (
    <section className={styles.pgpSection}>
      <div className={styles.accordionWrapper}>
        <BigAccordion
          contentPadding={0}
          items={[
            {
              title: 'RitoVision PGP',
              value: 'ritovision-pgp',
              content: (
                <div className={styles.tableWrapper}>
                  <table className={styles.table}>
                    <colgroup>
                      <col />
                      <col className={styles.actionColumn} />
                      <col />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th scope="row" className={styles.labelCell}>
                          Fingerprint
                        </th>
                        <td className={styles.actionCell}>
                          <button
                            type="button"
                            className={styles.actionButton}
                            onClick={handleCopy}
                            aria-live="polite"
                          >
                            {copyLabel}
                          </button>
                        </td>
                        <td className={styles.valueCell}>
                          <pre className={styles.fingerprint}>
                            {fingerprintText}
                          </pre>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row" className={styles.labelCell}>
                          Public Key
                        </th>
                        <td className={styles.actionCell}>
                          <a
                            className={styles.actionLink}
                            href={publicKeyViewPath}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View
                          </a>
                        </td>
                        <td className={styles.actionCell}>
                          <a
                            className={styles.actionLink}
                            href={publicKeyPath}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Download
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row" className={styles.labelCell}>
                          Proof
                        </th>
                        <td className={styles.actionCell}>
                          <a
                            className={styles.actionLink}
                            href={proofPath}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View
                          </a>
                        </td>
                        <td className={styles.actionCell}>
                          <a
                            className={styles.actionLink}
                            href={proofPath}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Download
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ),
            },
          ]}
        />
      </div>
    </section>
  );
};

export default PGP;
