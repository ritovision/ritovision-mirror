"use client";

import styles from "./FooterSocials.module.css";
import Image from "next/image";
import Link from "next/link";

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/rito-matt-j-pellerito-36779084/",
    src: "/images/utilities/socials/linkedin-white.png",
  },
  {
    name: "Twitter",
    href: "https://x.com/rito_rhymes",
    src: "/images/utilities/socials/twitter-white.png",
  },
  {
    name: "Instagram",
    href: "https://instagram.com/ritorhymes",
    src: "/images/utilities/socials/instagram-white.png",
  },
  {
    name: "GitHub",
    href: "https://github.com/ritovision",
    src: "/images/utilities/socials/github-white.png",
  },
];

export default function FooterSocialsClient() {
  return (
    <div className={styles.footerSocialsContainer}>
      <div className={styles.socialsGrid}>
        {socialLinks.map((social) => (
          <Link
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            <div className={styles.socialIconWrapper}>
              <Image
                src={social.src}
                alt={social.name}
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
          </Link>
        ))}
      </div>
      <p className={styles.socialsText}>Socials</p>
    </div>
  );
}
