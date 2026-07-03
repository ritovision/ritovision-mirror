// \test\app\projects\jumptag\sections\platform\components\SecondIteration.tsx
'use client';

import React from 'react';
import styles from './SecondIteration.module.css';

export default function SecondIteration() {
  return (
    <div className={`${styles.wrapper} defaulttopspace`}>
      <h3 id="second-iteration" className={styles.title}>Second Iteration</h3>
      <h4 className={styles.subheading}>Expanding Functionality with a New Stack</h4>

      <p className={styles.text}>
        After validating the core concept with a basic prototype, Rito moved into a more advanced build phase for Jumptag Club. To accelerate development, he brought on a freelance full‑stack developer, who recommended a modern architecture centered on SvelteKit, Vercel, PostgreSQL, and Prisma—a stack that would enable greater scalability, maintainability, and customization.
      </p>

      <p className={styles.text}>
        The most critical upgrade in this iteration was the introduction of a persistent backend database, which allowed users to store, manage, and switch between multiple saved destinations tied to their Jumptag. This shift from static routing to dynamic management marked a foundational evolution in how the product functioned. Users could now update or toggle their QR destinations with ease—whether switching from a portfolio to a crypto wallet, or between contact links and payment platforms.
      </p>

      <p className={styles.text}>
        Additional support was introduced for a variety of URI schemes, expanding Jumptag’s versatility across platforms:
      </p>
      <ul className={styles.list}>
        <li>Webapp URIs</li>
        <li>Phone numbers</li>
        <li>Text messages</li>
        <li>Email</li>
        <li>Ethereum wallet addresses</li>
      </ul>

      <div className={styles.centeredRedHeading}>UX Design &amp; Creative Direction</div>

      <p className={styles.text}>
        At the same time, the application began to take shape not just as a utility—but as a branded, stylistic experience. Rito led the UX design and creative direction, ensuring that the interface reflected the same visual identity as the physical product: clean, fashion‑forward, and user‑friendly. Attention to detail extended beyond functionality to the feeling of interacting with the app—reinforcing Jumptag Club’s identity as a culturally aware, aesthetically considered platform.
      </p>

      <p className={styles.text}>
        The user experience was meticulously crafted to feel seamless, approachable, and delightful—every flow guided users effortlessly from one task to the next. Early testers praised the clarity of controls, instant feedback, and cohesive visual language that made managing their Jumptag both intuitive and enjoyable.
      </p>

      <div className={styles.platformImageWrapper}>
        <p className={styles.imageDescription}>
          It was important to allow for seamless registration of Jumptags, accommodating users with different technical knowledge and prior app experiences. Scanning to register is one of the most intuitive entry points when first encountering the product.
        </p>
        <img
          src="/images/pages/projects/jumptag/platform/scan.jpg"
          alt="UX scan registration flow"
          className={styles.platformImage}
        />
        <div className={styles.caption}>
          User scanning a Jumptag to register it with their account
        </div>
      </div>

      <div className={styles.platformImageWrapper}>
        <p className={styles.imageDescription}>
          Striking the right balance between essential functionality and simplicity was its own challenge—especially given the product’s versatility. We conducted extensive testing and feedback sessions to confirm that controls were powerful yet approachable.
        </p>
        <img
          src="/images/pages/projects/jumptag/platform/jumptag-card.jpg"
          alt="Jumptag card control UI"
          className={styles.platformImage}
        />
        <div className={styles.caption}>
          The main panel for controlling the Jumptag
        </div>
      </div>

      <div className={styles.platformImageWrapper}>
        <p className={styles.imageDescription}>
          Wherever users landed in the Jumptag App, they needed to feel unmistakably “in Jumptag”—never in a generic interface. Form and function were married in a branded environment that felt both polished and effortless to use.
        </p>
        <img
          src="/images/pages/projects/jumptag/platform/list.png"
          alt="Destination list UI"
          className={styles.platformImage}
        />
        <div className={styles.caption}>
          Selecting from saved destinations to set the QR when scanned
        </div>
      </div>

      <p className={styles.text}>
        Rito remained hands-on throughout the process, managing product requirements, testing UX flows, and driving quality assurance to ensure every feature aligned with the vision of a modular, wearable, digital‑first identity layer.
      </p>
    </div>
  );
}
