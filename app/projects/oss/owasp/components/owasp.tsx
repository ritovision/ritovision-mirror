'use client';

import BeforeAfterSwiper, { type BeforeAfterItem } from '@/components/utilities/media/images/BeforeAfterSwiper';
import CaptionedSwiper, { type CaptionedSlide } from '@/components/utilities/media/images/CaptionedSwiper';
import PlainContainer from '@/projects/components/PlainContainer';
import OwaspToc from './OwaspToc';
import styles from './owasp.module.css';

const quickHighlights = [
  {
    href: '#owasp-vwad-current',
    title: 'VWAD Platform Foundations',
    summary:
      'Helped establish the product foundations of the rebuilt VWAD platform through sustained UX, front-end, and publishing architecture work as it transitioned into a production-tier OWASP project.',
  },
  {
    href: '#owasp-vwad-legacy',
    title: 'Legacy VWAD: UX Rescue and Product Expansion',
    summary:
      'Rescued the legacy directory’s table UX on mobile, then expanded the product with Advanced Search functionality for richer discovery workflows.',
  },
  {
    href: '#owasp-site-theme',
    title: 'OWASP Site Theme Mobile Rescue',
    summary:
      'Rescued site-wide mobile breakage in the shared OWASP site theme used across the broader multi-repo web ecosystem.',
  },
  {
    href: '#owasp-top10',
    title: 'OWASP Top 10 RC Mobile',
    summary:
      'Rapidly identified and fixed site-wide mobile layout breakage on the live 2025 OWASP Top 10 release-candidate surface, stabilizing a high-visibility public-facing release.',
  },
];

const vwadSlides: BeforeAfterItem[] = [
  { label: 'Before', src: '/video/vwad-before.webm' },
  { label: 'After', src: '/video/vwad-after.webm' },
];

const vwadAdvancedSearchSlides: CaptionedSlide[] = [
  {
    title: 'Advanced Search Modal - Empty',
    caption: 'Here is the opened advanced search modal with multiple configurable parameters',
    src: '/images/pages/projects/oss/assets/owasp/vwad-AS-empty.png',
    alt: 'Advanced search modal empty state for the VWAD directory',
    aspectRatio: '1080 / 2078',
  },
  {
    title: 'Advanced Search Modal - Filled',
    caption:
      'Here the modal is filled out with search parameters and the pill buttons begin to populate. Pressing "accept" is needed to apply the query to the table.',
    src: '/images/pages/projects/oss/assets/owasp/vwad-AS-filled.png',
    alt: 'Advanced search modal filled state with parameters and pills',
    aspectRatio: '1080 / 2078',
  },
  {
    title: 'Advanced Search applied',
    caption:
      'Here there is an "Advanced Search" button used to open the modal, and the current search params are applied as seen in the pill buttons and the text describing the total search results currently present',
    src: '/images/pages/projects/oss/assets/owasp/vwad-AS-filterbar-sort.png',
    alt: 'Advanced search applied with filter pills and result count',
    aspectRatio: '1080 / 2219',
  },
];

const top10RcSlides: BeforeAfterItem[] = [
  {
    label: 'Before',
    src: '/images/pages/projects/oss/assets/owasp/RC-mobile-BEFORE.png',
    mediaType: 'image',
    alt: 'OWASP Top 10 release candidate mobile layout before watermark fix',
    aspectRatio: '1080 / 2139',
  },
  {
    label: 'After',
    src: '/images/pages/projects/oss/assets/owasp/RC-mobile-AFTER.png',
    mediaType: 'image',
    alt: 'OWASP Top 10 release candidate mobile layout after watermark fix',
    aspectRatio: '1080 / 2139',
  },
];

const siteThemeSlides: BeforeAfterItem[] = [
  {
    label: 'Before',
    src: '/images/pages/projects/oss/assets/owasp/sitetheme-BEFORE.jpg',
    mediaType: 'image',
    alt: 'OWASP site theme mobile layout before responsive fixes',
    aspectRatio: '412 / 804',
  },
  {
    label: 'After',
    src: '/images/pages/projects/oss/assets/owasp/sitetheme-AFTER.jpg',
    mediaType: 'image',
    alt: 'OWASP site theme mobile layout after responsive fixes',
    aspectRatio: '412 / 804',
  },
];

export default function OwaspSection() {
  return (
    <>
      <PlainContainer id="owasp-overview" title="Overview">
        <section className={styles.section}>
          <p className={styles.lead}>
            This OWASP work shows cross-functional depth, problem solving, initiative, and strong execution on mature
            public web infrastructure. Across shared-theme and
            project surfaces, Rito identified user-facing friction, clarified browse and discovery workflows, and
            shipped the front-end and publishing systems needed to support them. VWAD is the clearest thread: the work
            starts with legacy rescue and Advanced Search, then expands into foundational UX, browse architecture,
            publishing infrastructure, and faster pre-rendered surfaces on the rebuilt{' '}
            <a className={styles.link} href="https://vwad.owasp.org/" target="_blank" rel="noreferrer">
              vwad.owasp.org
            </a>{' '}
            platform.
          </p>
          <p className={styles.body}>
            The overall pattern is sustained product thinking, UX leadership, and full-stack execution inside a live
            OWASP ecosystem.
          </p>

          <div className={styles.subsection}>
            <h3 id="owasp-quick-highlights" className={`${styles.subsectionTitle} ${styles.quickHighlightsTitle}`}>
              Quick Highlights
            </h3>
            <ul className={styles.quickHighlights}>
              {quickHighlights.map((item) => (
                <li key={item.href} className={styles.quickHighlightItem}>
                  <a className={styles.quickHighlightLink} href={item.href}>
                    {item.title}
                  </a>
                  <p className={styles.quickHighlightSummary}>{item.summary}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </PlainContainer>

      <section className={styles.tocSection}>
        <span id="owasp-navigation" />
        <OwaspToc />
      </section>

      <PlainContainer id="owasp-background" title="Ecosystem Background Context">
        <section className={styles.section}>
          <p className={styles.body}>
            <a className={styles.link} href="https://owasp.org" target="_blank" rel="noreferrer">
              OWASP
            </a>{' '}
            (Open Worldwide Application Security Project) is a nonprofit, community-led cornerstone of application
            security, founded in 2001 and now spanning hundreds of chapters worldwide. It is best known for the{' '}
            <a className={styles.link} href="https://owasp.org/Top10/2025/" target="_blank" rel="noreferrer">
              OWASP Top 10
            </a>{' '}
            security risks, along with widely used resources like the{' '}
            <a className={styles.link} href="https://vwad.owasp.org/" target="_blank" rel="noreferrer">
              Vulnerable Web Applications Directory
            </a>{' '}
            and training projects like{' '}
            <a className={styles.link} href="https://owasp.org/www-project-juice-shop/" target="_blank" rel="noreferrer">
              OWASP Juice Shop
            </a>
            .
          </p>
          <p className={styles.body}>
            Structurally, OWASP is also a many-repos ecosystem with shared web infrastructure. Projects and chapters
            commonly live in separate repositories that publish under owasp.org using a shared theme, so one strong
            contribution can either improve a single flagship surface or ripple across a much wider public footprint.
          </p>
          <p className={styles.body}>
            VWAD is the flagship depth example here. The older owasp.org directory established the foundation with a
            table rescue and Advanced Search, and the newer vwad.owasp.org work expanded that into sustained product,
            browse, front-end, publishing, and rendering improvements on a rebuilt platform.
          </p>
        </section>
      </PlainContainer>

      <PlainContainer id="owasp-vwad-current" title="VWAD Platform Foundations">
        <section className={styles.section}>
          <p className={styles.highlightLine}>
            <strong>Quick Highlight:</strong> Helped establish the product foundations of the rebuilt VWAD platform
            through sustained UX, front-end, and publishing architecture work as it transitioned into a production-tier
            OWASP project.
          </p>

          <div id="owasp-vwad-current-browse" className={styles.subsection}>
            <h3 className={styles.subsectionTitle}>Productizing the Browse Experience</h3>
            <p className={styles.body}>
              On the rebuilt VWAD platform, Rito helped establish the product foundations for how the directory would
              be browsed, searched, and experienced. The work shaped VWAD into a stronger discovery product, with
              clearer browse modes, richer filtering, stronger mobile behavior, and more intentional entry points into
              search.
            </p>
            <p className={styles.body}>
              The major anchor was{' '}
              <a
                className={styles.link}
                href="https://github.com/owasp-vwad/owasp-vwad.github.io/pull/30"
                target="_blank"
                rel="noreferrer"
              >
                PR #30
              </a>
              , which split browsing into Basic and Advanced modes and added grouped multi-select filters, AND/OR
              matching, stars and year-range filtering, mode-specific state, and shared removable filter pills.
              Supporting UX work across the browse surface improved overflow handling, sticky controls, header scaling
              on narrow screens, wrapped-pill spacing, and other mobile/table behaviors that made the interface denser
              without becoming brittle.
            </p>
            <p className={styles.body}>
              Rito also formalized baseline installability with{' '}
              <a
                className={styles.link}
                href="https://github.com/owasp-vwad/owasp-vwad.github.io/pull/36"
                target="_blank"
                rel="noreferrer"
              >
                PR #36
              </a>
              . That added manifest metadata, icons including a maskable variant, minimal service worker support, iOS
              standalone metadata, and shortcuts that drop users directly into basic or advanced search. The result
              was a browse surface that felt more like a purpose-built product and less like a raw directory shell.
            </p>
          </div>

          <div id="owasp-vwad-current-publishing" className={styles.subsection}>
            <h3 className={styles.subsectionTitle}>Building the Publishing and Discovery Substrate</h3>
            <p className={styles.body}>
              Rito also helped establish the publishing and discovery substrate behind the rebuilt platform.{' '}
              <a
                className={styles.link}
                href="https://github.com/owasp-vwad/owasp-vwad.github.io/pull/37"
                target="_blank"
                rel="noreferrer"
              >
                PR #37
              </a>{' '}
              moved VWAD from a JavaScript-dependent app-detail shell toward a build-backed publishing surface
              with dedicated static app pages at <code>/app/&lt;slug&gt;/</code>, machine-readable JSON-LD, sitemap
              generation, compatibility handling for older URLs, and GitHub Actions deployment of generated output.
            </p>
            <p className={styles.body}>
              That changed the nature of the platform itself. Each app became a directly addressable, crawlable
              document instead of content trapped behind a single client-rendered detail route, making VWAD behave more
              like an indexable publishing system for curated vulnerable applications.
            </p>
            <p className={styles.body}>
              The implementation approach matters too: the build pipeline stayed lightweight and stdlib-driven, paired
              generation with purpose-built validation, and expanded VWAD&apos;s surface area without turning the
              project into a dependency-heavy stack.
            </p>
          </div>

          <div id="owasp-vwad-current-hardening" className={styles.subsection}>
            <h3 className={styles.subsectionTitle}>Hardening the Launch Surface</h3>
            <p className={styles.body}>
              To support that growth, Rito also hardened the launch surface itself.{' '}
              <a
                className={styles.link}
                href="https://github.com/owasp-vwad/owasp-vwad.github.io/pull/31"
                target="_blank"
                rel="noreferrer"
              >
                PR #31
              </a>
              refactored a monolithic stylesheet into smaller shared and page-specific stylesheets, removed dead code,
              fixed cascade conflicts, and normalized shared chrome across pages.
            </p>
            <p className={styles.body}>
              That lowered the cost of continued feature work and gave the rebuilt platform a cleaner front-end
              foundation.{' '}
              <a
                className={styles.link}
                href="https://github.com/owasp-vwad/owasp-vwad.github.io/pull/41"
                target="_blank"
                rel="noreferrer"
              >
                PR #41
              </a>{' '}
              then pushed key VWAD surfaces further away from pure client-side rendering by pre-rendering the
              featured-app shell with loading placeholders before data arrives.
            </p>
            <p className={styles.body}>
              The user-facing result was a faster and more stable initial experience, with less layout instability and
              a homepage that felt materially more solid during load. Maintainer feedback on the PR explicitly called
              out a major PageSpeed difference after the change.
            </p>
          </div>

          <div className={`${styles.subsection} ${styles.conclusionBlock}`}>
            <h3 className={styles.conclusionTitle}>Conclusion</h3>
            <p className={styles.conclusionBody}>
              This work helped define how the rebuilt VWAD platform would function as a user-facing
              product: how people browse it, how its content is published and discovered, and how the launch surface
              performs and scales.
            </p>
          </div>
        </section>
      </PlainContainer>

      <PlainContainer id="owasp-vwad-legacy" title="Legacy VWAD: UX Rescue and Product Expansion">
        <section className={styles.section}>
          <p className={styles.highlightLine}>
            <strong>Quick Highlight:</strong> Rescued the legacy directory’s table UX on mobile, then expanded the
            product with Advanced Search functionality for richer discovery workflows.
          </p>

          <div id="owasp-vwad-legacy-table" className={styles.subsection}>
            <h3 className={styles.subsectionTitle}>Table Rescue and Mobile Responsiveness</h3>
            <p className={styles.body}>
              The older VWAD site on owasp.org established the continuity of this work. The flagship table had become
              effectively unreadable on mobile: columns collapsed into near-vertical text, badges and icons shrank to
              microscopic sizes, and the page itself could overflow horizontally.
            </p>
            <p className={styles.body}>
              Rito opened an{' '}
              <a
                className={styles.link}
                href="https://github.com/OWASP/www-project-vulnerable-web-applications-directory/issues/169"
                target="_blank"
                rel="noreferrer"
              >
                issue
              </a>{' '}
              and shipped{' '}
              <a
                className={styles.link}
                href="https://github.com/OWASP/www-project-vulnerable-web-applications-directory/pull/171"
                target="_blank"
                rel="noreferrer"
              >
                PR #171
              </a>
              , which stabilized column sizing, introduced contained horizontal and vertical scrolling, and made
              headers sticky so users could actually navigate the directory across breakpoints.
            </p>
          </div>

          <div className={styles.sliderBlock}>
            <BeforeAfterSwiper items={vwadSlides} />
          </div>

          <div id="owasp-vwad-legacy-search" className={styles.subsection}>
            <h3 className={styles.subsectionTitle}>Advanced Search and Normalization</h3>
            <p className={styles.body}>
              That legacy phase then expanded into feature work.{' '}
              <a
                className={styles.link}
                href="https://github.com/OWASP/www-project-vulnerable-web-applications-directory/pull/210"
                target="_blank"
                rel="noreferrer"
              >
                Advanced Search
              </a>{' '}
              turned the table into a real query interface, while follow-up work in{' '}
              <a
                className={styles.link}
                href="https://github.com/OWASP/www-project-vulnerable-web-applications-directory/pull/214"
                target="_blank"
                rel="noreferrer"
              >
                PR #214
              </a>{' '}
              and{' '}
              <a
                className={styles.link}
                href="https://github.com/OWASP/www-project-vulnerable-web-applications-directory/pull/217"
                target="_blank"
                rel="noreferrer"
              >
                PR #217
              </a>{' '}
              kept the filtering surface coherent through deduping and canonical tech-label normalization.
            </p>
            <p className={styles.body}>
              That matters because the old VWAD run was not just a rescue. It already showed product thinking:
              multi-parameter search, shared pill-based state, and normalization layers that reduced contributor
              friction while keeping the end-user query experience clean.
            </p>
          </div>

          <div className={styles.sliderBlock}>
            <CaptionedSwiper items={vwadAdvancedSearchSlides} />
          </div>

          <div className={`${styles.subsection} ${styles.conclusionBlock}`}>
            <h3 className={styles.conclusionTitle}>Conclusion</h3>
            <p className={styles.conclusionBody}>
              In a legacy project nearing the end of its lifecycle, this work showed strong judgment and targeted
              execution: identify the highest-friction user problems, solve them directly, and leave the product
              materially more usable through a rescued mobile table UX and Advanced Search.
            </p>
          </div>
        </section>
      </PlainContainer>

      <PlainContainer id="owasp-site-theme" title="OWASP Site Theme Mobile Rescue">
        <section className={styles.section}>
          <p className={styles.highlightLine}>
            <strong>Quick Highlight:</strong> Rescued site-wide mobile breakage in the shared OWASP site theme used
            across the broader multi-repo web ecosystem.
          </p>

          <p className={styles.body}>
            The shared Jekyll site theme used across the owasp.org ecosystem had systemic issues in key elements that
            caused sitewide breakage. The cookie bar was not fully visible and could not be dismissed because the close
            icon was off-screen. On mobile load, large sections of the page were hidden by overflow, forcing awkward
            panning and hurting navigation and accessibility.
          </p>
          <p className={styles.body}>
            Rito diagnosed the root causes and applied a cohesive set of fixes across mobile and tablet breakpoints
            while preserving the original design intent. He opened an{' '}
            <a
              className={styles.link}
              href="https://github.com/OWASP/www--site-theme/issues/155"
              target="_blank"
              rel="noreferrer"
            >
              issue
            </a>{' '}
            and shipped a{' '}
            <a
              className={styles.link}
              href="https://github.com/OWASP/www--site-theme/pull/156"
              target="_blank"
              rel="noreferrer"
            >
              pull request
            </a>
            , and maintainers merged the changes after review.
          </p>
          <p className={styles.body}>
            Impact was immediate and broad: the shared theme stopped breaking layouts across the OWASP ecosystem, and
            the homepage experience became reliable on mobile and tablet.
          </p>

          <div className={styles.sliderBlock}>
            <BeforeAfterSwiper items={siteThemeSlides} />
          </div>

          <div className={`${styles.subsection} ${styles.conclusionBlock}`}>
            <h3 className={styles.conclusionTitle}>Conclusion</h3>
            <p className={styles.conclusionBody}>
              On a shared theme powering many OWASP surfaces, including the flagship main site, this work demonstrated
              strong systems diagnosis, judgment, initiative, and targeted execution. It required isolating complex UI
              behavior, communicating the root problems clearly, and shipping the right fixes with broad downstream
              impact.
            </p>
          </div>
        </section>
      </PlainContainer>

      <PlainContainer id="owasp-top10" title="OWASP Top 10 RC Mobile">
        <section className={styles.section}>
          <p className={styles.highlightLine}>
            <strong>Quick Highlight:</strong> Rapidly identified and fixed site-wide mobile layout breakage on the
            live 2025 OWASP Top 10 release-candidate surface, stabilizing a high-visibility public-facing release.
          </p>

          <p className={styles.body}>
            The 2025 OWASP Top 10 was in pre-release as a Release Candidate on the live, publicly viewable production
            site, with a watermark on every page to signal draft status. On mobile, that watermark was not configured
            correctly and ended up breaking layout, hiding the navigation menu and impacting normal scroll behavior
            while also adding whitespace more than twice the size of the page content itself.
          </p>
          <p className={styles.body}>
            Rito opened an{' '}
            <a className={styles.link} href="https://github.com/OWASP/Top10/issues/877" target="_blank" rel="noreferrer">
              issue
            </a>{' '}
            and shipped a{' '}
            <a className={styles.link} href="https://github.com/OWASP/Top10/pull/878" target="_blank" rel="noreferrer">
              pull request
            </a>{' '}
            that corrected the watermark layout and restored normal layout and scroll behavior across breakpoints. He
            also alerted maintainers in the OWASP Slack with the issue and fix, and it was promptly merged while the
            release candidate phase was still active.
          </p>

          <div className={styles.sliderBlock}>
            <BeforeAfterSwiper items={top10RcSlides} />
          </div>

          <div className={`${styles.subsection} ${styles.conclusionBlock}`}>
            <h3 className={styles.conclusionTitle}>Conclusion</h3>
            <p className={styles.conclusionBody}>
              This work showed strong judgment and rapid execution on a live release surface: identify the issue
              quickly, communicate it cleanly, resolve it directly, and keep the core release process moving without
              added friction.
            </p>
          </div>
        </section>
      </PlainContainer>
    </>
  );
}
