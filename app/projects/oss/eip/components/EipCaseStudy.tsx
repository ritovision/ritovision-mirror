import React from 'react';
import OrbImage from '@/components/utilities/media/images/OrbImage';
import BeforeAfterSwiper from '@/components/utilities/media/images/BeforeAfterSwiper';
import PlainContainer from '@/projects/components/PlainContainer';
import styles from './EipCaseStudy.module.css';

export default function EipCaseStudy({ hideTitle }: { hideTitle?: boolean }) {
  return (
    <>
      <PlainContainer id="ethereum-eip-case-study" title="Ethereum EIPs Case Study" hideTitle={hideTitle}>
        <section className={styles.section}>
        <div className={styles.backgroundBlock}>
          <h3 className={`${styles.backgroundTitle} ${styles.quickHighlightsTitle}`}>Quick Highlights</h3>
          <ul className={styles.quickHighlightsList}>
            <li className={styles.quickHighlightsItem}>
              Shipped a site-wide mobile UX rescue across the EIPs standards site, impacting all the main pages and historical ones like ERC-721.
            </li>
          </ul>
        </div>

        <div className={styles.backgroundBlock}>
          <p className={styles.backgroundTitle}>
            <strong>Project Background:</strong>
          </p>
          <p className={styles.backgroundBody}>
            The{' '}
            <a className={styles.link} href="https://eips.ethereum.org/" target="_blank" rel="noreferrer">
              Ethereum Improvement Proposals
            </a>{' '}
            (EIPs) repository is the authoritative standards forum for the Ethereum ecosystem,
            governing how technical proposals are introduced, discussed, and adopted across a
            multi-billion-dollar global blockchain economy. Standards formalized here routinely extend
            beyond Ethereum itself, shaping conventions and implementations across other
            EVM-compatible blockchains and adjacent ecosystems that inherit or adapt Ethereum's
            specifications.
          </p>
          <p className={styles.backgroundBody}>
            The repository contains some of the most influential standards in blockchain history,
            including{' '}
            <a className={styles.link} href="https://eips.ethereum.org/EIPS/eip-721" target="_blank" rel="noreferrer">
              ERC-721
            </a>
            , which formally defined the concept and terminology of{' '}
            <a
              className={styles.link}
              href="https://en.wikipedia.org/wiki/Non-fungible_token"
              target="_blank"
              rel="noreferrer"
            >
              Non-Fungible Tokens
            </a>{' '}
            (NFTs). Many ERCs originating here serve as foundational primitives for wallets,
            marketplaces, DeFi protocols, developer tooling, and infrastructure relied upon at global
            scale.
          </p>
          <p className={styles.backgroundBody}>
            In addition to application-level standards, the EIPs process is the canonical pathway for
            proposing and coordinating Ethereum protocol upgrades and network forks, providing a
            shared framework that the broader ecosystem - core developers, client teams, infrastructure
            providers, and enterprises - generally aligns around.
          </p>
          <p className={styles.backgroundBody}>
            The repository is a high-activity hub for ongoing standards development and
            collaboration, with continuous contributions focused primarily on protocol design and
            specification rather than site maintenance or structure, reinforcing its role as shared
            technical ground truth for Ethereum and the wider EVM landscape.
          </p>
        </div>
        <div className={styles.backgroundBlock}>
          <p className={styles.backgroundTitle}>
            <strong>Problem Uncovered:</strong>
          </p>
          <p className={styles.backgroundBody}>
            For years, the EIPs site had a persistent mobile layout problem: on mobile screen sizes,
            certain content (long lines of text, links, code blocks, and tables) could break out of
            the normal page container, forcing the entire page wider than the viewport and creating
            horizontal scrolling and awkward layouts. This impaired accessibility and made
            navigation challenging. Rito had noticed this behavior in passing over time, but the
            true scope was not understood, and it had not been formally raised or tracked in GitHub
            as a systemic issue.
          </p>
        <div className={styles.problemGrid}>
          <div className={styles.problemMedia}>
              <OrbImage
                src="/images/pages/projects/oss/assets/eip/erc-721-BEFORE.jpg"
                alt="ERC-721 page with broken layout on mobile"
                containerClassName={styles.orbImage}
                aspectRatio="540 / 1037"
                sizes="(max-width: 768px) 90vw, 450px"
              />
              <p className={styles.imageCaption}>
                <em>Screenshot of ERC-721 page with broken layout on mobile</em>
              </p>
            </div>
            <div className={styles.problemDetails}>
              <p className={styles.backgroundBody}>
                On September 18, 2025, Rito opened the first formal{' '}
                <a
                  className={styles.link}
                  href="https://github.com/ethereum/EIPs/issues/10357"
                  target="_blank"
                  rel="noreferrer"
                >
                  issue
                </a>{' '}
                and, on his own initiative,
                performed a structured audit to determine how widespread the breakage really was.
                That investigation revealed the problem was not limited to a handful of edge-case
                pages; it affected 100+ pages, including major category pages and heavily referenced
                core standards. He catalogued affected pages, noted that some were more severely
                impacted than others, and documented that the underlying causes were systemic and
                repeatable, rooted in how shared layout and styling handled overflow on mobile rather
                than isolated content mistakes.
              </p>
              <p className={styles.backgroundBody}>
                Notably, high-visibility specifications were impacted, including ERC-20 and ERC-721,
                foundational documents that are routinely cited across the ecosystem and frequently
                used as reference points by developers, companies, and standards authors.
              </p>
          </div>
        </div>
      </div>
      <div className={styles.backgroundBlock}>
        <p className={styles.backgroundTitle}>
          <strong>The Solution:</strong>
        </p>
        <p className={styles.backgroundBody}>
          Rito translated the audit into a single systemic fix that made the site resilient to
          long, unbroken content on small screens. Instead of patching individual pages, he
          updated the shared layout and overflow rules in the site&rsquo;s core styles so that
          long links, code blocks, tables, and other wide elements no longer pushed the document
          beyond the mobile viewport.
        </p>
        <p className={styles.backgroundBody}>
          He submitted the change as a{' '}
          <a
            className={styles.link}
            href="https://github.com/ethereum/EIPs/pull/10358"
            target="_blank"
            rel="noreferrer"
          >
            pull request
          </a>{' '}
          with a detailed breakdown and a live demo to
          validate the behavior. After maintainer review, it was merged into the canonical EIPs
          repo, and also merged in the dependent{' '}
          <a
            className={styles.link}
            href="https://github.com/ethereum/ERCs/pull/1245"
            target="_blank"
            rel="noreferrer"
          >
            ERCs repo
          </a>
          . Once deployed, the fix removed horizontal scrolling on affected pages and reduced the
          risk of the same class of layout regressions as new standards are added, improving
          baseline usability and accessibility across one of the ecosystem&rsquo;s most heavily
          referenced documentation sites.
        </p>
        <p className={styles.backgroundBody}>
          Maintainers thanked him for the contribution and invited him to apply the same lens to
          the upcoming Working Group version of the site.
        </p>
      </div>
        </section>
        <div className={styles.sliderBlock}>
          <BeforeAfterSwiper
            items={[
              {
                label: 'Before',
                src: '/images/pages/projects/oss/assets/eip/erc-721-BEFORE.jpg',
                mediaType: 'image',
                alt: 'ERC-721 mobile layout before overflow fix',
                aspectRatio: '540 / 1037',
              },
              {
                label: 'After',
                src: '/images/pages/projects/oss/assets/eip/erc-721-AFTER.png',
                mediaType: 'image',
                alt: 'ERC-721 mobile layout after overflow fix',
                aspectRatio: '540 / 1037',
              },
            ]}
          />
        </div>
      </PlainContainer>
    </>
  );
}
