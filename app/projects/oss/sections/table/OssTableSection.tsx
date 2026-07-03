import React from 'react';
import OrbImage from '@/components/utilities/media/images/OrbImage';
import StickyTable from '@/components/utilities/tables/StickyTable';
import Tags from '@/components/utilities/tags/Tags';
import styles from './OssTableSection.module.css';

type LinkItem = {
  label: string;
  url: string;
};

type OssProjectRow = {
  name: string;
  logoSrc: string;
  siteUrl: string;
  impact: string;
  improvement: string;
  prs: LinkItem[];
  trackingIssues: LinkItem[];
  tags: string[];
};

const columnWidths = [100, 300, 300, 75, 75, 175];

const ossRows: OssProjectRow[] = [
  {
    name: 'Git',
    logoSrc: '/images/pages/projects/oss/logos/git-logo-white.png',
    siteUrl: 'https://git-scm.com/',
    impact: "Made Git's built-in gitweb browser interface work properly on mobile devices, later released in Git v2.54.0.",
    improvement:
      'Added a viewport meta tag to the Perl-generated HTML and applied targeted CSS fixes to adapt layout behaviors for mobile while retaining the original desktop presentation.',
    prs: [
      {
        label: '#2043',
        url: 'https://github.com/gitgitgadget/git/pull/2043',
      },
    ],
    trackingIssues: [],
    tags: ['mobile responsiveness', 'gitweb', 'developer tooling', 'infrastructure'],
  },
  {
    name: 'OWASP VWAD (Current site)',
    logoSrc: '/images/pages/projects/oss/logos/owasp-white.png',
    siteUrl: 'https://vwad.owasp.org/',
    impact:
      'Expanded the new VWAD into a faster, more discoverable product with deeper browse UX and a build-backed publishing surface.',
    improvement:
      '- Shipped sustained browse and table UX refinement across a dense, live directory surface.\n\n- Added Basic/Advanced browse modes, modularized front-end styles, and formalized install/search shortcuts.\n\n- Introduced a Python build pipeline that pre-renders indexable app pages, injects JSON-LD, generates sitemap output, and deploys through GitHub Actions.\n\n- Shifted key VWAD surfaces away from client-side rendering through the build step and pre-rendered homepage shell, increasing speed and reducing layout instability.',
    prs: [
      {
        label: '#30',
        url: 'https://github.com/owasp-vwad/owasp-vwad.github.io/pull/30',
      },
      {
        label: '#31',
        url: 'https://github.com/owasp-vwad/owasp-vwad.github.io/pull/31',
      },
      {
        label: '#37',
        url: 'https://github.com/owasp-vwad/owasp-vwad.github.io/pull/37',
      },
      {
        label: '#41',
        url: 'https://github.com/owasp-vwad/owasp-vwad.github.io/pull/41',
      },
    ],
    trackingIssues: [],
    tags: ['advanced search', 'front-end architecture', 'publishing pipeline', 'indexability', 'performance', 'flagship product', 'production-tier project', 'UX'],
  },
  {
    name: 'Linux Kernel Mailing List archive',
    logoSrc: '/images/pages/projects/oss/logos/linux-white.png',
    siteUrl: 'https://lore.kernel.org/',
    impact: 'Made the entire Linux Kernel Mailing List archive mobile responsive.',
    improvement:
      '- Added feature enabling HTML head tag injection upstream to Public Inbox, and fixed site-wide horizontal scroll overflow breaking page layouts.\n\n- Advocated for use of the viewport meta tag with the new injection feature so modern browsers render the archive correctly on mobile.',
    prs: [
      {
        label: 'HTML head injection',
        url: 'https://public-inbox.org/meta/20260225153741.5872-1-rito@ritovision.com/T/#t',
      },
      {
        label: 'overflow fix',
        url: 'https://public-inbox.org/meta/20260302074335.20237-1-rito@ritovision.com/T/#u',
      },
    ],
    trackingIssues: [],
    tags: ['site-wide', 'mobile responsiveness', 'developer tooling', 'upstream contribution', 'infrastructure'],
  },
  {
    name: 'Ethereum EIPs',
    logoSrc: '/images/pages/projects/oss/logos/ethereum-white.png',
    siteUrl: 'https://eips.ethereum.org/',
    impact: 'Restored mobile usability, accessibility and normal navigation across 100+ pages including the main and historical ones.',
    improvement:
      'Resolved systemic mobile overflow issues via targeted CSS fixes.',
    prs: [
      {
        label: '#10358',
        url: 'https://github.com/ethereum/EIPs/pull/10358',
      },
      {
        label: '#1245',
        url: 'https://github.com/ethereum/ERCs/pull/1245',
      },
    ],
    trackingIssues: [
      {
        label: '#10357',
        url: 'https://github.com/ethereum/EIPs/issues/10357',
      },
    ],
    tags: ['site-wide', 'mobile optimization', 'EIPs', 'Ethereum', 'standards'],
  },
  {
    name: 'LangChain',
    logoSrc: '/images/pages/projects/oss/logos/langchain-white.png',
    siteUrl: 'https://docs.langchain.com/',
    impact: 'Improved brand presentation, site navigation and access to legacy docs on mobile.',
    improvement:
      "Rebalanced the main header layout to better showcase the brand and added version selector on mobile to navigate older docs.",
    prs: [
      {
        label: '#8942',
        url: 'https://github.com/langchain-ai/langchainjs/pull/8942',
      },
    ],
    trackingIssues: [],
    tags: ['site-wide', 'branding', 'navigation', 'mobile optimization', 'dev experience'],
  },
  {
    name: 'OWASP Site Theme',
    logoSrc: '/images/pages/projects/oss/logos/owasp-white.png',
    siteUrl: 'https://owasp.org/',
    impact: 'Restored mobile usability, accessibility and normal navigation across the vast ecosystem of OWASP web pages.',
    improvement: "Fixed systemic layout issues in the flagship site theme for tablet and mobile.",
    prs: [
      {
        label: '#156',
        url: 'https://github.com/OWASP/www--site-theme/pull/156',
      },
    ],
    trackingIssues: [
      {
        label: '#155',
        url: 'https://github.com/OWASP/www--site-theme/issues/155',
      },
      {
        label: '#338',
        url: 'https://github.com/OWASP/owasp.github.io/issues/338',
      },
    ],
    tags: ['site-wide', 'multi-repo ecosystem', 'branding', 'navigation', 'mobile optimization'],
  },
  {
    name: 'OWASP VWAD (Legacy site)',
    logoSrc: '/images/pages/projects/oss/logos/owasp-white.png',
    siteUrl: 'https://owasp.org/www-project-vulnerable-web-applications-directory/',
    impact:
      'Improved usability and discoverability for end users while reducing contributor burden and strengthening long-term maintainability.',
    improvement:
      '- Reworked the flagship table for better readability and scanning across breakpoints, with contained scrolling and sticky headers.\n\n- Added Advanced Search to materially improve filtering and discovery workflows, then introduced canonical tech-label normalization to keep the UX consistent as the dataset evolved.',
    prs: [
      {
        label: '#171',
        url: 'https://github.com/OWASP/www-project-vulnerable-web-applications-directory/pull/171',
      },
      {
        label: '#210',
        url: 'https://github.com/OWASP/www-project-vulnerable-web-applications-directory/pull/210',
      },
      {
        label: '#214',
        url: 'https://github.com/OWASP/www-project-vulnerable-web-applications-directory/pull/214',
      },
      {
        label: '#217',
        url: 'https://github.com/OWASP/www-project-vulnerable-web-applications-directory/pull/217',
      },
    ],
    trackingIssues: [
      {
        label: '#169',
        url: 'https://github.com/OWASP/www-project-vulnerable-web-applications-directory/issues/169',
      },
    ],
    tags: ['advanced search', 'legacy site', 'flagship product', 'core contribution', 'UX', 'maintainability', 'mobile responsiveness'],
  },
  {
    name: 'OWASP Top 10',
    logoSrc: '/images/pages/projects/oss/logos/owasp-white.png',
    siteUrl: 'https://owasp.org/Top10/2025/',
    impact: 'Restored mobile usability, accessibility and normal navigation site-wide during the Release Candidate phase.',
    improvement:
      "Rito fixed the RC watermark's behavior to be mobile responsive and prevent page overflow.",
    prs: [
      {
        label: '#878',
        url: 'https://github.com/OWASP/Top10/pull/878',
      },
    ],
    trackingIssues: [
      {
        label: '#877',
        url: 'https://github.com/OWASP/Top10/issues/877',
      },
    ],
    tags: ['site-wide', 'mobile optimization'],
  },
  {
    name: 'ZAP',
    logoSrc: '/images/pages/projects/oss/logos/zap-white.png',
    siteUrl: 'https://www.zaproxy.org/',
    impact:
      "Rescued site-wide responsive breakage from ZAP's flagship website, and improved mobile UX and accessibility for navigation.",
    improvement:
      '- Realigned the mobile header activation and contained wide tables with internal scrolling instead of letting them break the page layout.\n\n- Expanded the hamburger menu touch target to meet WCAG 44px minimum and added aria-controls for screen reader support.',
    prs: [
      {
        label: '#3484',
        url: 'https://github.com/zaproxy/zaproxy-website/pull/3484',
      },
      {
        label: '#3256',
        url: 'https://github.com/zaproxy/zaproxy-website/pull/3256',
      },
      {
        label: '#3255',
        url: 'https://github.com/zaproxy/zaproxy-website/pull/3255',
      },
    ],
    trackingIssues: [
      {
        label: '#3483',
        url: 'https://github.com/zaproxy/zaproxy-website/issues/3483',
      },
    ],
    tags: ['site-wide', 'mobile optimization', 'responsive breakpoints', 'tables'],
  },
  {
    name: 'Kubernetes',
    logoSrc: '/images/pages/projects/oss/logos/kubernetes-white.png',
    siteUrl: 'https://kubernetes.io/',
    impact:
      'Strengthened Kubernetes mobile brand presentation across core site components and a partner storytelling page.',
    improvement:
      'Rebalanced mobile navbar logo and footer content layouts, and fixed the partner case-studies layout to restore readability and brand presentation.',
    prs: [
      {
        label: '#52386',
        url: 'https://github.com/kubernetes/website/pull/52386',
      },
      {
        label: '#52382',
        url: 'https://github.com/kubernetes/website/pull/52382',
      },
      {
        label: '#52480',
        url: 'https://github.com/kubernetes/website/pull/52480',
      },
    ],
    trackingIssues: [],
    tags: ['site-wide', 'branding', 'navigation', 'mobile optimization', 'partners', 'case studies'],
  },
  {
    name: 'systemd',
    logoSrc: '/images/pages/projects/oss/logos/systemd-white.png',
    siteUrl: 'https://systemd.io/',
    impact: 'Set site-wide policy for responsive images, links, and code blocks across the systemd documentation, preventing layout-breaking overflow on mobile.',
    improvement:
      'Applied responsive constraints to images, enabled word-wrapping for long URLs and inline code spans, and improved formatting consistency for enum constants in documentation.',
    prs: [
      {
        label: '#41064',
        url: 'https://github.com/systemd/systemd/pull/41064',
      },
      {
        label: '#41063',
        url: 'https://github.com/systemd/systemd/pull/41063',
      },
      {
        label: '#41062',
        url: 'https://github.com/systemd/systemd/pull/41062',
      },
    ],
    trackingIssues: [],
    tags: ['site-wide', 'mobile responsiveness', 'documentation', 'developer tooling'],
  },
  {
    name: 'Linux Kernel Docs',
    logoSrc: '/images/pages/projects/oss/logos/linux-white.png',
    siteUrl: 'https://docs.kernel.org/',
    impact: 'Made foundational, site-wide fixes to contain layout-breaking overflow across the official Linux Kernel documentation and added its first favicon.',
    improvement:
      '- Made convenient reuse of the Tux image as a favicon, giving docs.kernel.org a consistent identity in browser tabs and bookmarks.\n\n- Contained multiple sources of layout-breaking overflow with targeted CSS: long URLs in prose and docutil tables, API signature code blocks, and inline code spans.',
    prs: [
      {
        label: 'favicon',
        url: 'https://lore.kernel.org/linux-doc/20260321111217.2404-1-rito@ritovision.com/T/#u',
      },
      {
        label: 'URL overflow',
        url: 'https://lore.kernel.org/linux-doc/20260321180841.10166-1-rito@ritovision.com/T/#t',
      },
      {
        label: 'API sig scroll',
        url: 'https://lore.kernel.org/linux-doc/20260321142559.26005-1-rito@ritovision.com/T/#t',
      },
      {
        label: 'inline code wrap',
        url: 'https://lore.kernel.org/linux-doc/20260321141118.23828-1-rito@ritovision.com/T/#t',
      },
    ],
    trackingIssues: [],
    tags: ['site-wide', 'branding', 'mobile responsiveness', 'documentation', 'developer tooling', 'infrastructure'],
  },
  {
    name: 'Jupyter',
    logoSrc: '/images/pages/projects/oss/logos/jupyter-white.png',
    siteUrl: 'https://jupyter.org/',
    impact:
      'Polished the Jupyter homepage experience on mobile and tablet by restoring clean rendering for the Notebook feature section.',
    improvement:
      'Fixed crowding and horizontal overflow in the homepage feature list with a scoped responsive CSS update, allowing cards to wrap cleanly at tablet-sized viewports while preserving existing phone and desktop layouts.',
    prs: [
      {
        label: '#839',
        url: 'https://github.com/jupyter/jupyter.github.io/pull/839',
      },
    ],
    trackingIssues: [],
    tags: ['homepage', 'mobile responsiveness', 'layout', 'scientific computing'],
  },
  {
    name: 'Storybook',
    logoSrc: '/images/pages/projects/oss/logos/storybook-white.png',
    siteUrl: 'https://storybook.js.org/',
    impact: 'Reduced site-wide friction for navigating pages on mobile.',
    improvement:
      'Fixed navigation bug where the main menu modal would not close automatically on page changes.',
    prs: [
      {
        label: '#342',
        url: 'https://github.com/storybookjs/web/pull/342',
      },
    ],
    trackingIssues: [],
    tags: ['site-wide', 'UX', 'navigation'],
  },
];

const renderLinkList = (links: LinkItem[]) => {
  if (links.length === 0) {
    return 'N/a';
  }

  return links.map((link, index) => (
    <React.Fragment key={link.url}>
      <a
        className={styles.tableLink}
        href={link.url}
        target="_blank"
        rel="noreferrer noopener"
      >
        {link.label}
      </a>
      {index < links.length - 1 ? ', ' : ''}
    </React.Fragment>
  ));
};

export default function OssTableSection() {
  return (
    <section className={`defaulttopspace ${styles.section}`}>
      <h2 id="contributions-table" className={`${styles.heading} headingLarge`}>
        Table of Shipped Contributions
      </h2>
      <p className={styles.intro}>
        A snapshot of OSS improvements shipped across high-traffic, developer-facing ecosystems.
      </p>

      <div className={styles.tableContainer}>
        <StickyTable
          ariaLabel="Open source project contributions"
          columnWidths={columnWidths}
          className="blueglow"
          wrapperClassName={styles.tableWrapper}
        >
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Impact</th>
              <th>Improvement(s)</th>
              <th>Pull Request(s)</th>
              <th>Issue(s)</th>
              <th>Tags</th>
            </tr>
          </thead>
          <tbody>
            {ossRows.map((row, index) => (
              <tr key={`${row.name}-${index}`}>
                <td className={styles.projectCell}>
                  <a
                    className={styles.projectLink}
                    href={row.siteUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <OrbImage
                      src={row.logoSrc}
                      alt={`${row.name} logo`}
                      width={140}
                      height={80}
                      fill={false}
                      className={styles.projectLogo}
                    />
                    <span className={styles.projectName}>{row.name}</span>
                  </a>
                </td>
                <td className={styles.improvementCell}>
                  <div className={styles.improvementText}>{row.impact}</div>
                </td>
                <td className={styles.improvementCell}>
                  <div className={styles.improvementText}>{row.improvement}</div>
                </td>
                <td>{renderLinkList(row.prs)}</td>
                <td>{renderLinkList(row.trackingIssues)}</td>
                <td>
                  <Tags initialTags={row.tags} variant="inline" />
                </td>
              </tr>
            ))}
          </tbody>
        </StickyTable>
      </div>
    </section>
  );
}
