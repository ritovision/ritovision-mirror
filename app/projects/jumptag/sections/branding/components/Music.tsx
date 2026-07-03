// \test\app\projects\jumptag\sections\branding\components\Music.tsx
'use client';

import React from 'react';
import CustomAudioPlayer from '@/components/utilities/media/audio/CustomAudioPlayer';
import styles from './Music.module.css';

export default function Music() {
  return (
    <div className={`${styles.wrapper} defaulttopspace`}>
      <h3 id="music" className={styles.title}>Music</h3>
      <div className={styles.content}>
        <p className={styles.text}>
          As part of Jumptag Club’s broader brand expression, Rito produced a playful, high-energy EDM parody track titled “Let’s Get Phygital”—a creative remix and lyrical reimagining of the iconic 1980s hit “Physical.” The rework replaces the original theme with a tongue-in-cheek celebration of “phygital” culture, bridging fashion, tech, and identity in the same spirit as the brand itself.
          
          <br /><br />

          Rito served as the producer and lyricist, crafting the rewritten vocals to strike a careful balance between humor, brand messaging, and musical quality. The track was intentionally designed for use on a fashion runway or as social media promo content, pairing energetic beats with lines that highlight the wearable nature and lifestyle vibe of Jumptag Club—without tipping into commercial jingle territory.

          <br /><br />

          The backing instrumental was synthesized from karaoke stems and adapted to create a polished EDM foundation. The vocals were performed by a male singer and audio engineer, who brought exceptional tone and production value to the project—refining the mix, enhancing the vocal performance, and delivering a final master that elevated the track into a fully realized creative asset.

          <br /><br />

          While never officially used in a campaign, the song exists as a music-forward brand artifact—one that reflects the irreverent, cross-genre spirit of Jumptag Club, and stands ready for future runway use, video production, or digital storytelling.
        </p>
        <div className={styles.audioWrapper}>
          <CustomAudioPlayer
            title="Phygital"
            audioSrc="\audio\Phygital.mp3"
          />
        </div>
      </div>
    </div>
  );
}
