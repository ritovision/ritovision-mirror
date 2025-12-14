// c:/Users/Mattj/ritovision website/test/app/projects/uas/sections/erc/ERC.tsx
'use client';

import React from 'react';
import Moat from './components/Moat';
import UAS from './components/UAS';
import Proposal from './components/Proposal';
import Podcast from './components/Podcast';
import styles from './ERC.module.css';

export default function ERC() {
  return (
    <section className={styles.ercSection}>
      <Moat />
      <UAS />
      <Proposal />
      <Podcast />
    </section>
  );
}
