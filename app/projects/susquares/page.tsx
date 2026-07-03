import Intro from './sections/Intro/Intro';
import Fork from './sections/Fork/Fork';
import TrustScope from './sections/TrustScope/TrustScope';
import Upstream from './sections/Upstream/Upstream';
import BoundariesExit from './sections/BoundariesExit/BoundariesExit';
import Conclusion from './sections/Conclusion/Conclusion';
import { suSquaresCaseStudyMetadata } from './metadata';
import styles from './styles.module.css';

export const metadata = suSquaresCaseStudyMetadata;

export default function SuSquaresCaseStudyPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <Intro />
        <Fork />
        <TrustScope />
        <Upstream />
        <BoundariesExit />
        <Conclusion />
      </div>
    </main>
  );
}
