import OrbImage from '@/components/utilities/media/images/OrbImage';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <span className={styles.eyebrow}>Su Squares Case Study</span>
      <h1 className={styles.title}>
        Modernizing a Historic NFT Project for Modern dApp and AI-Native Workflows
      </h1>
      <div className={styles.logoFrame}>
        <OrbImage
          src="/images/pages/projects/susquares/branding/logo-square-full.png"
          alt="Su Squares logo"
          fill
          sizes="(max-width: 860px) 90vw, 360px"
          radius="var(--border-radius-standard)"
          style={{ objectFit: 'cover' }}
        />
      </div>

      <p className={styles.lede}>
        Su Squares helped lay the foundation for mainstream NFT adoption, ushering in
        the multi-billion dollar NFT ecosystem, but its legacy web presence no longer
        felt competitive with modern dApp standards or emerging AI-native ways of
        building and exploring software. Rito built a modernized fork on top of the
        existing infrastructure to make the project more usable, more legible, and more
        extensible without discarding its historical foundation. That effort earned him
        co-maintainership on the upstream project, where he landed a scoped set of
        improvements before exiting on his own terms.
      </p>
    </section>
  );
}
