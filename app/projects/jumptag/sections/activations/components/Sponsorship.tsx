// \test\app\projects\jumptag\sections\activations\components\Sponsorship.tsx
'use client';

import React from 'react';
import styles from './Sponsorship.module.css';

export default function Sponsorship() {
  return (
    <div className={`${styles.wrapper} defaulttopspace`}>
      <h3 id="fashion-show-sponsorship" className={styles.title}>
        Fashion Show Sponsorship
      </h3>
      <h4 className={styles.subheading}>
        Real-World Testing & Unexpected Insights
      </h4>

      <p className={styles.text}>
        To test the third iteration in a real-world setting, Jumptag Club served as an official sponsor for a Fashion Mingle x Asia Society event held during New York Fashion Week.
      </p>

      <div className={styles.imageContainer}>
        <img
          src="/images/pages/projects/jumptag/sponsorship/fashionmingle.jpg"
          alt="Fashion Mingle x Asia Society event sponsorship"
          className={`${styles.image} ${styles.imageMingle}`}
        />
        <img
          src="/images/pages/projects/jumptag/sponsorship/asiasociety.jpg"
          alt="Asia Society event sponsorship"
          className={`${styles.image} ${styles.imageAsia}`}
        />
      </div>

      <p className={styles.text}>
        The event featured a dozen independent fashion brands, live runway presentations, and a speaker series. Among the designers was Ajay, the founder of Gingerblu, who actively used a Jumptag throughout the event to share his website, contact info, and phone number during networking.
      </p>

      <div className={styles.singleImageWrapper}>
        <img
          src="/images/pages/projects/jumptag/sponsorship/speaking.jpg"
          alt="Ajay and other fashion designers during speaker panel"
          className={styles.singleImage}
        />
        <div className={styles.caption}>
          Ajay and other fashion designers during speaker panel
        </div>
      </div>

      <div className={styles.twoColumnContainer}>
        <div className={styles.leftColumn}>
          <div className={styles.twoImageItem}>
            <img
              src="/images/pages/projects/jumptag/sponsorship/ajay-fashionshow.jpg"
              alt="Live runway presentation"
              className={styles.twoImage}
            />
            <div className={styles.caption}>Live runway presentation</div>
          </div>
          <div className={styles.twoImageItem}>
            <img
              src="/images/pages/projects/jumptag/sponsorship/groupphoto.jpg"
              alt="Rito with Ajay and Fashion Mingle, and Jumptag Club logo on banner"
              className={styles.twoImage}
            />
            <div className={styles.caption}>
              Rito with Ajay and Fashion Mingle, and Jumptag Club logo on banner
            </div>
          </div>
        </div>
        <div className={styles.rightColumn}>
          <div className={styles.twoImageItem}>
            <img
              src="/images/pages/projects/jumptag/sponsorship/Ajay-jumptag.jpg"
              alt="Ajay unveiling his jumptag backstage for networking"
              className={styles.twoImage}
            />
            <div className={styles.caption}>
              Ajay unveiling his jumptag backstage for networking
            </div>
          </div>
        </div>
      </div>

      <p className={styles.text}>
        The activation demonstrated how Jumptags could operate seamlessly in live, high-touch settings—used organically in a professional environment, with real-time interactions captured and documented. But the experience also revealed an unexpected insight during testing.
      </p>

      <p className={styles.text}>
        While Jumptag Club had released its Android app first as a low-friction entry point for internal testing, the plan had always included iOS development. Android was chosen to validate the core functionality in a live environment with faster deployment timelines—not as an exclusive platform.
      </p>

      <p className={styles.text}>
        What surprised the team wasn’t the lack of adoption—it was the complete absence of Android users at the event. Despite Android holding the global majority of smartphone market share, everyone Rito encountered in this fashion-forward NYC setting used iPhones. Designers, media reps, staff, and attendees—all were part of an ecosystem that revolved around iOS-exclusive tools like iMessage, Airdrop, and FaceTime.
      </p>

      <p className={styles.text}>
        This wasn’t a known industry stat—it wasn’t something readily researchable. But through direct engagement, the team uncovered a boots-on-the-ground ethnographic insight: in fashion circles—especially in cities like New York—iPhone isn’t just common, it’s culturally embedded. Though users could still access the Jumptag App web platform without issue, the experience clarified the need to prioritize iOS development if the platform were to scale within this audience.
      </p>

      <p className={styles.text}>
        Rito, who also served as photographer for the event, captured Jumptags being used in context—showing their utility and flexibility even amidst platform limitations. The event offered strategic validation, hands-on learning, and deeper alignment with the audience’s behavioral norms.
      </p>
    </div>
  );
}
