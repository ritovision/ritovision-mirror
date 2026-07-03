import styles from './Highlights.module.css';

const highlights = [
  'Reframed Su Squares as a more credible modern dApp without replacing its legacy base.',
  'Expanded the project into a stronger platform for learning, experimentation, and extension.',
  'Introduced an AI agent-guided developer workflow alongside improvements to wallet UX, metadata, branding, and maintainability.',
  'Earned co-maintainership status and trust, then landed a scoped set of upstream improvements.',
  'Set boundaries clearly and exited on principled terms when the collaboration model stopped working.',
];

export default function Highlights() {
  return (
    <section className={`${styles.highlights} blueglow`} aria-labelledby="susquares-highlights">
      <div className={styles.highlightsHeader}>
        <h2
          id="susquares-highlights"
          className={`${styles.highlightsTitle} headingLarge redText`}
        >
          Quick Highlights
        </h2>
        <p className={styles.highlightsIntro}>
          Rito made an ambitious effort to modernize a historically important NFT
          project, expand it into a stronger platform for learning and experimentation,
          introduce AI-native developer workflows, and navigate the upstream
          relationship through to a clean exit.
        </p>
      </div>

      <ul className={styles.highlightsList}>
        {highlights.map((highlight) => (
          <li key={highlight} className={styles.highlightItem}>
            {highlight}
          </li>
        ))}
      </ul>
    </section>
  );
}
