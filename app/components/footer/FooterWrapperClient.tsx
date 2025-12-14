"use client";

import type { ReactNode } from "react";
import styles from "./FooterWrapper.module.css";

interface FooterWrapperClientProps {
  mobileFooter: ReactNode;
  desktopFooter: ReactNode;
}

export default function FooterWrapperClient({
  mobileFooter,
  desktopFooter,
}: FooterWrapperClientProps) {
  return (
    <div className={styles.wrapper} data-footer-wrapper>
      <div className={styles.mobileContainer}>
        {mobileFooter}
      </div>
      <div className={styles.desktopContainer}>
        {desktopFooter}
      </div>
    </div>
  );
}
