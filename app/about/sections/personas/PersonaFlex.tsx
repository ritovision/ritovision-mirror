'use client';

import React from 'react';
import TypewriterHeading from '@/components/utilities/presentation/TypewriterHeading';
import CardDraw from '@/components/utilities/presentation/CardDraw';
import styles from './Personas.module.css';

const PersonaFlex: React.FC = () => {
  return (
    <div className={styles.personasFlex}>
      <div className={styles.personaBlock}>
        <TypewriterHeading phrases={["Integrative Strategist"]} scrollTrigger={100}/>
        <CardDraw 
          imageSrc="/images/pages/services/CoreServices/product.jpg"
          text="Rito distills complexity into clarity to move the chessboard decisively—aligning layers of product, narrative, and execution into one cohesive strategy."
          scrollTriggerOffset={200}
        />
      </div>

      <div className={styles.personaBlock}>
        <TypewriterHeading phrases={["Engineer"]} scrollTrigger={100}/>
        <CardDraw 
          imageSrc="/images/home/intro/rito-tinkering.png"
          text="Bringing an engineer's discipline to problem-solving, Rito decomposes complex challenges into manageable components, identifies patterns across systems, and leverages AI to amplify creativity and technical capabilities."
          scrollTriggerOffset={250}
        />
      </div>

      <div className={styles.personaBlock}>
        <TypewriterHeading phrases={["UX Architect"]} scrollTrigger={100}/>
        <CardDraw 
          imageSrc="/images/pages/services/CoreServices/ux.jpg"
          text="Championing a brand-centric vision rooted in user empathy, Rito orchestrates experiences that unite business goals, technical precision, and genuine human connection."
          scrollTriggerOffset={250}
        />
      </div>

      <div className={styles.personaBlock}>
        <TypewriterHeading phrases={["Artistic Storyteller"]} scrollTrigger={100}/>
        <CardDraw 
          imageSrc="/images/pages/about/storyteller.jpg"
          text="Rito creates narrative experiences where data finds its humanity—building emotional worlds around complex ideas, and inviting people into stories they can feel, follow, and believe in."
          scrollTriggerOffset={250}
        />
      </div>
    </div>
  );
};

export default PersonaFlex;
