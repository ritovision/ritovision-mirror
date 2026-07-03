// app\projects\entriken\sections\intro\components\TestimonialLocal.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import styles from './TestimonialLocal.module.css';
import ScrollRevealWrapper from '@/services/components/ScrollRevealWrapper';

export default function TestimonialLocal() {
  return (
    <div
      id="testimonial-entriken"
      className={`${styles.testimonialContainer} defaulttopspace defaultbottomspace blueglow`}
    >
      <ScrollRevealWrapper>
        <div className={styles.header}>
          <h2>Testimonial</h2>
        </div>
      </ScrollRevealWrapper>
      <div className={styles.content}>
        <ScrollRevealWrapper>
          <div className={styles.quoteColumn}>
            <p>
              This guy is a strategic thinker and marketing planner &amp; doer.
              <br />
              <br />
              ️ 60-page deck to define your product image? no problem
              <br />
              <br />
              ️ Pitch your project to a committee, who doesn't even know what
              they want? you got it
              <br />
              <br />
              ️ Go from zero-to-guru in a month to understand your market in
              technical niche detail? done
              <br />
              <br />
              ️ Self-starter, comes back with solutions before you've specced
              the problem? on it
            </p>
            <p>
              <br />
              I've personally seen him deliver each of these. So money. And has
              full product turns under belt.
            </p>
            <a
              href="https://x.com/fulldecent/status/1761944034254168378?s=19"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.sourceLink}
            >
              -Source-
            </a>
          </div>
        </ScrollRevealWrapper>
        <ScrollRevealWrapper>
          <div className={styles.imageColumn}>
            <a
              href="https://en.wikipedia.org/wiki/William_Entriken"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/images/pages/projects/entriken/hero/William_Entriken.png"
                alt="William Entriken"
                width={400}
                height={400}
                className={styles.image}
              />
            </a>
            <a
              href="https://en.wikipedia.org/wiki/William_Entriken"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.personLink}
            >
              William Entriken – Lead Author of ERC-721 and key pioneer of the
              multi-billion dollar NFT ecosystem
            </a>
          </div>
        </ScrollRevealWrapper>
      </div>
    </div>
  );
}
