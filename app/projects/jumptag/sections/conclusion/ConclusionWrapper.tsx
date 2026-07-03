// \test\app\projects\jumptag\sections\conclusion\ConclusionWrapper.tsx
'use client';

import React from 'react';
import Discontinue from './components/Discontinue';
import Conclusion from './components/Conclusion';
import ButtonGroup from '@/components/utilities/buttons/ButtonGroup';
import styles from './ConclusionWrapper.module.css';

export default function ConclusionWrapper() {
  return (
    <section id="conclusion" className={styles.wrapper}>
      <Discontinue />
      <Conclusion />
      <div className={styles.buttonGroupWrapper}>
        <ButtonGroup
          buttons={[
            {
              variant: 'blueAccentButton',
              text: 'Contact',
              href: '/contact',
            },
            {
              variant: 'blueAccentButton2',
              text: 'About',
              href: '/about',
            },
          ]}
          mobileMaxWidth="500px"
        />
      </div>
    </section>
  );
}
