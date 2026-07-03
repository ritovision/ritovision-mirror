// ./app/components/footer/footerDesktop/FooterDesktopClient.tsx
"use client";

import styles from "./FooterDesktop.module.css";
import Link from "next/link";
import FooterMenuClient from "@/components/footer/utilities/footerMenu/FooterMenuClient";
import FooterSocialsClient from "../utilities/footerSocials/FooterSocialsClient";
import CobrandClient from "../utilities/cobrands/CobrandClient";
import FooterLegalClient from "../utilities/footerLegal/FooterLegalClient";
import ButtonSection from "@/components/utilities/buttons/ButtonSection";
import OrbImage from "@/components/utilities/media/images/OrbImage";

interface FooterDesktopClientProps {
  rightMenuContent?: React.ReactNode;
}

export default function FooterDesktopClient({ rightMenuContent }: FooterDesktopClientProps) {
  const footerButtonSection = {
    buttonGroupProps: {
      isSingle: true,
      buttons: [
        {
          variant: "blueAccentButton" as const,
          text: "Inquire Here",
          href: "/contact",
          style: { width: "clamp(200px, 40vw, 320px)" },
        },
      ],
    },
    title: "Want to discuss your project?",
    withBackground: false,
  };

  return (
    <section className={styles.footer} aria-label="RitoVision desktop footer">
      <div className={styles.topRow}>
        <Link href="/" className={styles.logoMarkWrapper}>
          <OrbImage
            src="/images/brand/logomark-ritovision.png"
            alt="RitoVision Logomark"
            width={100}
            height={100}
            className={styles.logoMark}
            priority
            fill={false}
          />
        </Link>

        <Link href="/" className={styles.wordmarkLink}>
          <OrbImage
            src="/images/brand/ritovision-wordmark-tm.png"
            alt="RitoVision Wordmark"
            width={350}
            height={100}
            className={styles.wordmark}
            containerClassName={styles.wordmarkContainer}
            priority
            fill={false}
          />
        </Link>

        <div className={styles.footerSocialsInline}>
          <FooterSocialsClient />
        </div>
      </div>

      <div className={styles.footerButtonSection}>
        <ButtonSection {...footerButtonSection} />
      </div>

      <div className={styles.footerMenuRow}>
        <div className={styles.footerMenuColumn}>
          <FooterMenuClient />
        </div>

        <div className={styles.footerMenuColumn}>
          {rightMenuContent || <FooterMenuClient />}
        </div>
      </div>

      <div className={styles.coBrands}>
        <CobrandClient />
      </div>

      <div className={styles.footerLegal}>
        <FooterLegalClient />
      </div>
    </section>
  );
}
