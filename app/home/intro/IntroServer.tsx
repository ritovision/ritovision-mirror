// app/components/home/flipCard/FlipCardServer.tsx
import FlipCardClient from "./IntroClient";
import styles from "./Intro.module.css";

export default function FlipCardServer() {
  return (
    <div className={styles.flipCardWrapper}>
      <FlipCardClient />
    </div>
  );
}
