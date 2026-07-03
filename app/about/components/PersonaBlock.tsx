'use client';
import React from 'react';
import styles from './PersonaBlock.module.css';

interface PersonaBlockProps {
  heading?: string;
  caption?: string;
  imageSrc?: string;
  animate?: boolean;
}

const PersonaBlock: React.FC<PersonaBlockProps> = ({
  heading = "Lorem Ipsum Dolor",
  caption = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.",
  imageSrc = "/images/home/hero/rito-picture1.png",
  animate = false,
}) => {
  return (
    <div className={styles.personaBlock}>
      <h3 className={`${styles.heading} ${animate ? styles.fadeInHeading : ''}`}>
        {heading}
      </h3>

      <div className={`${styles.imageContainer} ${animate ? styles.fadeInImage : ''}`}>
        <img 
          src={imageSrc} 
          alt="Persona" 
          className={`${styles.image} ${animate ? styles.dimImage : ''}`} 
        />
        <p className={`${styles.caption} ${animate ? styles.fadeInCaption : ''}`}>
          {caption}
        </p>
      </div>
    </div>
  );
};

export default PersonaBlock;
