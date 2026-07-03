import React from 'react';
import styles from './WebsiteTable.module.css';

export default function WebsiteTable() {
  return (
    <div id="website-comparison" className={`${styles.wrapper} defaulttopspace defaultbottomspace`}>
      <h3 className={styles.heading}>Complementary Platforms</h3>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <colgroup>
            <col className={styles.colLabel}/>
            <col className={styles.colMain}/>
            <col className={styles.colMain}/>
          </colgroup>
          <thead>
            <tr><th className={styles.cellHeader}></th><th className={styles.cellHeader}>Phor.net</th><th className={styles.cellHeader}>WilliamEntriken.net</th></tr>
          </thead>
          <tbody>
            <tr><td className={styles.cellLabel}><p>Target</p></td><td className={styles.cell}><p>Primarily technical audiences; industry insiders; peers in blockchain, cybersecurity, open-source communities</p></td><td className={styles.cell}><p>Mainstream non-technical audiences / general public; journalists; potential collaborators; event managers</p></td></tr>
            <tr><td className={styles.cellLabel}><p>Design</p></td><td className={styles.cell}><p>Structured but casual, blog-esq "living document" feel; prioritizes authenticity and immediacy</p></td><td className={styles.cell}><p>Structured, polished, future-proofed, brand-aligned visual identity; designed for ease of navigation and authority signaling</p></td></tr>
            <tr><td className={styles.cellLabel}><p>Tone</p></td><td className={styles.cell}><p>Mix content of professional and serious verses informal and introspective; reflects personal voice more closely</p></td><td className={styles.cell}><p>Professional, curated, accessible; designed to introduce and validate William's multi-dimensional authority for broader audiences</p></td></tr>
            <tr><td className={styles.cellLabel}><p>Purpose</p></td><td className={styles.cell}><p>Professional portfolio; blog</p></td><td className={styles.cell}><p>Brand platform and legacy archive; evergreen authority anchor; supports structured discovery; press coverage; vehicle for future campaigns </p></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
