import OrbImage from '@/components/utilities/media/images/OrbImage';
import PlainContainer from '@/projects/components/PlainContainer';
import styles from './Conclusion.module.css';

export default function Conclusion() {
  return (
    <PlainContainer
      id="conclusion"
      title="Conclusion"
      className="blueglow"
      titleClassName="redText"
    >
      <div className={styles.content}>
        <p className={styles.sectionText}>
          Su Squares is one of the clearest public records of how Rito approaches
          ambitious work. He spent a month of unpaid time building a full
          modernization fork on a pioneering NFT project, pitched it publicly through
          PR #52, earned co-maintainership off the strength of it, and landed a
          scoped set of upstream improvements the project publicly thanked him for.
        </p>

        <p className={styles.sectionText}>
          What makes the project notable beyond the craft is how it ended. Most case
          studies stop at shipped work. This one closes with Rito naming a
          collaboration pattern that had stopped working in issue #62, closing out
          remaining PRs rather than forcing more work through a model he no longer
          believed in, and leaving behind concrete product strategy in issue #72 on
          the way out. Will&apos;s reply, which thanked Rito, agreed with the points,
          and said the notes would live on, confirmed that the criticism was
          substantively received rather than dismissed as drama.
        </p>

        <p className={styles.sectionText}>
          Taken together, the project puts four things on the public record:
          willingness to invest serious unpaid effort behind a vision, the technical
          range to execute across contracts, frontend, infrastructure, and tooling,
          the judgment to name misalignment before it curdled into resentment, and
          the care to leave strategy behind even on the way out.
        </p>

        <figure className={styles.figure}>
          <div className={styles.imageFrame}>
            <OrbImage
              src="/images/pages/projects/susquares/conclusion/x-post-thanks.png"
              alt="Su Squares public thank-you post listing the improvements Rito shipped."
              fill
              sizes="(max-width: 700px) 100vw, 400px"
              containerStyle={{ backgroundColor: 'rgba(6, 24, 44, 0.55)' }}
            />
          </div>
          <figcaption className={styles.caption}>
            Public thank you from the official Su Squares account on X, also reposted
            on Will&apos;s personal account.
          </figcaption>
        </figure>
      </div>
    </PlainContainer>
  );
}
