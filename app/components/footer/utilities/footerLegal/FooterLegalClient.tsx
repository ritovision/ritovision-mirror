"use client";

import styles from "./FooterLegal.module.css";
import Link from "next/link";

export default function FooterLegalClient() {
  return (
    <div className={styles.footerLegalContainer}>
      <div className={styles.legalLinks}>
        <Link href="/privacy" className={styles.legalLink}>
          Privacy Policy
        </Link>
        <Link href="/terms" className={styles.legalLink}>
          Terms of Service
        </Link>
      </div>

      <div className={styles.copyright}>RitoVision © 2025</div>

      <div className={styles.siteBuilt}>
        <Link href="https://nextjs.org" target="_blank" rel="noopener noreferrer">
          Site Built by Rito with Next.js
        </Link>
      </div>
    </div>
  );
}
