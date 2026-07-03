import PlainContainer from '@/projects/components/PlainContainer';
import styles from './TrustScope.module.css';

export default function TrustScope() {
  return (
    <PlainContainer
      id="trust-scope-and-working-relationship"
      title="Trust, Scope, and Working Relationship"
      className="darkglow"
      titleClassName="redText"
    >
      <div className={styles.content}>
        <p className={styles.intro}>
          Rito did not keep the fork private. He pushed the entire rewrite upstream as{' '}
          <a
            href="https://github.com/su-squares/tenthousandsu.com/pull/52"
            target="_blank"
            rel="noreferrer"
            className={styles.link}
          >
            PR #52
          </a>{' '}
          so Will could evaluate the whole vision and expanded scope in public: the dApp
          modernization, the architectural expansion, and the pedagogical tooling
          vision all at once. That turned the fork from a side experiment into a
          concrete directional pitch for what Su Squares could become.
        </p>

        <p className={styles.intro}>
          The fork was intentionally presented as a large model showcase rather than as
          a realistic one-shot merge candidate. Will treated it that way too: not as
          something to land wholesale, but as a broad demonstration of directions worth
          triaging into smaller upstreamable pieces. That made PR #52 less a merge
          request than a public proving ground for the quality and seriousness of the
          work.
        </p>

        <ul className={styles.points}>
          <li className={styles.point}>
            PR #52 impressed Will enough that he offered Rito co-maintainership over
            email, changing the relationship from outside contribution to direct
            stewardship of the project.
          </li>
          <li className={styles.point}>
            The co-maintainership offer did not come with explicit scope or
            responsibilities. It rested on the premise that Rito could materially
            improve Su Squares beyond isolated outside contributions.
          </li>
          <li className={styles.point}>
            That change in relationship later showed up in practice when Rito began
            opening scoped work directly from in-repo{' '}
            <span className={styles.inlineCode}>su-squares:tenthousandsu.com</span>{' '}
            branches instead of only from his fork.
          </li>
        </ul>

        <p className={styles.conclusion}>
          Pushing the fork as PR #52 changed the relationship. It made the ambition of
          the work undeniable and helped convince Will that Rito should be trusted not
          just to contribute ideas from the outside, but to help maintain and improve
          Su Squares directly.
        </p>
      </div>
    </PlainContainer>
  );
}
