"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Intro.module.css";
import ButtonSection from "@/utilities/buttons/ButtonSection";
import OrbImage from "@/components/utilities/media/images/OrbImage";

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
        <h1 className="headingLarge redText">See From Rito&apos;s View</h1>

        <p>
          Rito is a <span className={styles.primaryRed}><strong>cross-functional</strong></span> Chief Product Officer,
          UX leader, and Full-Stack Engineer <span className={styles.primaryRed}><strong>specializing in user-facing systems</strong></span>,
          with a Master&apos;s in Human-Computer Interaction.
        </p>

        <p>
          He makes important outcomes <span className={styles.primaryRed}><strong>more predictable</strong></span> by <strong>leveraging his depth</strong> across <strong>Product, Brand, UX and Engineering</strong>{" "}
          to address <span className={styles.primaryRed}><strong>misalignments & ambiguities</strong></span> that are hard to see or manage.
        </p>

        <p>
          <strong className={styles.primaryRed}>How?</strong> He traces symptoms to their causes across domains, then repairs the system or improves decision-making around it.
        </p>

        <p className={styles.seamStatement}>
          He sees <span className={styles.seamWord}>between</span> the seams.
        </p>
        <p className={styles.seamStatement}>
          And he <span className={styles.seamWord}>builds.</span>
        </p>

        <OrbImage
          src="/images/home/intro/Rito-CEO.png"
          alt="Rito posing in a suit looking at viewer with monitors behind him"
          containerClassName={styles.contentImage}
          aspectRatio={1}
          sizes="(min-width: 730px) 700px, 100vw"
        />

        <h2 className={styles.subheading}>Cross-Functional Authority</h2>

        <FadeInSection>
          <p>
            A website he built was featured in <em>The New York Times</em>. <a href="/projects/fansite"><u>[Case Study]</u></a>
          </p>
          <p>
            He caused a <em>Call of Duty</em> studio to fix the game three separate times after his Quality Assurance videos got global press coverage including from <em>ScreenRant</em> and <em>Dexerto</em>. <a href="/projects/cod"><u>[Case Study]</u></a>
          </p>
          <p>
            He is a contributor to a dozen <span className={styles.primaryRed}>major Open Source Software ecosystems</span>, often focusing on developer experience serving millions of users, including Git, the Linux Kernel, OWASP, Ethereum EIP and LangChain. <a href="/projects/oss"><u>[Case Study]</u></a>

          </p>
          <OrbImage
            src="/images/pages/projects/oss/logos/oss-logos.png"
            alt="Open Source Software project logos including Git, Linux, OWASP, Ethereum, and LangChain"
            containerClassName={`${styles.featureImage} ${styles.ossImage}`}
            aspectRatio={1}
            sizes="(min-width: 730px) 467px, 100vw"
          />

          <section className={styles.engagementSection}>
            <h2 className={styles.engagementHeading}>How does Rito engage?</h2>
            <ul className={styles.engagementList}>
              <li>
                <strong className={styles.primaryRed}>Fractional Leadership</strong> — <span className={styles.engagementDescription}>An embedded strategic partner who helps make consequential decisions and participates directly in the work to carry them through.</span>
              </li>
              <li>
                <strong className={styles.primaryRed}>Advisory</strong> — <span className={styles.engagementDescription}>Senior cross-functional judgment for consequential decisions, helping you navigate trade-offs and ambiguity.</span>
              </li>
              <li>
                <strong className={styles.primaryRed}>Studio Delivery</strong> — <span className={styles.engagementDescription}>RitoVision independently takes responsibility for building and delivering a defined product, MVP, or system, bringing in the right specialists as needed.</span>
              </li>
            </ul>
          </section>

        </FadeInSection>

        <FadeInSection>
          <OrbImage
            src="/images/home/intro/rito-tinkering.png"
            alt="Rito tinkering with a robot with his hands and tools"
            containerClassName={styles.contentImage}
            aspectRatio={1}
            sizes="(min-width: 730px) 700px, 100vw"
          />
          <div className={`${styles.buttonSectionWrapper} customButtonSection`}>
            <ButtonSection
              title="What can RitoVision do for you?"
              buttonGroupProps={{
                buttons: [
                  { text: "Services", href: "/services", variant: "blackAndRedButton" },
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
