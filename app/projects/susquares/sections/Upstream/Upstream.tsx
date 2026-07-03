import OrbImage from '@/components/utilities/media/images/OrbImage';
import PlainContainer from '@/projects/components/PlainContainer';
import styles from './Upstream.module.css';

export default function Upstream() {
  return (
    <PlainContainer
      id="upstream-merges-for-the-official-su-squares-site"
      title="Upstream Merges for the Official Su Squares Site"
      className="blueglow"
      titleClassName="redText"
    >
      <div className={styles.content}>
        <p className={styles.intro}>
          Once the fork had established the quality and seriousness of the work, the
          collaboration shifted from showcasing a full alternative vision to landing a
          narrower sequence of upstream improvements. Rito did not transplant the fork
          wholesale. He split out the parts Will was willing to accept and shipped them
          directly into the official codebase, improving the live project in visible
          ways without requiring the entire architectural rework to merge at once.
        </p>

        <ul className={styles.points}>
          <li className={styles.point}>
            <span className={styles.pointLabel}>
              Mobile responsiveness (
              <a
                href="https://github.com/su-squares/tenthousandsu.com/pull/61"
                target="_blank"
                rel="noreferrer"
                className={styles.link}
              >
                #61
              </a>
              )
            </span>{' '}
            was the clearest user-facing win. Rito made the entire site mobile
            responsive, improved header behavior, adapted the billboard and tooltip
            experience for smaller screens, and brought the overall layout much closer
            to modern dApp expectations.
          </li>
          <li className={styles.point}>
            <span className={styles.pointLabel}>
              Previewability and metadata (
              <a
                href="https://github.com/su-squares/tenthousandsu.com/pull/64"
                target="_blank"
                rel="noreferrer"
                className={styles.link}
              >
                #64
              </a>
              )
            </span>{' '}
            made the site more legible off-platform as well as on-platform. Rito
            centralized canonical, Open Graph, and Twitter metadata, cleaned up page
            URLs, and improved how Su Squares presented itself when links were shared.
          </li>
          <li className={styles.point}>
            <span className={styles.pointLabel}>
              Branding and asset clarity (
              <a
                href="https://github.com/su-squares/tenthousandsu.com/pull/58"
                target="_blank"
                rel="noreferrer"
                className={styles.link}
              >
                #58
              </a>
              ,{' '}
              <a
                href="https://github.com/su-squares/tenthousandsu.com/pull/67"
                target="_blank"
                rel="noreferrer"
                className={styles.link}
              >
                #67
              </a>
              , plus issue{' '}
              <a
                href="https://github.com/su-squares/tenthousandsu.com/issues/65"
                target="_blank"
                rel="noreferrer"
                className={styles.link}
              >
                #65
              </a>
              )
            </span>{' '}
            improved the project&apos;s visual legibility across the site and GitHub
            surfaces. The old branding put the full Su Squares wordmark in gold on a
            light background, which became unreadable at small sizes. Rito replaced it
            with a new SU logomark on the project&apos;s trademark gradient background,
            alongside cleaner asset organization and branding guidance that pushed the
            project toward marks that actually held up in favicon and GitHub contexts.
          </li>
          <li className={styles.point}>
            <span className={styles.pointLabel}>
              Developer setup and maintainability (
              <a
                href="https://github.com/su-squares/tenthousandsu.com/pull/57"
                target="_blank"
                rel="noreferrer"
                className={styles.link}
              >
                #57
              </a>
              ,{' '}
              <a
                href="https://github.com/su-squares/tenthousandsu.com/pull/70"
                target="_blank"
                rel="noreferrer"
                className={styles.link}
              >
                #70
              </a>
              )
            </span>{' '}
            reduced friction for future work on the official repo. Rito added site
            config for faster and more discoverable local builds, including optional
            exclusion of heavier legacy directories that reduced build time from
            minutes into seconds, and later refactored duplicated footer code into
            shared includes.
          </li>
        </ul>

        <div className={styles.mediaGrid}>
          <figure className={styles.figure}>
            <div className={styles.ogFrame}>
              <OrbImage
                src="/images/pages/projects/susquares/branding/logo-og.png"
                alt="Su Squares Open Graph preview image showing the branded share card."
                fill
                sizes="(max-width: 900px) 100vw, 60vw"
                containerStyle={{ backgroundColor: 'rgba(6, 24, 44, 0.55)' }}
              />
            </div>
            <figcaption className={styles.caption}>
              The shared OG image made Su Squares links preview consistently across
              social platforms and messaging contexts.
            </figcaption>
          </figure>

          <figure className={styles.figure}>
            <div className={styles.markFrame}>
              <OrbImage
                src="/images/pages/projects/susquares/branding/logomark.png"
                alt="Su Squares SU logomark used for the favicon and GitHub-facing project branding."
                fill
                sizes="(max-width: 900px) 100vw, 28vw"
                containerStyle={{ backgroundColor: 'rgba(6, 24, 44, 0.55)' }}
              />
            </div>
            <figcaption className={styles.caption}>
              The new SU logomark became the favicon and the basis of the org and
              codebase image on GitHub because it stayed legible where the older
              wordmark did not.
            </figcaption>
          </figure>
        </div>

        <p className={styles.closing}>
          Rito went from creating an impressive fork to materially improving the
          official project. The project later{' '}
          <a
            href="https://x.com/SuSquares/status/2044410456052285659"
            target="_blank"
            rel="noreferrer"
            className={styles.link}
          >
            publicly thanked Rito
          </a>{' '}
          for responsive mobile improvements, link preview support, improved logo
          artwork, easier developer setup, and future-facing ideas, and the post was
          also reposted by Will&apos;s personal account.
        </p>
      </div>
    </PlainContainer>
  );
}
