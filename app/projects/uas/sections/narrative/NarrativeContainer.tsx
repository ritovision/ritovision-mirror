// ./app/projects/uas/sections/narrative/NarrativeContainer.tsx
import React from 'react';
import styles from './NarrativeContainer.module.css';
import IntroNarrative from './IntroNarrative';
import PartI from './PartI';
import PartII from './PartII';
import PartIII from './PartIII'; // eslint-disable-line @typescript-eslint/no-unused-vars -- TODO: add content when ready
import PartIV from './PartIV'; // eslint-disable-line @typescript-eslint/no-unused-vars -- TODO: add content when ready
import PartV from './PartV'; // eslint-disable-line @typescript-eslint/no-unused-vars -- TODO: add content when ready
import PartVI from './PartVI'; // eslint-disable-line @typescript-eslint/no-unused-vars -- TODO: add content when ready

export default function NarrativeContainer() {
  return (
    <div className={`${styles.narrativeContainer} defaulttopspace defaultbottomspace`}>
      <IntroNarrative />
      <PartI />
      <PartII />
      {/* TODO: Render PartIII–PartVI when content is ready */}
    </div>
  );
}
