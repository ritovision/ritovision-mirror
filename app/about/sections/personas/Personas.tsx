'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import styles from './Personas.module.css';
import TypewriterHeading from '@/components/utilities/presentation/TypewriterHeading';
import CardDraw from '@/components/utilities/presentation/CardDraw';

const DynamicPersonaFlex = dynamic(() => import('./PersonaFlex'), {
  ssr: false,
  loading: () => <div>Loading personas...</div>,
});

const DynamicPersonaGrid = dynamic(() => import('./PersonaGrid'), {
  ssr: false,
  loading: () => <div>Loading personas...</div>,
});

const Personas: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1099);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={styles.personasContainer}>
      <div className={styles.personasHeader}>
        <h2>Rito's Personas</h2>
        <p>
          Explore the multifaceted identities that make up Rito's approach — from systems thinker to creative technologist.
        </p>
      </div>

      {/* New CardDraw-Typewriter combo instance */}
      <div className={styles.personaBlock} style={{ marginTop: '40px' }}>
        <TypewriterHeading phrases={["Creative Visionary"]} scrollTrigger={100} />
        <CardDraw 
          imageSrc="/images/home/hero/rito-picture1.png"
          text="Rito's creative lens merges vision and constraint, where imagination & ambition are shaped by real-world systems, and ideas don't just shine, they ship."
          scrollTriggerOffset={200}
        />
      </div>

      {isMobile ? <DynamicPersonaFlex /> : <DynamicPersonaGrid />}
    </div>
  );
};

export default Personas;
