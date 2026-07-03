import React from 'react';
import Link from 'next/link';
import StaticOrbs from '@/components/utilities/particles/StaticOrbs';
import OrbImage from '@/components/utilities/media/images/OrbImage';
import styles from './ConnectLinkTree.module.css';

type ConnectLink = {
  label: string;
  href: string;
  icon?: 'contacts' | 'email' | 'github' | 'linkedin';
  download?: string;
  external?: boolean;
  isRitoRhymes?: boolean;
};

type SocialLink = {
  name: string;
  href: string;
  src?: string;
  icon?: 'telegram';
};

const connectLinks: ConnectLink[] = [
  {
    label: 'Add to Contacts',
    href: '/contact/ritovision.vcf',
    icon: 'contacts',
    download: 'RitoVision.vcf',
  },
  {
    label: 'Email',
    href: 'mailto:connect@ritovision.com',
    icon: 'email',
  },
  {
    label: 'Booking',
    href: '/contact',
  },
  {
    label: 'Case Studies',
    href: '/projects',
  },
  {
    label: 'Services',
    href: '/services',
  },
  {
    label: 'One-pager',
    href: '/docs/one-pager.pdf',
    download: 'one-pager.pdf',
  },
  {
    label: 'Press',
    href: '/press',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/ritorhymes/',
    icon: 'linkedin',
    external: true,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/ritovision',
    icon: 'github',
    external: true,
  },
  {
    label: 'Rito Rhymes',
    href: 'https://ritorhymes.com',
    external: true,
    isRitoRhymes: true,
  },
];

const socialLinks: SocialLink[] = [
  {
    name: 'Twitter',
    href: 'https://x.com/rito_rhymes',
    src: '/images/utilities/socials/twitter-white.png',
  },
  {
    name: 'Telegram',
    href: 'https://t.me/RitoRhymes',
    icon: 'telegram',
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/ritorhymes',
    src: '/images/utilities/socials/instagram-white.png',
  },
];

function classNames(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ');
}

function ButtonIcon({ type }: { type: NonNullable<ConnectLink['icon']> }) {
  if (type === 'github') {
    return (
      <span className={styles.buttonImageIcon} aria-hidden>
        <OrbImage
          src="/images/utilities/socials/github-white.png"
          alt=""
          fill
          sizes="22px"
          className={styles.buttonImage}
        />
      </span>
    );
  }

  if (type === 'linkedin') {
    return (
      <span className={styles.buttonImageIcon} aria-hidden>
        <OrbImage
          src="/images/utilities/socials/linkedin-white.png"
          alt=""
          fill
          sizes="22px"
          className={styles.buttonImage}
        />
      </span>
    );
  }

  if (type === 'email') {
    return (
      <svg
        className={styles.buttonSvgIcon}
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M4 6.5h16v11H4z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="m4.8 7.2 7.2 5.3 7.2-5.3"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg
      className={styles.buttonSvgIcon}
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M4.5 5.5h11v13h-11z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M8 11.1a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M7 16c.8-1.3 1.8-2 3-2s2.2.7 3 2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M18 9v6M15 12h6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ButtonContents({ item }: { item: ConnectLink }) {
  return (
    <span className={styles.buttonContent}>
      {item.icon && <ButtonIcon type={item.icon} />}
      <span>{item.label}</span>
    </span>
  );
}

function ConnectButton({ item }: { item: ConnectLink }) {
  const className = classNames(
    styles.connectButton,
    item.isRitoRhymes && styles.ritoRhymes
  );

  if (item.external || item.download || item.href.startsWith('mailto:')) {
    return (
      <a
        className={className}
        href={item.href}
        download={item.download}
        target={item.external ? '_blank' : undefined}
        rel={item.external ? 'noopener noreferrer' : undefined}
      >
        <ButtonContents item={item} />
      </a>
    );
  }

  return (
    <Link className={className} href={item.href}>
      <ButtonContents item={item} />
    </Link>
  );
}

function SocialIcon({ social }: { social: SocialLink }) {
  if (social.icon === 'telegram') {
    return (
      <svg
        className={styles.telegramIcon}
        aria-hidden="true"
        viewBox="0 0 24 24"
      >
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    );
  }

  return (
    <OrbImage
      src={social.src ?? ''}
      alt=""
      fill
      sizes="28px"
      className={styles.socialImage}
    />
  );
}

export default function ConnectLinkTree() {
  return (
    <main className={styles.page}>
      <StaticOrbs className={styles.orbField} />

      <section className={styles.content} aria-labelledby="connect-title">
        <div className={styles.header}>
          <h1 className={styles.title} id="connect-title">
            Connect
          </h1>
          <div className={styles.portrait}>
            <OrbImage
              src="/images/home/intro/Rito-CEO.png"
              alt="Rito"
              fill
              sizes="(max-width: 420px) 72vw, 350px"
              radius="var(--border-radius-standard)"
              className={styles.portraitImage}
              showOrbs={false}
            />
          </div>
          <h2 className={styles.role}>
            Cross-Functional Chief Product Officer, UX Leader & Full-Stack Engineer
          </h2>
          <p className={styles.positioning}>
            De-risking{' '}
            <span className={styles.redText}>
              high-ambiguity user-facing systems
            </span>{' '}
            by unifying Product, Brand, UX and Engineering.
          </p>
        </div>

        <nav className={styles.linkStack} aria-label="RitoVision links">
          {connectLinks.map((item) => (
            <ConnectButton key={item.label} item={item} />
          ))}
        </nav>

        <nav className={styles.socials} aria-label="Social links">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              className={styles.socialLink}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
            >
              <span className={styles.socialIcon}>
                <SocialIcon social={social} />
              </span>
            </a>
          ))}
        </nav>
      </section>
    </main>
  );
}
