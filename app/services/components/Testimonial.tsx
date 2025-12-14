import React from 'react';
import styles from './Testimonial.module.css';
import ScrollRevealWrapper from './ScrollRevealWrapper';

const Testimonial: React.FC = () => {
  return (
    <div className={`${styles.testimonialContainer} blueglow`}>
      {/* Header wrapped for animation */}
      <ScrollRevealWrapper>
        <div className={styles.header}>
          <h2>Testimonial</h2>
        </div>
      </ScrollRevealWrapper>

      {/* Content area: two columns */}
      <div className={styles.content}>
        {/* Left column: Quote text and Source link */}
        <ScrollRevealWrapper>
          <div className={styles.quoteColumn}>
            <p>
              This guy is a strategic thinker and marketing planner &amp; doer.
              <br /><br />
              60-page deck to define your product image? no problem
              <br /><br />
              Pitch your project to a committee, who doesn't even know what they want? you got it
              <br /><br />
              Go from zero-to-guru in a month to understand your market in technical niche detail? done
              <br /><br />
              Self-starter, comes back with solutions before you've specced the problem? on it
            </p>
            <p>
              <br />
              I've personally seen him deliver each of these. So money. And has full product turns under belt.
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

        {/* Right column: Image and person link */}
        <ScrollRevealWrapper>
          <div className={styles.imageColumn}>
            <a
              href="https://en.wikipedia.org/wiki/William_Entriken"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/images/pages/services/engagement/Will-Entriken.png"
                alt="William Entriken"
                className={styles.image}
              />
            </a>
            <a
              href="https://en.wikipedia.org/wiki/William_Entriken"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.personLink}
            >
              William Entriken - Lead Author of ERC-721 and key pioneer of the multi-billion dollar NFT eco-system
            </a>
          </div>
        </ScrollRevealWrapper>
      </div>
    </div>
  );
};

export default Testimonial;
