// ./app/components/footer/utilities/cobrands/CobrandClient.tsx
"use client";

import styles from "./Cobrand.module.css";
import Link from "next/link";
import OrbImage from "@/components/utilities/media/images/OrbImage";

export default function CobrandClient() {
  return (
    <div className={styles.cobrandContainer}>
      <h3 className={styles.cobrandTitle}>Co-Brands</h3>
      <div className={styles.cobrandWrapper}>
        <Link href="https://ritography.com" target="_blank" rel="noopener noreferrer" className={styles.cobrandLink}>
          <OrbImage
            src="/images/brand/cobrands/ritography-logo.png"
            alt="Ritography"
            width={300}
            height={150}
            className={`${styles.cobrandImage} ${styles.ritography}`}
            containerClassName={styles.cobrandImageContainer}
            fill={false}
            sizes="(max-width: 730px) 80vw, 300px"
          />
        </Link>
        <Link href="https://ritorhymes.com" target="_blank" rel="noopener noreferrer" className={styles.cobrandLink}>
          <OrbImage
            src="/images/brand/cobrands/RitoRhymes-logo.png"
            alt="RitoRhymes"
            width={200}
            height={200}
            className={`${styles.cobrandImage} ${styles.ritorhymes}`}
            containerClassName={styles.cobrandImageContainer}
            fill={false}
            sizes="(max-width: 730px) 60vw, 200px"
          />
        </Link>
      </div>
    </div>
  );
}
