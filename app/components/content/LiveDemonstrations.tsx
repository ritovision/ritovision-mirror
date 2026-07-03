import type { ReactNode } from "react";
import styles from "./LiveDemonstrations.module.css";

export type LiveDemonstrationLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type LiveDemonstration = {
  title: ReactNode;
  description: ReactNode;
  links: LiveDemonstrationLink[];
};

const defaultDemonstrations: LiveDemonstration[] = [
  {
    title: <strong>Su Squares Modernization Fork</strong>,
    description:
      "Taking a historical NFT project and turning it into a pedagogical ecosystem-as-a-playground system with an AI-native developer experience.",
    links: [
      { label: "Live Site", href: "https://su.ritovision.com", external: true },
      { label: "Case Study", href: "/projects/susquares" },
      { label: "Source Code", href: "https://github.com/ritovision/10-su", external: true },
    ],
  },
  {
    title: (
      <a
        href="https://carolinevreeland.com"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.primaryRed}
      >
        <strong>CarolineVreeland</strong>
      </a>
    ),
    description:
      'NYT-featured website pioneering an "AFL," lightweight architecture for serving users and AI distinct experiences.',
    links: [
      { label: "Live Site", href: "https://carolinevreeland.com", external: true },
      { label: "Source Code on GitHub", href: "https://github.com/ritovision/vreeland", external: true },
    ],
  },
  {
    title: (
      <a
        href="https://ritoswap.com"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.primaryRed}
      >
        <strong>RitoSwap</strong>
      </a>
    ),
    description: (
      <>
        A blockchain dApp and AI game showcase featuring a multi-modal <em>RapBotRito</em> and voice clone of Rito Rhymes.
      </>
    ),
    links: [
      { label: "Live Site", href: "https://ritoswap.com", external: true },
      { label: "Source Code on GitHub", href: "https://github.com/ritovision/ritoswap-mirror", external: true },
      { label: "Full Documentation Site", href: "https://docs.ritoswap.com", external: true },
    ],
  },
];

const defaultIntro = (
  <>
    You can see his Open Source projects built end-to-end, exemplifying craftsmanship across Product, Brand, UX, and Technology—including this very{" "}
    <a href="https://github.com/ritovision/ritovision-mirror" target="_blank" rel="noopener noreferrer">
      <u>website</u>
    </a>{" "}
    with a{" "}
    <a href="https://ui.ritovision.com" target="_blank" rel="noopener noreferrer">
      <u>UI showcase</u>
    </a>
    .
  </>
);

interface LiveDemonstrationsProps {
  className?: string;
  title?: string;
  intro?: ReactNode;
  demonstrations?: LiveDemonstration[];
}

export default function LiveDemonstrations({
  className,
  title = "Live Demonstrations",
  intro = defaultIntro,
  demonstrations = defaultDemonstrations,
}: LiveDemonstrationsProps) {
  return (
    <section className={[styles.section, className].filter(Boolean).join(" ")}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.intro}>{intro}</p>

      {demonstrations.map((demonstration, index) => (
        <div className={styles.demonstration} key={index}>
          <p className={styles.projectTitle}>
            <span className={styles.primaryRed}>{demonstration.title}</span> — {demonstration.description}
          </p>
          <ul className={styles.projectLinks}>
            {demonstration.links.map((link) => (
              <li key={`${link.label}-${link.href}`}>
                {link.external ? (
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    <u>{link.label}</u>
                  </a>
                ) : (
                  <a href={link.href}>
                    <u>{link.label}</u>
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
