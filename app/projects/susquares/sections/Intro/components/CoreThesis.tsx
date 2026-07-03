import PlainContainer from '@/projects/components/PlainContainer';
import styles from './CoreThesis.module.css';

export default function CoreThesis() {
  return (
    <PlainContainer
      id="problems-vision-and-rationale"
      title="Problems, Vision and Rationale"
      className="darkglow"
      titleClassName="redText"
    >
      <div className={styles.content}>
        <div className={styles.section}>
        <h3 className={styles.subheading}>A Product Growth Problem</h3>

        <p className={styles.sectionText}>
          Su Squares had a serious product growth problem. After roughly eight years,
          around two-thirds of the token supply remained unsold, and the project&apos;s
          fixed primary-sale pricing no longer felt credible relative to the market. As
          Rito later argued more explicitly, the pricing model had become an
          insurmountable constraint on growth unless the sale system itself was
          rethought.
        </p>
      </div>

      <div className={styles.section}>
        <h3 className={styles.subheading}>A Dated dApp Surface</h3>

        <p className={styles.sectionText}>
          At the same time, the dApp&apos;s product surface was dated and underwhelming
          compared with modern standards. The issue was not just visual age. From both
          a UX quality-of-life standpoint and an architectural standpoint, the site no
          longer looked competitively positioned against contemporary dApps. If the
          goal was to get people&apos;s attention back onto the project and expand
          adoption, the product surface needed to become dramatically more usable and
          materially broader in its use cases.
        </p>
      </div>

      <div className={styles.section}>
        <h3 className={styles.subheading}>
          A Pedagogical and Architectural Opportunity
        </h3>

        <p className={styles.sectionText}>
          There was also a pedagogical opportunity. Will clearly liked teaching
          developers, and Su Squares had the historical character to function partly as
          a kind of museum piece. But while the project&apos;s hourly blockchain-driven
          site update was a genuinely clever and distinctive element, much of the
          surrounding stack reflected older frameworks and practices that were no
          longer ideal as a learning surface for modern developers.
        </p>

        <p className={styles.sectionText}>
          Rito&apos;s vision was to use the modernization effort to turn the repo into an
          ecosystem-as-a-playground architecture: a monorepo that preserved the legacy
          Jekyll deployment model while adding the kinds of tools a modern dApp project
          should teach from, including typed Node workspaces, smart-contract tooling,
          local blockchain infrastructure, testing suites, UI staging, bundling, and
          AI-native guided workflows for touring, setting up, and building on the
          system.
        </p>

        <p className={styles.sectionText}>
          Taken together, that vision was meant to do more than refresh the site.
          Expanding the product surface while turning the project into a stronger
          pedagogical platform could help restore attention, improve usability, and
          create new paths for adoption.
        </p>
      </div>
      </div>
    </PlainContainer>
  );
}
