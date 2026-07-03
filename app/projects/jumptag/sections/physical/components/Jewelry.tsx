// \test\app\projects\jumptag\sections\physical\components\Jewelry.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import styles from './Jewelry.module.css';

export default function Jewelry() {
  return (
    <div className={styles.wrapper}>
      <h3 id="jewelry-design-production" className={styles.title}>
        Jewelry Design and Production
      </h3>

      <p className={styles.text}>
        The physical foundation of Jumptag Club lay in the jewelry itself—custom-designed wearable tags that fused utility with a distinct, fashion-forward edge. Rito led the creative direction for these pieces, working closely with manufacturers to bring his specifications and concepts to life. The collaboration involved not just design mockups, but in-depth communication about materials, durability, and finish—bridging the aesthetic vision with industrial feasibility.
      </p>

      <div className={styles.imageContainer}>
        <Image
          src="/images/pages/projects/jumptag/jewelry/jumptags.jpg"
          alt="Two Jumptags in opened boxes"
          width={1000}
          height={600}
          className={styles.image}
        />
        <p className={styles.caption}>
          Two Jumptags in opened boxes
        </p>
      </div>

      <p className={styles.text}>
        Through this process, Rito gained firsthand experience in aspects of metallurgy and jewelry manufacturing, learning how different alloys responded to plating, how certain metals affected shine and durability, and how purity levels could influence wearability—especially in terms of skin sensitivity or tarnish over time. These insights informed decisions about which materials to use, what finishes to avoid, and how to optimize the tags for both looks and longevity.
      </p>

      <p className={styles.text}>
        Beyond coordination, Rito also stepped into the hands-on side of production. Using jewelry tools and materials procured specifically for testing and experimentation, he manually assembled, arranged, and tested various tag configurations with different chains, clasps, rings, and bracelet connectors. This process involved both visual experimentation and physical prototyping, assessing weight, bendability, and overall wear comfort.
      </p>

      <p className={styles.text}>
        But it wasn’t just about style—it was also a deep exercise in user experience design. Every wearable variation was evaluated for how it behaved during actual use:
      </p>

      <ul className={styles.list}>
        <li>How easily the tag could rotate, allowing users to conceal the QR code when desired</li>
        <li>The ergonomics of wearing it as a necklace versus a bracelet</li>
        <li>The scannability of the code under various lighting conditions, including how high-shine finishes could cause reflection issues in direct sunlight</li>
        <li>How the piece aged over time, with attention to wear and tear, smudging, and surface integrity</li>
      </ul>

      <p className={styles.text}>
        These considerations helped ensure that Jumptags weren’t just visually compelling—they were intentionally designed for real-world usage. Every detail, from the angle at which a QR code could be scanned, to how discreetly it could be worn in public, was part of a larger effort to create a seamless, fashion-aligned UX layer built into the jewelry itself.
      </p>
    </div>
  );
}
