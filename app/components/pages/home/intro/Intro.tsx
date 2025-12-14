"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Intro.module.css";
import ButtonSection from "@/utilities/buttons/ButtonSection";

const FadeInSection: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const ratio = window.innerWidth < 730 ? 0.2 : 0.1;
    const rootMargin = `0px 0px -${ratio * 100}% 0px`;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin, threshold: 0 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${styles.fadeInSection} ${isVisible ? styles.visible : ""}`}
    >
      {children}
    </div>
  );
};

export default function Intro() {
  const overallRef = useRef<HTMLDivElement>(null);
  const [overallVisible, setOverallVisible] = useState(false);

  useEffect(() => {
    const ratio = window.innerWidth < 730 ? 0.2 : 0.1;
    const rootMargin = `0px 0px -${ratio * 100}% 0px`;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setOverallVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin, threshold: 0 }
    );

    if (overallRef.current) observer.observe(overallRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={overallRef}
      className={`${styles.introWrapper} ${overallVisible ? styles.overallVisible : ""}`}
    >
      <div className={styles.introContent}>
        <h1 className="headingLarge redText">Meet Rito</h1>

        <p>
          You can think of Rito as a <strong>Creative-Strategic Powerhouse</strong> building flagship product experiences
           while applying his superpower of filling cracks across <strong>Product</strong>, <strong>Brand</strong>, <strong>UX</strong> &amp;{" "}
          <strong>Technology</strong> to de-risk <span className={styles.primaryRed}>vision</span> and
          <span className={styles.primaryRed}> complexity</span>.
          <br />
          <br />
          With an <strong>M.S. in Human–Computer Interaction</strong> and a trove of
          multi-disciplinary projects, his background brings over a decade of experience leading
          startups and building digital products with his own hands. Rito has{" "}
          <strong>Chief Product (CPO) / Experience Officer (CXO) expertise</strong> but specializes in applying
          his rare ability to{" "}
          <span className={styles.primaryRed}>synthesize and integrate</span> across domains to solve
          complex business challenges.
          <br />
          <br />
          Typically reserved for large corporations, <span className={styles.primaryRed}>Chief Integration Officer</span> (CiNO — like "See-No") is the title he uses to capture his hybrid role.
          Just as the CTO role is vastly different in startups than corporations, Rito embodies the startup pedigree of the term
          where he brings <strong>executive level strategy</strong> <span className={styles.primaryRed}>and</span> cross-functional hands-on execution including as a <strong>Full-Stack
          Developer, UX Engineer and Product Designer</strong>.
          <br />
          <br />
          RitoVision is his hybrid studio, consultancy, and fractional C-suite partner vehicle for
          delivering bespoke digital solutions and software development.
        </p>

        <img
          src="/images/home/intro/Rito-CEO.png"
          alt="Rito posing in a suit looking at viewer with monitors behind him"
          className={styles.contentImage}
        />
        <h3 className={styles.imageCaption}>A Creative-Strategic Authority</h3>

        <FadeInSection>
          <p>
            Rito's eclectic work has been featured in <span className={styles.primaryRed}>high-profile media outlets</span> including{" "}
            <em>The New York Times</em>, <em>ScreenRant</em>, and <em>U.Today</em>, and he's been
            profiled in feature interviews on NYC's Flagship <em>77 WABC</em> radio and{" "}
            <em>Stockhead</em> magazine showcasing his thought-leadership in technology and
            charismatic poise.
          </p>

          <p>
            Rito's made high-visibility contributions to <span className={styles.primaryRed}>major Open Source projects' websites</span> serving millions of users each month including <a href="https://github.com/kubernetes/website/pull/52386" target="_blank" rel="noopener noreferrer"><u>Kubernetes</u></a>, <a href="https://github.com/ethereum/EIPs/pull/10358" target="_blank" rel="noopener noreferrer"><u>Ethereum EIP</u></a>, <a href="https://github.com/langchain-ai/langchainjs/pull/8942" target="_blank" rel="noopener noreferrer"><u>LangChain</u></a> and <a href="https://github.com/storybookjs/web/pull/342" target="_blank" rel="noopener noreferrer"><u>Storybook</u></a>.

          </p>

          <p>
            He consistently demonstrates profound insight and creativity across diverse fields. This
            includes speaking (and even rapping) on <span className={styles.primaryRed}>live radio</span> about culture and technology;
            <span className={styles.primaryRed}> co-authoring a blockchain standard with William Entriken</span> (the pioneering architect of
            ERC-721 NFTs); designing wearable tech <span className={styles.primaryRed}>showcased by celebrity fashion designers</span>;
            leveraging global press coverage to spur a AAA studio to patch bugs in the
            multi-billion-dollar <span className={styles.primaryRed}>Call of Duty franchise</span>; and spearheading end-to-end platform
            development for high-profile individuals.
          </p>

          <h3 className={styles.imageCaption}>Live Demonstrations</h3>
          <p>
            You can see his Open Source projects that he built end-to-end exemplifying craftsmanship across Product, Brand, UX & Technology, including this very <a href="https://github.com/ritovision/ritovision-mirror" target="_blank" rel="noopener noreferrer"><u>website</u></a> with a <a href="https://ui.ritovision.com" target="_blank" rel="noopener noreferrer"><u>UI showcase</u></a>.
          </p>

          <p className={styles.projectTitle}>
            <a href="https://ritoswap.com" target="_blank" rel="noopener noreferrer" className={styles.primaryRed}><strong>RitoSwap</strong></a> — a blockchain dApp and multi-modal agentic chatbot showcase
          </p>
          <ul className={styles.projectLinks}>
            <li>
              <a href="https://ritoswap.com" target="_blank" rel="noopener noreferrer"><u>Live site</u></a>
            </li>
            <li>
              <a href="https://github.com/ritovision/ritoswap-mirror" target="_blank" rel="noopener noreferrer"><u>Source code on Github</u></a>
            </li>
            <li>
              <a href="https://docs.ritoswap.com" target="_blank" rel="noopener noreferrer"><u>Full documentation site</u></a>
            </li>
          </ul>

          <p className={styles.projectTitle}>
            <a href="https://carolinevreeland.com" target="_blank" rel="noopener noreferrer" className={styles.primaryRed}><strong>CarolineVreeland</strong></a> — NYT-featured website pioneering a "AFL", lightweight architecture for serving users and AI distinct experiences
          </p>
          <ul className={styles.projectLinks}>
            <li>
              <a href="https://carolinevreeland.com" target="_blank" rel="noopener noreferrer"><u>Live site</u></a>
            </li>
            <li>
              <a href="https://github.com/ritovision/vreeland-fansite" target="_blank" rel="noopener noreferrer"><u>Source code on Github</u></a>
            </li>
          </ul>

          <p className={styles.projectTitle}>
            <a href="https://web3ld.org" target="_blank" rel="noopener noreferrer" className={styles.primaryRed}><strong>Web3LD</strong></a> — An initiative expanding the semantic web
          </p>
          <ul className={styles.projectLinks}>
            <li>
              <a href="https://web3ld.org" target="_blank" rel="noopener noreferrer"><u>Live site</u></a>
            </li>
            <li>
              <a href="https://github.com/web3ld/web3ld-website" target="_blank" rel="noopener noreferrer"><u>Info page source code on Github</u></a>
            </li>
          </ul>
        </FadeInSection>

        <FadeInSection>
          <img
            src="/images/home/intro/rito-tinkering.png"
            alt="Rito tinkering with a robot with his hands and tools"
            className={styles.contentImage}
          />
          <h3 className={styles.imageCaption}>Built for the Product Lifecycle</h3>
        </FadeInSection>

        <FadeInSection>
          <p>
            Rito operates in the critical space between strategy and execution, where direction
            matters most and imagination needs solid grounding. Whether as a strategist defining
            roadmaps, a hands-on builder coding MVPs, or an auditor rescuing stalled products, Rito
            delivers authentic direction that harmonizes vision, product-market fit, and audience
            connection to deliver measurable business outcomes.
          </p>
        </FadeInSection>

        <FadeInSection>
          <div className={`${styles.buttonSectionWrapper} customButtonSection`}>
            <ButtonSection
              title="What can RitoVision do for you?"
              buttonGroupProps={{
                buttons: [
                  { text: "Learn More", href: "/about", variant: "blackAndRedButton" },
                  { text: "Contact", href: "/contact", variant: "blueAccentButton" },
                ],
              }}
              withBackground={false}
              className="customButtonSection"
            />
          </div>
          <style jsx global>{`
            .customButtonSection h3 {
              font-size: clamp(1rem, 2vw, 1.5rem) !important;
            }
            @media (max-width: 729px) {
              .customButtonSection {
                margin-top: 20%;
              }
            }
          `}</style>
        </FadeInSection>
      </div>
    </div>
  );
}
