import OrbImage from '@/components/utilities/media/images/OrbImage';
import styles from './ProductSurface.module.css';

export default function ProductSurface() {
  return (
    <section className={styles.section}>
      <h3 className={styles.heading}>A More Credible dApp Surface</h3>
      <p className={styles.copy}>
        The fork expanded Su Squares far beyond its original narrow site surface. It
        introduced a fully mobile-responsive dApp, installable PWA support,
        centralized navigation, richer square lookup and chooser flows, and a clearer
        personalization experience with CSV and image batch tooling. The point was not
        novelty for its own sake. It was to make the project feel dramatically more
        usable, more legible, and more credible as a living product.
      </p>

      <div className={styles.mediaPair}>
        <figure className={styles.figure}>
          <div className={styles.mediaFrame}>
            <OrbImage
              src="/images/pages/projects/susquares/fork/su-mint-before-mobile.png"
              alt="Original Su Squares mint page on mobile before the fork redesign"
              fill
              sizes="(max-width: 860px) 92vw, 440px"
              radius="var(--border-radius-standard)"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <figcaption className={styles.caption}>
            Before: a sales purchase flow missing the ability to explore and select
            Squares to purchase on the page or a robust transaction flow showing the
            pricing and process in real time as expected in modern dapps.
          </figcaption>
        </figure>

        <figure className={styles.figure}>
          <div className={styles.mediaFrame}>
            <OrbImage
              src="/images/pages/projects/susquares/fork/su-mint-after-mobile.png"
              alt="Forked Su Squares mint page on mobile after the redesign"
              fill
              sizes="(max-width: 860px) 92vw, 440px"
              radius="var(--border-radius-standard)"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <figcaption className={styles.caption}>
            After: a mobile-responsive purchase flow that lets users explore and
            select Squares directly on the page while surfacing live pricing, wallet
            context, and transaction progress in a way that feels aligned with modern
            dApp expectations.
          </figcaption>
        </figure>
      </div>

    </section>
  );
}
