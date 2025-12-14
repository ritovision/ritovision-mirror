'use client';

import React from 'react';
import styles from './Book.module.css';

export default function Book() {
  return (
    <div id="book-author" className={`${styles.wrapper} defaulttopspace`}>

      {/* Top section: title, text, image */}
      <div className={styles.bookContainer}>
        <h2 className={styles.firstTitle}>Book Author</h2>
        <p className={styles.paragraph}>
          Expanding his profile as a multidisciplinary innovator, William Entriken also holds a publishing credit as the author of Nineteen Eighty-Five — a modernized reinterpretation of George Orwell’s classic dystopian novel, 1984.
        </p>
        <p className={styles.paragraph}>
          Rather than simply rewriting the text, William approached the project as a creative software exercise: he authored a Perl script that automatically replaced key terms and concepts from the original novel with updated references relevant to contemporary socio-political dynamics. The resulting work places Orwell’s themes in today’s world of hashtags, surveillance culture, cancel culture, and evolving political narratives — reflecting William’s ability to blend technical ingenuity with cultural commentary.
        </p>
        <img
          src="/images/pages/projects/entriken/1985.png"
          alt="1985 Book Cover"
          className={styles.image}
        />
      </div>

      {/* Analysis section */}
      <div className={styles.bookContainer}>
        <h3 className={styles.headingPrimary}>Perception and Branding Opportunities</h3>

        <h4 className={styles.subheading}>Thought Leadership Signal:</h4>
        <p className={styles.paragraph}>
          Publishing a book — even an unconventional one — reinforces the perception of William as a thought leader engaged with societal systems, not just technology.
        </p>

        <h4 className={styles.subheading}>Accessible Cultural Anchor:</h4>
        <p className={styles.paragraph}>
          Association with 1984 provides immediate recognizability, allowing audiences to grasp the conceptual relevance without needing in-depth technical understanding.
        </p>

        <h4 className={styles.subheading}>Novelty Positioning:</h4>
        <p className={styles.paragraph}>
          The method of creation — programming the book’s rewrite — strengthens William’s brand as a polymathic builder who bridges technology, culture, and commentary.
        </p>

        <h4 className={styles.subheading}>Strengthening the Intellectual Dimension:</h4>
        <p className={styles.paragraph}>
          Having a published work, even as a creative remix, expands William’s narrative as a thinker and innovator, not just an engineer or strategist.
        </p>

        <h4 className={styles.subheading}>Softening Technical Perception:</h4>
        <p className={styles.paragraph}>
          The book acts as a relatable touchpoint for broader audiences, humanizing the more technical aspects of William’s brand by demonstrating creativity and wit.
        </p>

        <h4 className={styles.subheading}>Showcasing Cross-Disciplinary Creativity:</h4>
        <p className={styles.paragraph}>
          The project exemplifies William’s ability to apply software skills beyond traditional applications — into areas of art, literature, and social observation.
        </p>
      </div>

      {/* Summary section */}
      <div className={styles.bookContainer}>
        <h3 className={styles.headingPrimary}>Summary</h3>
        <p className={styles.paragraph}>
          William Entriken’s unconventional authorship of Nineteen Eighty-Five underscores his versatility as a technologist and commentator, reinforcing a brand narrative rooted in innovation, critical thinking, and cultural engagement. It serves as both a creative proof point and a thought leadership signal — positioning him not only as a builder of systems, but also as an observer and critic of the systems shaping modern society.
        </p>
      </div>

    </div>
  );
}
