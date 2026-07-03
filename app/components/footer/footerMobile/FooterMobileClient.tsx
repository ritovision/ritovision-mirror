// ./app/components/footer/footerMobile/FooterMobileClient.tsx
"use client";

import styles from "./FooterMobile.module.css";
import Link from "next/link";
import FooterMenuClient from "@/components/footer/utilities/footerMenu/FooterMenuClient";
import FooterSocialsClient from "../utilities/footerSocials/FooterSocialsClient";
import CobrandClient from "../utilities/cobrands/CobrandClient";
import FooterLegalClient from "../utilities/footerLegal/FooterLegalClient";
import ButtonSection from "@/components/utilities/buttons/ButtonSection";
import OrbImage from "@/components/utilities/media/images/OrbImage";

export default function FooterMobileClient({ children }: { children?: React.ReactNode }) {
  const mobileFooterButtonSection = {
    buttonGroupProps: {
      isSingle: true,
      buttons: [
        {
          variant: "blueAccentButton" as const,
          text: "Inquire Here",
          href: "/contact",
          style: { width: "clamp(150px, 50vw, 300px)" },
        },
      ],
    },
    title: "Want to discuss your project?",
    withBackground: false,
  };

  return (
    <footer className={styles.footer}>
      <Link href="/" className={styles.logoContainer}>
        <OrbImage
          src="/images/brand/ritovision-wordmark-tm.png"
          alt="RitoVision Logo"
          width={400}
          height={100}
          className={styles.logo}
          priority
          fill={false}
        />
      </Link>
      {children}
      <div className={styles.mobileFooterButtonSection}>
        <ButtonSection {...mobileFooterButtonSection} />
      </div>
      <FooterMenuClient />
      <FooterSocialsClient />
      <CobrandClient />
      <FooterLegalClient />
    </footer>
  );
}
