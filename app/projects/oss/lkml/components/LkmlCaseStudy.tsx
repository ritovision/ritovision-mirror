import React from 'react';
import BeforeAfterSwiper, { type BeforeAfterItem } from '@/components/utilities/media/images/BeforeAfterSwiper';
import PlainContainer from '@/projects/components/PlainContainer';
import styles from './LkmlCaseStudy.module.css';

const lkmlSlides: BeforeAfterItem[] = [
  {
    label: 'Before',
    innerLabel: 'Desktop-panzoom',
    src: '/images/pages/projects/oss/assets/lkml/lkml-before.png',
    mediaType: 'image',
    alt: 'lore.kernel.org before mobile responsiveness fix',
    aspectRatio: '400 / 714',
  },
  {
    label: 'After',
    innerLabel: 'Mobile-friendly',
    src: '/images/pages/projects/oss/assets/lkml/lkml-after.png',
    mediaType: 'image',
    alt: 'lore.kernel.org after mobile responsiveness fix',
    aspectRatio: '400 / 714',
  },
];

export default function LkmlCaseStudy({ hideTitle }: { hideTitle?: boolean }) {
  return (
    <PlainContainer id="lkml-case-study" title="Linux Kernel Mailing List archive Case Study" hideTitle>
      <section className={styles.section}>
        <div className={styles.backgroundBlock}>
          <h3 className={`${styles.backgroundTitle} ${styles.quickHighlightsTitle}`}>Quick Highlights</h3>
          <ul className={styles.quickHighlightsList}>
            <li className={styles.quickHighlightsItem}>
              Made the entire Linux Kernel Mailing List archive work properly on mobile devices.
            </li>
            <li className={styles.quickHighlightsItem}>
              Achieved it through upstream contributions to Public Inbox, the infrastructure powering{' '}
              <a className={styles.link} href="https://lore.kernel.org/" target="_blank" rel="noreferrer">
                lore.kernel.org
              </a>
              .
            </li>
            <li className={styles.quickHighlightsItem}>
              Advocated for use of his upstream feature to make lore.kernel.org render properly on mobile.
            </li>
          </ul>
        </div>

        <div className={styles.backgroundBlock}>
          <p className={styles.backgroundTitle}>
            <strong>Background:</strong>
          </p>
          <p className={styles.backgroundBody}>
            <a className={styles.link} href="https://public-inbox.org/" target="_blank" rel="noreferrer">
              Public Inbox
            </a>{' '}
            is the open source software that powers{' '}
            <a className={styles.link} href="https://lore.kernel.org/" target="_blank" rel="noreferrer">
              lore.kernel.org
            </a>
            , the official archiving platform for the Linux Kernel Mailing List and dozens of other kernel
            sub-lists. It is a significant piece of infrastructure: the Linux kernel is developed almost entirely
            through email, and lore.kernel.org is where those discussions are permanently archived and publicly
            searchable.
          </p>
          <p className={styles.backgroundBody}>
            Public Inbox is created and maintained by a single developer: <strong>Eric Wong</strong>. Eric is a
            respected figure in the systems programming world - he is the original author of{' '}
            <a className={styles.link} href="https://bogomips.org/unicorn/" target="_blank" rel="noreferrer">
              Unicorn
            </a>
            , the Ruby HTTP server that powered Twitter and Shopify at scale and whose pre-fork server architecture
            later influenced Gunicorn. His approach to software reflects those roots: minimal dependencies, extreme
            efficiency, and a very high bar for any change that touches the system.
          </p>
          <p className={styles.backgroundBody}>
            Critically, Public Inbox is not a standard website. It is infrastructure for generating mailing list
            archives intended for <em>both</em> graphical web browsers and terminal text-based browsers as first-class
            audiences. That dual-audience constraint shapes every design decision on the platform.
          </p>
        </div>

        <div className={styles.backgroundBlock}>
          <p className={styles.backgroundTitle}>
            <strong>How The Problem Surfaced:</strong>
          </p>
          <p className={styles.backgroundBody}>
            Rito landed on{' '}
            <a className={styles.link} href="https://lore.kernel.org/" target="_blank" rel="noreferrer">
              lore.kernel.org
            </a>{' '}
            on his phone and immediately hit the familiar panzoom dance - the desktop-first layout with no viewport
            meta tag meant pinch-zooming and panning just to read a thread. The site was fully functional for its
            intended desktop and terminal audiences, but on a mobile browser it was effectively unusable.
          </p>
          <p className={styles.backgroundBody}>
            Since Public Inbox is open source, a custom CSS patch to the hosted instance was technically possible. But
            the right move was to go upstream: a change to Public Inbox itself would benefit every instance, not just
            lore.kernel.org. That was the approach.
          </p>
        </div>

        <div className={styles.backgroundBlock}>
          <p className={styles.backgroundTitle}>
            <strong>First Patches & Eric&apos;s Response:</strong>
          </p>
          <p className={styles.backgroundBody}>
            Rito submitted the initial patches and they were rejected. Eric responded with what amounted to a project
            treatise: a detailed writeup of his skepticism around the use case value of mobile responsiveness and
            conforming to the defaults that graphical web browsers require.
          </p>
          <p className={styles.backgroundBody}>
            It was a dismissal, but also a useful redirection - it was actionable. Eric gave guidance on how to align
            the layout fixes with his vision and how to approach a more general tag injection, since he rejected
            viewport meta tags and favicons as categorical defaults.
          </p>
          <p className={styles.backgroundBody}>
            Rito took that feedback and iterated. There was already an existing mechanism for injecting CSS into the
            head - he took that as the foundation and expanded it. His first pass was an opinionated feature with
            structured support for specific tag types he believed would be useful to admins who are not web developers:
            viewport meta tag, favicons, Open Graph tags, SEO directives, each configurable as named options.
          </p>
          <p className={styles.backgroundBody}>
            Eric rejected this too. His view was that admins should have greater freedom and the feature should not
            guide them too closely with pre-defined categories. Rito came back with a{' '}
            <a
              className={styles.link}
              href="https://public-inbox.org/meta/20260225153741.5872-1-rito@ritovision.com/T/#t"
              target="_blank"
              rel="noreferrer"
            >
              generic HTML head tag injection feature
            </a>{' '}
            - any tag, fully open-ended. There were questions about security risks from arbitrary injection, but both
            Rito and Eric landed on the same reasoning: admins who have access to configure the system can already
            modify the code directly, so validation logic was unnecessary overhead. If an admin injects something
            reasonable, it works. The feature was accepted on those terms.
          </p>
        </div>

        <div className={styles.backgroundBlock}>
          <p className={styles.backgroundTitle}>
            <strong>The Overflow Fix & The Bar For Efficiency:</strong>
          </p>
          <p className={styles.backgroundBody}>
            Alongside the head injection feature, Rito submitted an{' '}
            <a
              className={styles.link}
              href="https://public-inbox.org/meta/20260302074335.20237-1-rito@ritovision.com/T/#u"
              target="_blank"
              rel="noreferrer"
            >
              overflow fix
            </a>{' '}
            for the horizontal scroll breakage site-wide. Eric agreed the fix was correct in principle, but pushed hard
            on efficiency: the change needed to be as minimal and tight as possible. That meant several rounds of
            iteration, stripping the fix down to the lowest code footprint Eric would accept.
          </p>
          <p className={styles.backgroundBody}>
            Both patches - the generic head tag injection feature and the overflow fix - were accepted and merged
            together. The merge confirmation is in the overflow fix thread.
          </p>
        </div>

        <div className={styles.sidequestBlock}>
          <p className={styles.backgroundTitle}>
            <strong>Advocating to Leadership:</strong>
          </p>
          <p className={styles.backgroundBody}>
            Shipping the feature upstream was only half the equation. For lore.kernel.org to actually benefit, someone
            on the Linux kernel infrastructure team would need to enable the viewport meta tag injection.
          </p>
          <p className={styles.backgroundBody}>
            Rito sent a cold message to <strong>Konstantin Ryabitsev</strong>, the Linux Foundation&apos;s
            infrastructure lead who manages kernel.org and lore.kernel.org, recommending he enable the viewport meta
            tag using the new feature.
          </p>
          <p className={styles.backgroundBody}>
            It came full circle through an unrelated thread. Rito had been trying to find a way to contribute to
            kernel.org directly but there was no dedicated mailing list for it.{' '}
            <strong>Johannes Schindelin</strong> - the Git for Windows maintainer - stepped in and opened a{' '}
            <a
              className={styles.link}
              href="https://lore.kernel.org/git/DH4DJF6XZZKI.15LZYBZ6MLWP5@ritovision.com/T/#t"
              target="_blank"
              rel="noreferrer"
            >
              thread
            </a>{' '}
            in the Git mailing list to bridge the introduction. In that thread, Konstantin surfaced and confirmed he
            had found Rito&apos;s emails.
          </p>
        </div>

        <div className={styles.backgroundBlock}>
          <p className={styles.backgroundTitle}>
            <strong>Confirmation:</strong>
          </p>
          <p className={styles.backgroundBody}>
            On <strong>March 28, 2026</strong>, Rito noticed lore.kernel.org had changed - the viewport meta tag was
            live and the archive was rendering correctly on mobile. The Wayback Machine captures the before and after:{' '}
            <a
              className={styles.link}
              href="https://web.archive.org/web/20260323012619/https://lore.kernel.org/"
              target="_blank"
              rel="noreferrer"
            >
              before
            </a>{' '}
            (March 23) and{' '}
            <a
              className={styles.link}
              href="https://web.archive.org/web/20260328162012/https://lore.kernel.org/"
              target="_blank"
              rel="noreferrer"
            >
              after
            </a>{' '}
            (March 28). The entire Linux Kernel Mailing List archive - one of the most important developer
            communication archives in existence - was now mobile responsive.
          </p>
        </div>

        <div className={styles.sliderBlock}>
          <BeforeAfterSwiper items={lkmlSlides} />
        </div>
      </section>
    </PlainContainer>
  );
}
