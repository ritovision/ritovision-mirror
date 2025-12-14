// FILE PATH: app/projects/components/ProjectIntro.tsx

'use client';

import React from 'react';
import Image from 'next/image';
import Tags from './Tags';
import Button from '../../components/utilities/buttons/Button';
import styles from './ProjectIntro.module.css';

type ProjectIntroProps = {
  title: string;
  text: string;
  imageAlt?: string;
  tags?: string[];
  hasAction?: boolean;
} & (
  | {
      imageSrc: string;
      customMedia?: never;
    }
  | {
      imageSrc?: never;
      customMedia: React.ReactNode;
    }
);

export default function ProjectIntro(props: ProjectIntroProps) {
  const { title, text, imageAlt = 'Project Image', tags, customMedia, hasAction = true } = props;

  // Normalize any incoming element(s) so arrays/fragments get stable keys.
  const media = customMedia
    ? React.Children.toArray(customMedia)
    : (
      <div className={styles.imageWrapper}>
        <Image
          src={props.imageSrc!}
          alt={imageAlt}
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>
    );

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{title}</h3>

      {media}

      <p className={styles.text}>{text}</p>

      {hasAction && (
        <div className={styles.buttonWrapper}>
          <Button text="Case Study" variant="blueAccentButton" />
        </div>
      )}

      {tags && tags.length > 0 && (
        <div className={styles.tagsWrapper}>
          <Tags initialTags={tags} />
        </div>
      )}
    </div>
  );
}
