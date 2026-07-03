// app\projects\uas\sections\narrative\IntroNarrative.tsx
import React from 'react';
import styles from './IntroNarrative.module.css';

export default function IntroNarrative() {
  return (
    <div id="full-narrative-of-erc-journey" className={styles.wrapper}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>The UAS Chronicles</h2>
        <h3 className={styles.subtitle}>The Story of Adoption &amp; its Challenges</h3>
        <p className={styles.text}>
          The UAS Chronicles below is a long-form narrative accounting documenting Rito’s journey co-authoring and advocating for Universal Asset Signing (UAS), a new Ethereum application-layer standard, in partnership and close collaboration with William Entriken—the lead author of ERC-721 (the first mainstream NFT standard that formalized the term "NFT") and a foundational pioneer in the NFT space.
          <br />
        </p>
        <p className={styles.text}>
          This series offers a rare, behind-the-scenes look at the complex process of driving ERC adoption within the Ethereum ecosystem. It explores the nuanced reality of aligning diverse stakeholders—developers, DAOs, governance bodies, and corporate leadership—toward a common technical and strategic goal.
          <br />
        </p>
        <p className={styles.text}>
          Structured into individual chapters, each entry provides a focused account of critical phases in the standard’s development, community engagement, and adoption efforts. These are not casual write-ups; each chapter is being meticulously crafted to reflect the depth and complexity of the work involved. While some chapters are currently available, the full narrative is still in progress and will be published over time.
          <br />
        </p>
        <p className={styles.text}>
          Readers can expect a transparent, strategic, and experiential deep dive into the challenges and breakthroughs of innovating in a decentralized environment.
          <br />
        </p>
      </div>
    </div>
  );
}
