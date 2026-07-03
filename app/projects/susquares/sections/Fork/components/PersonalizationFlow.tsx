import OrbImage from '@/components/utilities/media/images/OrbImage';
import styles from './PersonalizationFlow.module.css';

const capabilities = [
  'Single and batch personalization were consolidated into one clearer page instead of being split between personalize.html and personalize-batch.html.',
  'The new flow introduced a row-based table for personalizable entries, with billboard-based square picking and removal.',
  'Owned-square fetching, draft preview mode, glow overlays, and locator feedback made the billboard feel like an active editing surface instead of a passive reference.',
  'CSV tools and image batch tooling turned the page into something materially more powerful than the legacy forms.',
  'The broader contract and runtime work left room for both the original main-contract path and the cheaper underlay path, while moving depersonalization in-app as the older-contract-specific flow.',
];

const legacyPages = [
  '`personalize.html` for single personalization',
  '`personalize-batch.html` for batch operations',
  '`tools.tenthousandsu.com` for depersonalizing offsite',
];

export default function PersonalizationFlow() {
  return (
    <section className={styles.section}>
      <h3 className={styles.heading}>A Rebuilt Personalization System</h3>
      <p className={styles.copy}>
        One of the fork&apos;s biggest UX overhauls was the personalization stack. In the
        original flow, users had to bounce between separate pages for single and batch
        personalization of Squares, or leave the site entirely for depersonalizing the
        old legacy contract. Rito collapsed those three legacy destinations into a much
        more coherent in-app system centered on <code>personalize-modern.html</code>,
        while moving unpersonalization into a modal that reused the dApp&apos;s shared web3
        runtime, branding system, and transaction controller.
      </p>

      <p className={styles.copy}>
        The result was not just consolidation. The rebuilt flow preserved the original
        mint-to-personalize handoff, kept the legacy pages available as historical
        alternatives, and dramatically expanded what users could do once they landed
        there. It turned one of Su Squares&apos; most important product surfaces into
        something that finally felt deliberate instead of stitched together.
      </p>

      <aside className={styles.legacyCard}>
        <h4 className={styles.cardTitle}>Before: three disconnected destinations</h4>
        <ul className={styles.legacyList}>
          {legacyPages.map((page) => (
            <li key={page} className={styles.legacyItem}>
              <code>{page.replaceAll('`', '')}</code>
            </li>
          ))}
        </ul>
      </aside>

      <figure className={styles.videoFigure}>
        <div className={styles.videoFrame}>
          <video
            src="/images/pages/projects/susquares/fork/su-personalize-flow-demo.webm"
            controls
            preload="metadata"
            playsInline
            className={styles.video}
          />
        </div>
        <figcaption className={styles.caption}>
          The broader flow preserved ownership lookup, square selection, and the
          overall mint-to-personalize journey inside one rebuilt system instead of
          scattering it across disconnected pages.
        </figcaption>
      </figure>

      <figure className={styles.videoFigure}>
        <div className={styles.videoFrame}>
          <video
            src="/images/pages/projects/susquares/fork/su-personalize-image-billboard-demo.webm"
            controls
            preload="metadata"
            playsInline
            className={styles.video}
          />
        </div>
        <figcaption className={styles.caption}>
          The rebuilt personalization flow added image placement, real-time coordinate
          feedback, billboard selection, and preview mode inside the main dApp.
        </figcaption>
      </figure>

      <div className={styles.comparisonPair}>
        <figure className={styles.figure}>
          <div className={`${styles.imageFrame} ${styles.beforeFrame}`}>
            <OrbImage
              src="/images/pages/projects/susquares/fork/su-unpersonalize-offsite-before.png"
              alt="Legacy offsite depersonalize tool used before the fork moved the flow in-app"
              fill
              sizes="(max-width: 860px) 92vw, 420px"
              radius="var(--border-radius-standard)"
              style={{ objectFit: 'contain' }}
            />
          </div>
          <figcaption className={styles.caption}>
            Before: depersonalizing lived offsite on a separate domain with no shared
            navigation or in-app context.
          </figcaption>
        </figure>

        <figure className={styles.figure}>
          <div className={`${styles.imageFrame} ${styles.afterFrame}`}>
            <OrbImage
              src="/images/pages/projects/susquares/fork/su-unpersonalize-inapp-after.png"
              alt="Forked in-app unpersonalize modal replacing the old offsite depersonalize tool"
              fill
              sizes="(max-width: 860px) 92vw, 420px"
              radius="var(--border-radius-standard)"
              style={{ objectFit: 'contain' }}
            />
          </div>
          <figcaption className={styles.caption}>
            After: the unpersonalize flow moved in-app and reused the shared dApp
            runtime, styling, and transaction UX.
          </figcaption>
        </figure>
      </div>

      <ul className={styles.list}>
        {capabilities.map((capability) => (
          <li key={capability} className={styles.item}>
            {capability}
          </li>
        ))}
      </ul>
    </section>
  );
}
