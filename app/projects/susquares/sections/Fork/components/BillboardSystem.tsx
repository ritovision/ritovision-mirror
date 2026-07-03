import styles from './BillboardSystem.module.css';

const billboardPoints = [
  'The billboard was rebuilt as a reusable core instead of a homepage-only script, with wrappers for homepage navigation, embeds, personalization flows, and chooser modals.',
  'Accessibility and mobile interaction were both treated as core requirements: the grid gained ARIA grid and gridcell semantics, per-square labels, focus management, and touch-friendly pan-zoom behavior instead of remaining a brittle visual-only surface.',
  'Outbound interaction stopped being abrupt. A leaving-modal style disclaimer showed the full destination before navigation, while a blocked-modal intercepted disallowed targets instead of failing silently.',
  'Security was layered into the interaction model itself: domain blocklists, square blocklists, text silencing, locked override policies, dangerous URI-scheme rejection, and tooltip sanitization all helped keep user-curated links from becoming a blind-trust surface.',
  'The same system became portable as a shareable iframe with the same contained homepage-style interaction model, plus URL-driven configuration and a dedicated embed-builder page for controlling theme, header, blocklists, and behavior.',
  'Square overrides and wrapper hooks made it possible to reuse the billboard for genuinely different purposes without cloning the implementation every time.',
];

export default function BillboardSystem() {
  return (
    <section className={styles.section}>
      <h3 className={styles.heading}>The Billboard Was Rebuilt as Core Product Infrastructure</h3>
      <p className={styles.copy}>
        The billboard was the most project-specific part of Su Squares, and one of the
        fork&apos;s most important changes was treating it like core product
        infrastructure rather than a single page widget. Rito broke it into a shared
        core with reusable view and event layers, then extended it so the same system
        could support browsing, selection, embedding, and personalization instead of
        just rendering the homepage grid.
      </p>

      <p className={styles.copy}>
        That architectural shift also changed how the billboard felt to use. It became
        more touch-friendly on mobile, more legible as an interactive surface, and far
        safer when dealing with user-curated links. It also became meaningfully more
        accessible: the grid was rebuilt with ARIA semantics, per-cell labeling, and
        focus management so interaction did not depend on pointer-only behavior.
        Instead of throwing users straight into destinations, the rebuilt flow could
        show a readable disclaimer-style leaving modal, block unsafe targets outright,
        and preserve those same protections even inside embeds. Just as importantly,
        it turned the signature interface of the project into something other pages
        and other sites could actually build on.
      </p>

      <figure className={styles.videoFigure}>
        <div className={styles.videoFrame}>
          <video
            src="/images/pages/projects/susquares/fork/su-billboard-mobile-demo.webm"
            controls
            preload="metadata"
            playsInline
            className={styles.video}
          />
        </div>
        <figcaption className={styles.caption}>
          Mobile billboard demo showing touch-friendly pan and zoom plus disclaimer and
          safety-gated outbound interaction instead of immediate blind navigation.
        </figcaption>
      </figure>

      <ul className={styles.list}>
        {billboardPoints.map((point) => (
          <li key={point} className={styles.item}>
            {point}
          </li>
        ))}
      </ul>
    </section>
  );
}
