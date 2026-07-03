import React from 'react';
import BeforeAfterSwiper, { type BeforeAfterItem } from '@/components/utilities/media/images/BeforeAfterSwiper';
import PlainContainer from '@/projects/components/PlainContainer';
import styles from './GitCaseStudy.module.css';

const gitCommitDiffSlides: BeforeAfterItem[] = [
  {
    label: 'Before',
    src: '/images/pages/projects/oss/assets/git/git-commitdiff-before.png',
    mediaType: 'image',
    alt: 'Gitweb commit diff view before the mobile responsiveness fixes',
    aspectRatio: '400 / 664',
  },
  {
    label: 'After',
    src: '/images/pages/projects/oss/assets/git/git-commitdiff-after.png',
    mediaType: 'image',
    alt: 'Gitweb commit diff view after the mobile responsiveness fixes',
    aspectRatio: '400 / 664',
  },
];

export default function GitCaseStudy({ hideTitle }: { hideTitle?: boolean }) {
  return (
    <PlainContainer id="git-case-study" title="Git Case Study" hideTitle={hideTitle}>
      <section className={styles.section}>
        <div className={styles.backgroundBlock}>
          <h3 className={`${styles.backgroundTitle} ${styles.quickHighlightsTitle}`}>Quick Highlights</h3>
          <ul className={styles.quickHighlightsList}>
            <li className={styles.quickHighlightsItem}>
              Made Git&apos;s built-in gitweb browser interface work properly on mobile devices.
            </li>
            <li className={styles.quickHighlightsItem}>
              Released in{' '}
              <a
                className={styles.link}
                href="https://gitlab.com/git-scm/git/-/blob/v2.54.0/Documentation/RelNotes/2.54.0.adoc"
                target="_blank"
                rel="noreferrer"
              >
                Git v2.54.0
              </a>{' '}
              on April 20, 2026.
            </li>
            <li className={styles.quickHighlightsItem}>
              Listed in the{' '}
              <a
                className={styles.link}
                href="https://gitlab.com/git-scm/git/-/blob/v2.54.0/Documentation/RelNotes/2.54.0.adoc"
                target="_blank"
                rel="noreferrer"
              >
                release notes
              </a>{' '}
              as &quot;gitweb has been taught to be mobile friendly.&quot;
            </li>
          </ul>
        </div>

        <div className={styles.backgroundBlock}>
          <p className={styles.backgroundTitle}>
            <strong>Project Background:</strong>
          </p>
          <p className={styles.backgroundBody}>
            <a className={styles.link} href="https://git-scm.com/" target="_blank" rel="noreferrer">
              Git
            </a>{' '}
            is unusual among major software projects because it is still fundamentally mailing list-based: patches are
            proposed as email threads, reviewed in public on the list, revised as new versions, and then promoted
            through branches like <code>seen</code>, <code>next</code>, and <code>master</code> rather than being
            merged directly from GitHub.
          </p>
          <p className={styles.backgroundBody}>
            That workflow matters here because the work was not on a trendy front-end surface. It was on{' '}
            <strong>gitweb</strong>, Git&apos;s{' '}
            <a
              className={styles.link}
              href="https://git-scm.com/book/en/v2/Git-on-the-Server-GitWeb"
              target="_blank"
              rel="noreferrer"
            >
              long-lived browser interface
            </a>{' '}
            for viewing repositories, logs, trees, commits, and diffs. It is long-lived legacy infrastructure,
            seemingly close to maintenance mode, which meant a carefully scoped, non-disruptive mobile improvement was
            the kind of change most likely to land.
          </p>
        </div>

        <div className={styles.backgroundBlock}>
          <p className={styles.backgroundTitle}>
            <strong>How The Problem Surfaced:</strong>
          </p>
          <p className={styles.backgroundBody}>
            The problem first surfaced while browsing the{' '}
            <a className={styles.link} href="https://git.ffmpeg.org/ffmpeg.git" target="_blank" rel="noreferrer">
              FFmpeg repository
            </a>{' '}
            on a phone. FFmpeg was being hosted through Git&apos;s legacy gitweb, and the interface was still clearly
            desktop-first. Reading the source tree on mobile turned into a literal &quot;panzoom dance&quot;: two-handed
            pinch-zooming and panning around the page just to read each line.
          </p>
          <p className={styles.backgroundBody}>
            Because FFmpeg was downstream of Git&apos;s own gitweb, the right fix was upstream. Instead of patching a
            single hosted instance, Rito decided to improve gitweb itself so the change would flow to any project still
            depending on it.
          </p>
        </div>

        <div className={styles.backgroundBlock}>
          <p className={styles.backgroundTitle}>
            <strong>Entering The Workflow:</strong>
          </p>
          <p className={styles.backgroundBody}>
            Since the fixes were visual, before-and-after screenshots were important. That made{' '}
            <a className={styles.link} href="https://gitgitgadget.github.io/" target="_blank" rel="noreferrer">
              GitGitGadget
            </a>{' '}
            the most convenient bridge into Git&apos;s mailing-list process because it let the patch series live on
            GitHub to host the images while still being submitted properly to the list.
          </p>
          <p className={styles.backgroundBody}>
            It was Rito&apos;s first time contributing through that workflow. He joined the <code>#git-devel</code> IRC
            channel, asked to be allowlisted to use the tool, and someone quickly jumped in to do it. The GitGitGadget{' '}
            <a className={styles.link} href="https://github.com/gitgitgadget/git/pull/2043" target="_blank" rel="noreferrer">
              bridge PR
            </a>{' '}
            was then submitted to the mailing list on <strong>February 9, 2026</strong>.
          </p>
        </div>

        <div className={styles.backgroundBlock}>
          <p className={styles.backgroundTitle}>
            <strong>The Patch Series:</strong>
          </p>
          <p className={styles.backgroundBody}>
            The contribution landed as a five-patch series of targeted fixes. It started with the viewport meta tag in
            Perl so gitweb pages would actually honor the mobile viewport, then layered in CSS changes that respected
            the existing desktop structure instead of redesigning it.
          </p>
          <p className={styles.backgroundBody}>
            The strategy was adaptive rather than transformative: keep the legacy desktop layout intact, but add mobile
            constraints so page headers could expand, long content could wrap instead of blowing out the viewport, and
            wide tables could scroll within their own containers rather than forcing page-level overflow.
          </p>
        </div>

        <div className={styles.sliderBlock}>
          <BeforeAfterSwiper items={gitCommitDiffSlides} />
        </div>

        <div className={styles.sidequestBlock}>
          <p className={styles.backgroundTitle}>
            <strong>Sidequest: Improving The Bridge Itself:</strong>
          </p>
          <p className={styles.backgroundBody}>
            While the gitweb patches were moving through review, Rito ended up improving the GitGitGadget website
            itself. The site had the same desktop-first mobile problems as gitweb, so he made it responsive in{' '}
            <a className={styles.link} href="https://github.com/gitgitgadget/gitgitgadget.github.io/pull/26" target="_blank" rel="noreferrer">
              PR #26
            </a>
            , then followed with a{' '}
            <a className={styles.link} href="https://github.com/gitgitgadget/gitgitgadget.github.io/pull/27" target="_blank" rel="noreferrer">
              favicon PR
            </a>
            ,{' '}
            <a className={styles.link} href="https://github.com/gitgitgadget/gitgitgadget.github.io/pull/28" target="_blank" rel="noreferrer">
              canonical tags for SEO
            </a>
            , and a{' '}
            <a className={styles.link} href="https://github.com/gitgitgadget/gitgitgadget.github.io/pull/29" target="_blank" rel="noreferrer">
              footer/navigation pass
            </a>
            , and{' '}
            <a className={styles.link} href="https://github.com/gitgitgadget/gitgitgadget.github.io/pull/32" target="_blank" rel="noreferrer">
              custom 404 page handling
            </a>{' '}
            so the site was no longer orphaned.
          </p>
          <p className={styles.backgroundBody}>
            Those changes were reviewed and merged by Git for Windows maintainer <strong>Johannes Schindelin</strong>.
            He liked the mobile work, but pushed for more explicit commit bodies when the reasoning was not as obvious to
            other readers as it was to the person writing the CSS. Rito rewrote the commit messages to better explain
            why each change was correct.
          </p>
          <p className={styles.backgroundBody}>
            After Rito expanded the commit bodies, Johannes Schindelin merged the series and said:
          </p>
          <p className={styles.quote}>
            &quot;The love and care you put into them clearly shows and I appreciate it a lot. The comment messages now
            tell a really compelling story, are pleasant to read, and I am super happy to merge it. Thank you so
            much!&quot;
          </p>
        </div>

        <div className={styles.backgroundBlock}>
          <p className={styles.backgroundTitle}>
            <strong>Review, Revision, And Merge:</strong>
          </p>
          <p className={styles.backgroundBody}>
            Git&apos;s review cycle was fast but real. Eric Sunshine thought the overall direction made sense, but he also
            spotted a flaw in how one of the commits told the story of the changes. Rito reworked the sequencing, made
            the v2 patch flow clearer, and resubmitted.
          </p>
          <p className={styles.backgroundBody}>
            From there the series moved through Git&apos;s normal pipeline: first into <code>seen</code>, then into the
            status updates where Junio C Hamano summarized it as <strong>&quot;gitweb&quot; has been taught to be mobile
            friendly</strong>, then onward through <code>next</code> and <code>master</code>. Eric later said v2 made
            more sense than v1 and that the changes overall made sense.
          </p>
          <p className={styles.backgroundBody}>
            The final upstream merge landed on <strong>March 4, 2026</strong> in commit{' '}
            <a
              className={styles.link}
              href="https://github.com/git/git/commit/bcc2fc2311da726e1da3c0eb0b539a802f8589c0"
              target="_blank"
              rel="noreferrer"
            >
              <code>bcc2fc2</code>
            </a>
            . The whole series landed in under a month, which is a strong turnaround for a first contribution moving
            through Git&apos;s full mailing-list review process.
          </p>
          <p className={styles.backgroundBody}>
            The work was later released in{' '}
            <a
              className={styles.link}
              href="https://gitlab.com/git-scm/git/-/blob/v2.54.0/Documentation/RelNotes/2.54.0.adoc"
              target="_blank"
              rel="noreferrer"
            >
              Git v2.54.0
            </a>{' '}
            on April 20, 2026, with the release notes listing it as &quot;gitweb has been taught to be mobile
            friendly.&quot;
          </p>
        </div>
      </section>
    </PlainContainer>
  );
}
