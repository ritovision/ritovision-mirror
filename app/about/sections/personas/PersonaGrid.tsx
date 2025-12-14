'use client';

import React from 'react';
import PersonaDesktopGrid from '../../components/PersonaDesktopGrid';
import PersonaBlock from '../../components/PersonaBlock';
import styles from './PersonaGrid.module.css';

const PersonaGrid: React.FC = () => {
  return (
    <div className={styles.desktopGridWrapper}>
      <PersonaDesktopGrid 
        topLeft={
          <PersonaBlock
            heading="Integrative Strategist"
            imageSrc="/images/pages/services/CoreServices/product.jpg"
            caption="Rito distills complexity into clarity to move the chessboard decisively—aligning layers of product, narrative, and execution into one cohesive strategy."
          />
        }
        topRight={
          <PersonaBlock
            heading="Engineer"
            imageSrc="/images/home/intro/rito-tinkering.png"
            caption="Bringing an engineer's discipline to problem-solving, Rito decomposes complex challenges into manageable components, identifies patterns across systems, and leverages AI to amplify creativity and technical capabilities."
          />
        }
        bottomLeft={
          <PersonaBlock
            heading="UX Architect"
            imageSrc="/images/pages/services/CoreServices/ux.jpg"
            caption="Championing a brand-centric vision rooted in user empathy, Rito orchestrates experiences that unite business goals, technical precision, and genuine human connection."
          />
        }
        bottomRight={
          <PersonaBlock
            heading="Artistic Storyteller"
            imageSrc="/images/pages/about/storyteller.jpg"
            caption="Rito creates narrative experiences where data finds its humanity—building emotional worlds around complex ideas, and inviting people into stories they can feel, follow, and believe in."
          />
        }
      />
    </div>
  );
};

export default PersonaGrid;
