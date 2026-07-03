import React from 'react';
import Image from 'next/image';
import styles from './CaseStudyCards.module.css';

type CaseStudyCard = {
  title: string;
  description: string;
  href: string;
  logoSrc: string;
  logoAlt: string;
  logoWidth: number;
  logoHeight: number;
};

const caseStudies: CaseStudyCard[] = [
  {
    title: 'Git Case Study',
    description:
      "How Rito made Git's built-in gitweb interface work properly on mobile devices, shipping five merged fixes through Git's mailing-list review process in under a month. The work was later released in Git v2.54.0.",
    href: '/projects/oss/git',
    logoSrc: '/images/pages/projects/oss/logos/git-logo-white.png',
    logoAlt: 'Git logo',
    logoWidth: 40,
    logoHeight: 40,
  },
  {
    title: 'Linux Kernel Mailing List archive (lore.kernel.org) Case Study',
    description:
      'How Rito made the entire Linux Kernel mailing list archive work properly on mobile devices through upstream contributions to Public Inbox, the infrastructure powering lore.kernel.org, while also advocating to leadership for use of his upstream feature.',
    href: '/projects/oss/lkml',
    logoSrc: '/images/pages/projects/oss/logos/linux-white.png',
    logoAlt: 'Linux logo',
    logoWidth: 36,
    logoHeight: 40,
  },
  {
    title: 'OWASP Case Study',
    description:
      "How Rito shipped significant front-end usability improvements across the OWASP ecosystem's web surfaces, with flagship VWAD work spanning legacy rescue, feature delivery, and architectural stewarding.",
    href: '/projects/oss/owasp',
    logoSrc: '/images/pages/projects/oss/logos/owasp-white.png',
    logoAlt: 'OWASP logo',
    logoWidth: 40,
    logoHeight: 40,
  },
  {
    title: 'Ethereum EIPs Case Study',
    description:
      'How Rito audited and rescued systemic mobile layout breakage across the Ethereum EIPs standards site, impacting 100+ pages including foundational standards like ERC-721.',
    href: '/projects/oss/eip',
    logoSrc: '/images/pages/projects/oss/logos/ethereum-white.png',
    logoAlt: 'Ethereum logo',
    logoWidth: 25,
    logoHeight: 40,
  },
];

export default function CaseStudyCards() {
  return (
    <section className={`defaulttopspace ${styles.section}`}>
      <h2 id="oss-case-studies" className={`${styles.header} headingLarge`}>
        OSS Case Studies
      </h2>
      <ul className={styles.list}>
        {caseStudies.map((study) => (
          <li key={study.title} className={styles.item}>
            <a className={styles.cardLink} href={study.href}>
              <p className={styles.description}>
                <strong className={styles.title}>{study.title}</strong>{' '}
                {study.description}
              </p>
              <div className={styles.cardBottom}>
                <span className={styles.linkLabel}>Read case study &rarr;</span>
                <Image
                  src={study.logoSrc}
                  alt={study.logoAlt}
                  width={study.logoWidth}
                  height={study.logoHeight}
                  className={styles.cardLogo}
                />
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
