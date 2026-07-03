import Hero from './components/Hero';
import Highlights from './components/Highlights';
import Toc from './components/Toc';
import WhyThisProjectMattered from './components/WhyThisProjectMattered';
import CoreThesis from './components/CoreThesis';
import styles from './Intro.module.css';

export default function Intro() {
  return (
    <section className={styles.introSection}>
      <Hero />
      <Highlights />
      <Toc />
      <WhyThisProjectMattered />
      <CoreThesis />
    </section>
  );
}
