'use client';

import React from 'react';
import styles from './Wikipedia.module.css';

export default function Wikipedia() {
  return (
    <div id="wikipedia" className={`${styles.wrapper} defaulttopspace`}>

      {/* Intro section */}
      <div>
        <h2 className={styles.title}>Wikipedia</h2>
        <p className={styles.paragraph}>
          William Entriken’s public profile is complemented by a dedicated Wikipedia page, along with notable mentions across other entries — including references in the Civic Hacker page, the NFT history section, and the Ethereum page citing ERC-721.
        </p>
        <p className={styles.paragraph}>
          These entries document key aspects of William’s career and contributions, providing neutral, encyclopedic validation drawn from secondary sources.
        </p>
      </div>

      {/* Audience Perception and Brand Impact */}
      <div className={styles.redHeading}>Audience Perception and Brand Impact</div>

      <div className={styles.leftHeading}>Credibility Enhancement</div>
      <p className={styles.leftText}>
        Wikipedia’s prominence in search results and its perceived neutrality offer casual audiences, journalists, and researchers quick access to independently documented milestones, naturally reinforcing general awareness of William’s impact.
      </p>

      <div className={styles.leftHeading}>Reduced Educational Burden</div>
      <p className={styles.leftText}>
        For audiences unfamiliar with blockchain standards or civic hacking, the presence of Wikipedia entries helps lessen the educational burden on official brand assets by providing basic contextual information.
      </p>

      {/* Strategic Insight */}
      <div className={styles.redHeading}>Strategic Insight</div>
      <p className={styles.leftText}>
        While Wikipedia coverage offers supplementary credibility, it is not integrated into the formal brand positioning developed for WilliamEntriken.net. Unlike controlled platforms, Wikipedia content evolves independently — striving for neutrality rather than championing William’s identity, achievements, or narrative focus. While some current elements of William’s Wikipedia presence incidentally align with the brand themes developed here, such overlap is circumstantial and may diverge over time.
      </p>
      <p className={styles.leftText}>
        Given Wikipedia’s open-editing model, the page represents a passive authority asset accompanied by long-term volatility risk:
      </p>

      <ul className={styles.bulletList}>
        <li>
          Content emphasis, tone, or framing may shift unpredictably due to editorial dynamics, new developments, or external events.
        </li>
        <li>
          Future additions — whether positive achievements, controversies, or even vandalism — could materially impact the narrative without warning.
        </li>
        <li>
          Wikipedia’s neutrality policies limit its potential value for authority signaling or thematic storytelling as any such aggrandizing edits by contributors would likely be rewritten to conform to a neutral point of view.
        </li>
      </ul>

      <div className={styles.redHeading}>Summary</div>
      <p className={styles.leftText}>
        Accordingly, Wikipedia is acknowledged in strategic awareness as an external, unpredictable variable that may incidentally amplify or detract from broader brand perception.
      </p>

    </div>
  );
}
