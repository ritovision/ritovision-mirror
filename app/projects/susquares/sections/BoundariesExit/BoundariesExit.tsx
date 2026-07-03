import PlainContainer from '@/projects/components/PlainContainer';
import styles from './BoundariesExit.module.css';

export default function BoundariesExit() {
  return (
    <PlainContainer
      id="boundaries-and-exit"
      title="Boundaries and Exit"
      className="darkglow"
      titleClassName="redText"
    >
      <div className={styles.content}>
        <h3 className={styles.subheading}>Misalignment Becomes Clear</h3>

        <p className={styles.sectionText}>
          Rito discovered fairly early that Will was not interested in expanding the
          official site toward the broader product vision Rito believed would be
          necessary to grow Su Squares&apos; audience. That became especially clear around{' '}
          <a
            href="https://github.com/su-squares/tenthousandsu.com/pull/59"
            target="_blank"
            rel="noreferrer"
            className={styles.link}
          >
            PR #59
          </a>{' '}
          and{' '}
          <a
            href="https://github.com/su-squares/tenthousandsu.com/pull/60"
            target="_blank"
            rel="noreferrer"
            className={styles.link}
          >
            PR #60
          </a>
          . When the proposed CSS refactor for scalable growth was rejected, and the
          reusable menu/modal navigation system was turned away in favor of fixing
          navigation directly onto the homepage while leaving articles buried at the
          bottom of the About page, it became clear that Rito and Will had sharply
          different product sensibilities and visions for the project.
        </p>

        <p className={styles.sectionText}>
          That mattered because the co-maintainership offer had not come with explicit
          scope or responsibilities. What had been clear was that Will saw Rito as
          capable, skilled, well-intentioned, and positioned to improve the project.
          What was not clear at the outset was how much room there actually was for
          Rito to enact the level of product and architectural expansion he believed
          the project needed. Over time, that ambiguity resolved into a genuine
          misalignment.
        </p>

        <h3 className={styles.subheading}>Scope, Boundaries, and Exit</h3>

        <p className={styles.sectionText}>
          Rito responded by making the misalignment explicit rather than letting it
          linger. In{' '}
          <a
            href="https://github.com/su-squares/tenthousandsu.com/issues/62"
            target="_blank"
            rel="noreferrer"
            className={styles.link}
          >
            issue #62
          </a>
          , he announced that he would not be retaining his co-maintainership role,
          outlined the narrower scope of work he was still willing to complete, and
          set up a clean path toward exiting the project. That decision did not come
          from a loss of interest in the project itself. It came from recognizing that
          the collaboration no longer offered a realistic path for the kind of
          stewardship and product direction he had expected to be able to exercise.
        </p>

        <p className={styles.sectionText}>
          Will did outline which parts of Rito&apos;s proposed scope he was willing to
          accept, and Rito followed through on most of them. Mobile responsiveness,
          metadata and previewability, branding improvements, developer setup, and
          maintainability work all landed or substantially progressed. But as more of
          that upstream work moved forward, Rito also noticed a recurring pattern in
          the collaboration model itself. In his final note on{' '}
          <a
            href="https://github.com/su-squares/tenthousandsu.com/issues/62#issuecomment-4236514063"
            target="_blank"
            rel="noreferrer"
            className={styles.link}
          >
            issue #62
          </a>
          , he got specific: substantive rationale was often not being engaged in kind,
          review scope drifted away from the PR or issue under discussion, structural
          questions were not being answered directly before discussion moved into
          smaller implementation details, and claims were sometimes made without being
          checked against the evidence first.
        </p>

        <p className={styles.sectionText}>
          That was the point where Rito stopped treating the remaining work as
          something he should simply push through. He had already completed most of the
          scope he had agreed to, plus a few extra improvements, and the site was
          leaving the collaboration in a meaningfully better state than he found it.
          But he was volunteering his time and compute, not being paid, and the
          collaboration had stopped feeling sustainable or like a good use of his
          bandwidth. So rather than keep forcing more work through a model he no longer
          believed in, he closed out the remaining PRs and ended his involvement.
        </p>

        <h3 className={styles.subheading}>Parting Guidance</h3>

        <p className={styles.sectionText}>
          What makes the ending notable is that it was not dismissed or reframed as
          drama. Will followed up on{' '}
          <a
            href="https://github.com/su-squares/tenthousandsu.com/issues/62#issuecomment-4245231740"
            target="_blank"
            rel="noreferrer"
            className={styles.link}
          >
            issue #62
          </a>{' '}
          by thanking Rito for all his help, saying he had made good progress, agreeing
          with his points, and saying that his notes would live on. That response
          matters because it confirms that Rito&apos;s criticism was not only
          boundary-setting, but substantively received. The collaboration ended because
          the working model was misaligned, not because the contributions lacked value.
        </p>

        <p className={styles.sectionText}>
          Rito also left behind concrete strategic guidance in{' '}
          <a
            href="https://github.com/su-squares/tenthousandsu.com/issues/72"
            target="_blank"
            rel="noreferrer"
            className={styles.link}
          >
            issue #72
          </a>
          , where he laid out a material strategy for overcoming the project&apos;s
          pricing-path problem, arguing that the fixed primary-sale flow had become a
          major barrier to growth and proposing a repriced intermediary sale system
          that could work around the legacy contract constraints. That mattered because
          it showed that even on the way out, he was still leaving behind concrete
          product strategy rather than only criticism of process.
        </p>
      </div>
    </PlainContainer>
  );
}
