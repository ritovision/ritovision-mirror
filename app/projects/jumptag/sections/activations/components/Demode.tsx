//app\projects\jumptag\sections\activations\components\Demode.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import styles from './Demode.module.css';

export default function Demode() {
  return (
    <div className={styles.wrapper}>
      <h3 id="future-forward-fashion-show-feature" className={styles.title}>
        Exclusive Fashion Show Feature
      </h3>
      <h4 className={styles.subheading}>
        Jumptag Club at DeMode, NYFW
      </h4>

      <p className={styles.text}>
        The turning point for Jumptag Club’s public debut came during New York Fashion Week, at an exclusive event titled DeMode, hosted at Mercedes-Benz Manhattan in September 2023. Organized by Emily Burnette, the show brought together a curated group of designers exploring the future of fashion—and Rito’s wearable tech unexpectedly became a centerpiece of the experience.
      </p>

      <p className={styles.text}>
        The opportunity came through organic networking. While attending a Fashion Mingle event, Rito connected with Emily and shared the Jumptag concept. With only a few days' notice, he was invited to participate in DeMode. There was little clarity on how exactly the show would be structured, but Rito arrived prepared—with hardware, branding, and production-ready Jumptags in hand.
      </p>

      <p className={styles.text}>
        What unfolded was a moment of unexpected spotlight.
      </p>

      <div className={styles.fashionFloorContainer}>
        <Image
          src="/images/pages/projects/jumptag/demode/fashionfloor.jpg"
          alt="DeMode Fashion Show Floor"
          width={1200}
          height={800}
          className={styles.fashionFloorImage}
        />
        <p className={styles.fashionFloorCaption}>
          DeMode Fashion Show Floor
        </p>
      </div>

      <div className={styles.romeoWrapper}>
        <div className={styles.romeoItem}>
          <Image
            src="/images/pages/projects/jumptag/demode/romeohunte.jpg"
            alt="Romeo Hunte dressing his model wearing a jumptag set to his website"
            width={1200}
            height={800}
            className={styles.romeoImage}
          />
          <p className={styles.romeoCaption}>
            Romeo Hunte dressing his model wearing a jumptag set to his website
          </p>
        </div>
        <div className={styles.modelItem}>
          <Image
            src="/images/pages/projects/jumptag/demode/romeohunte-model.jpg"
            alt="Model wearing Jumptag by Romeo Hunte"
            width={800}
            height={1200}
            className={styles.modelImage}
          />
        </div>
      </div>

      <div className={styles.scanContainer}>
        <Image
          src="/images/pages/projects/jumptag/demode/romeohunte-scan.jpg"
          alt="Guests scanning the model's Jumptag"
          width={1200}
          height={800}
          className={styles.scanImage}
        />
        <p className={styles.scanCaption}>
          Guests scanning the model's Jumptag with their phone's regular camera app or any generic QR scanner will jump to his website
        </p>
      </div>

      <p className={styles.text}>
        Jumptag Club quickly became the anchor wearable tech of the entire event, integrated into nearly every designer’s showcase as a unifying accessory. High-profile participants included Pamela Dennis, Romeo Hunte, and other emerging names—each leveraging Jumptags to extend their collections into the digital layer, including repurposing it as a bracelet in one case. The tags were worn by models standing on display platforms and moving throughout the venue, allowing guests to scan the wearable QR codes and interact with live digital content in real time unique to each designer.
      </p>

      <p className={styles.text}>
        Key outcomes from the activation included:
      </p>
      <p className={styles.bullet}>
        • 100% scan processing and uptime, demonstrating real-world performance under pressure
      </p>
      <p className={styles.bullet}>
        • Elegant integration across multiple design aesthetics, showcasing the product’s flexibility
      </p>
      <p className={styles.bullet}>
        • Active guest interaction, confirming usability, curiosity, and functionality under live conditions
      </p>

      <div className={styles.groupWrapper}>
        <div className={styles.groupItem}>
          <Image
            src="/images/pages/projects/jumptag/demode/group-emily.jpg"
            alt="Rito, Emily Burnette and Pamela Dennis"
            width={1200}
            height={800}
            className={styles.groupImage}
          />
          <p className={styles.groupCaption}>
            Rito, Emily Burnette and Pamela Dennis
          </p>
        </div>
        <div className={styles.groupItem}>
          <Image
            src="/images/pages/projects/jumptag/demode/group-designers.jpg"
            alt="Designers including Pamela Dennis, Rito, Jax"
            width={1200}
            height={800}
            className={styles.groupImage}
          />
          <p className={styles.groupCaption}>
            Designers including Pamela Dennis, Rito, Jax
          </p>
        </div>
      </div>

      <p className={styles.photographerText}>
        Rito also served as a photographer, documenting the experience while ensuring the Jumptags were presented both stylistically and technically at their best.
      </p>

      <div className={styles.photoWrapper}>
        <Image
          src="/images/pages/projects/jumptag/demode/pameladennis.jpg"
          alt="Model wearing a Pamela Dennis dress and a jumptag purposed as a bracelet and set to her brand's instagram"
          width={450}
          height={675}
          className={styles.photoImage}
        />
        <p className={styles.photoCaption}>
          Model wearing a Pamela Dennis dress and a jumptag purposed as a bracelet and set to her brand's instagram
        </p>
      </div>

      <p className={styles.text}>
        Though the event was private and not metrics-driven, the show proved a critical use case: Jumptag Club could seamlessly empower fashion designers with real-time, interactive digital extensions—without needing to alter their creative vision.
      </p>

      <div className={styles.terryContainer}>
        <Image
          src="/images/pages/projects/jumptag/demode/rito-terry-singh.jpg"
          alt="Bonus: Rito ran into renowned men's fashion designer Terry Singh outside of the event and they shared a jumptag moment together"
          width={450}
          height={675}
          className={styles.terryImage}
        />
        <p className={styles.terryCaption}>
          Bonus: Rito ran into renowned men's fashion designer Terry Singh outside of the event and they shared a jumptag moment together
        </p>
      </div>
    </div>
  );
}
