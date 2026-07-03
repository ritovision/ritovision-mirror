import PlainContainer from '@/projects/components/PlainContainer';
import styles from './WhyThisProjectMattered.module.css';

export default function WhyThisProjectMattered() {
  return (
    <PlainContainer
      id="why-this-project-mattered"
      title="Why This Project Mattered"
      className="darkglow"
      titleClassName="redText"
    >
      <p className={styles.sectionText}>
        Su Squares was a pioneering project in the multi-billion dollar NFT ecosystem:
        an early example and use case of ERC-721, the first mainstream NFT standard
        that formalized and defined the term as we know it. But eight years is an eon
        in dApp development, and its design choices had become so dated that the
        project was no longer positioned competitively. The challenge was not to erase
        that legacy, but to make it legible and competitive again in a world shaped by
        modern dApps, mobile-first expectations, and AI-native workflows.
      </p>

      <p className={styles.sectionText}>
        That made the modernization effort more interesting than a routine front-end
        refresh. It was an opportunity to show how a historically important project
        could evolve into a stronger platform for onboarding, experimentation,
        exploration, and future contribution without discarding the infrastructure and
        identity that made it notable in the first place.
      </p>
    </PlainContainer>
  );
}
