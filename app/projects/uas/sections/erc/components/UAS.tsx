// app\projects\uas\sections\erc\components\UAS.tsx
'use client';

import React from 'react';
import { useInView } from 'react-intersection-observer';
import Button from '@/components/utilities/buttons/Button';
import styles from './UAS.module.css';

const BenefitUnit: React.FC<{ title: string; items: string[] }> = ({ title, items }) => {
  const [ref, inView] = useInView({
    threshold: typeof window !== 'undefined' && window.innerWidth > 730 ? 0.1 : 0.02,
    triggerOnce: true,
  });
  return (
    <div ref={ref} className={`${styles.benefitUnit} ${inView ? styles.fadeIn : ''}`}>
      <h4 className={styles.benefitTitle}>{title}</h4>
      <ul className={styles.benefitList}>
        {items.map((item) => (
          <li key={item} className={styles.benefitItem}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function UAS() {
  return (
    <div id="how-the-erc-solves-it" className={`defaulttopspace ${styles.outer}`}>
      <h3 className={styles.heading}>
        How does the ERC “Universal Asset Signing” Address it?
      </h3>
      <div className={styles.container}>
        <p className={styles.paragraph}>
          At its heart, UAS introduces an <em>ApproveForAllWithSignature</em> function that allows for off-chain signing bypassing the need for an on-chain transaction for sellers to list tokens or for buyers to place bids; the only on-chain transaction takes place when a buyer makes a final purchase. It can be used to extend tokens such as ERC-721/1155/20 or can be used by wrapping them in a UAS-compliant one, including retroactively to work with legacy tokens. Current methods for off-chain approval signing often rely on backdoors that pre-approve specific marketplaces in advance—requiring creators to know, at mint time, every marketplace they might want to support, including those that don’t yet exist. UAS avoids this entirely, introducing no backdoors and requiring no such pre-approvals.
        </p>
        <div className={styles.imageWrapper}>
          <img
            src="/images/pages/projects/uas/uas.png"
            alt="Diagram of Universal Asset Signing (UAS)"
            className={styles.image}
          />
        </div>

        <h3 className={styles.benefitsHeading}>Stakeholder Benefits</h3>
        <div className={styles.benefitsContainer}>
          <BenefitUnit
            title="Creators / Sellers"
            items={[
              'Greater & more diversified NFT visibility for buyers without additional costs',
              'Speed & Efficiency with listing assets by signing (not waiting for a transaction to close)',
              'Competitive pricing (better margins without gas fees)',
              'Enhanced liquidity potential',
            ]}
          />
          <BenefitUnit
            title="Buyers"
            items={[
              'Wider selection of assets',
              'Reduced friction for placing bids across marketplaces',
            ]}
          />
          <BenefitUnit
            title="Smaller Marketplaces"
            items={[
              'Levels the playing field, allowing them to participate in the market and compete with larger MPs',
              'Allows much smaller niches to thrive',
            ]}
          />
          <BenefitUnit
            title="Bigger Marketplaces"
            items={[
              'Larger overall market / audience size',
              'Receiving opportunities from competitors who don’t have moats',
            ]}
          />
          <BenefitUnit
            title="Non-Ethereum / Cross-chain Players"
            items={[
              'Other blockchains get more frictionless access to Ethereum market for additional liquidity',
            ]}
          />
        </div>

        <div className={styles.learnMore}>
          <p className={styles.learnMoreText}>
            To learn more about the adoption strategy and execution efforts, read the narrative accounting
          </p>
          <Button
            text="UAS Chronicles"
            href="#full-narrative-of-erc-journey"
            className={styles.learnMoreButton}
          />
        </div>
      </div>
    </div>
  );
}
