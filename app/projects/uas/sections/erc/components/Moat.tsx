// app\projects\uas\sections\erc\components\Moat.tsx
'use client';

import React from 'react';
import { useInView } from 'react-intersection-observer';
import MoatGraph from './MoatGraph';
import styles from './Moat.module.css';

const ConsequenceItem: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ref, inView] = useInView({
    threshold: typeof window !== 'undefined' && window.innerWidth > 730 ? 0.1 : 0.02,
    triggerOnce: true,
  });
  return (
    <li ref={ref} className={`${styles.bullet} ${inView ? styles.fadeIn : ''}`}>
      <p className={styles.paragraph}>{children}</p>
    </li>
  );
};

export default function Moat() {
  return (
    <div id="problem-to-address" className={`defaulttopspace ${styles.outer}`}>
      <h2 className={styles.heading}>
        Breakdown of Universal Asset Signing / ERC
      </h2>
      <div className={styles.container}>
        <h3 className={styles.subheading}>
          What problem was being addressed?
        </h3>
        <p className={styles.paragraph}>
          When NFTs on Ethereum are minted on a specific marketplace, that NFT can be listed gas-free there using just a signature.
        </p>
        <p className={styles.paragraph}>
          Listing that same NFT on other marketplaces requires separate on-chain transactions with gas fees for each one.
        </p>
        <p className={styles.and}>AND</p>
        <p className={styles.paragraph}>
          Buyers interested in placing bids on NFTs must pay a transaction fee per marketplace.
        </p>
        <p className={styles.paragraph}>
          This creates a cost barrier for smaller marketplaces and consolidates power with large ones. This barrier is referred to as the Mint-Moat Effect.
        </p>

        <div className={styles.graphWrapper}>
          <MoatGraph />
        </div>

        <h3 className={styles.graphTitle}>
          The Mint-Moat Effect
        </h3>
        <p className={styles.paragraph}>
          This creates a systemic inefficiency that hampers the broader crypto economy with Ethereum as a key hub of cross-chain asset commerce. It stifles competition and innovation not only among marketplaces but it also limits creators', sellers' and buyers' options, leading to reduced market liquidity and higher barriers to entry. Despite the short-term advantages, it is also a net negative for larger marketplaces because the overall market size is inhibited and cross-chain liquidity is constrained.
        </p>

        <h3 className={styles.consequencesHeading}>
          Consequences
        </h3>
        <ul className={styles.consequencesList}>
          <ConsequenceItem>Barrier to Entry for Smaller Marketplaces</ConsequenceItem>
          <ConsequenceItem>Amplifies the ‘Winner-Takes-All’ Network Effect for Larger Marketplaces</ConsequenceItem>
          <ConsequenceItem>Reduced Marketplace Diversity & Asset Diversity</ConsequenceItem>
          <ConsequenceItem>Disincentivized Competitive Pricing</ConsequenceItem>
          <ConsequenceItem>Significantly Limited Exposure for Sellers</ConsequenceItem>
          <ConsequenceItem>Lower Margins for Sellers Seeking Greater Visibility for NFTs</ConsequenceItem>
          <ConsequenceItem>Reduces Potential Asset Liquidity Overall</ConsequenceItem>
          <ConsequenceItem>Environmental Impact (for processing transactions)</ConsequenceItem>
        </ul>
      </div>
    </div>
  );
}
