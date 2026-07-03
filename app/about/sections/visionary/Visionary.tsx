import React from 'react';
import CustomCard from '../../components/CustomCard';
import SectionLineWrapper from '@/components/utilities/sections/SectionLineWrapper';
import styles from './Visionary.module.css';

interface CardData {
  title: string;
  imageSrc: string;
  text: string;
}

const cardData: CardData[] = [
  {
    title: "The Big Picture's a Map",
    imageSrc: "/images/pages/about/bigpicture.png",
    text: "Solutions aren't one-size-fits-all. Whether in business, technology, or creative projects, the best outcomes emerge from understanding the unique needs and behaviors of the people you're serving. It's about crafting experiences and solutions that are as individualized as the audiences they aim to impact."
  },
  {
    title: "Context is Key",
    imageSrc: "/images/pages/about/Context-is-Key.webp",
    text: "A part's purpose is not static—it transforms through its interactions with other elements. The value of any component is defined by the role it plays in different situations, adapting and evolving based on the relationships it forms and the tasks it undertakes. By understanding these dynamic connections, I shape solutions that are flexible, adaptable, and relevant to their ever-changing environments."
  },
  {
    title: "Feedback is a Compass",
    imageSrc: "/images/pages/about/feedback.webp",
    text: "Feedback is essential in any endeavor—it's a compass that guides decision-making and shapes outcomes. By gathering insights from every step of the process, whether it's from clients, stakeholders, or users, I ensure that projects evolve in ways that are aligned with both the vision and practical realities."
  },
  {
    title: "Perspective is Magic",
    imageSrc: "/images/pages/about/Perspective-is-magic.webp",
    text: "Imagining reality from multiple perspectives unlocks new possibilities. Whether empathizing with others or framing the lens from a certain discipline, I channel diverse perspectives strategically to transform abstract ideas and theories into tangible solutions with real-world impact."
  },
  {
    title: "Precedents are Not Laws",
    imageSrc: "/images/pages/about/Precedents-are-not-laws.webp",
    text: "Trends and tradition have their place, but I don't let them dictate the path forward. Just because something has always been done a certain way doesn't mean it's the best approach. I challenge norms, question the status quo, and explore new ways of doing things to find innovative solutions that break away from convention as necessary. If I reinvent the wheel, it's for a strategic reason and NOT for the sake of being a contrarian."
  },
  {
    title: "Usability is Relative",
    imageSrc: "/images/pages/about/relative.png",
    text: "Solutions aren't one-size-fits-all. Whether in business, technology, or creative projects, the best outcomes emerge from understanding the unique needs and behaviors of the people you're serving. It's about crafting experiences and solutions that are as individualized as the audiences they aim to impact."
  }
];

export const Visionary: React.FC = () => {
  return (
    <div>
      <div className={styles.visionaryHeader}>
        <h2>Rito's Visionary Principles</h2>
        <p>
        When working with Rito, it's not just about getting the right deliverables... People resonate with the way he thinks and approaches problems. These principles define that mindset and guide how he tackles high-stakes, cross-functional work—from infrastructure and messaging to governance and product strategy.
        </p>
      </div>
      <SectionLineWrapper>
        <div className={styles.cardGrid}>
          {cardData.map((card, index) => (
            <CustomCard
              key={index}
              title={card.title}
              imageSrc={card.imageSrc}
              text={card.text}
            />
          ))}
        </div>
      </SectionLineWrapper>
    </div>
  );
};

export default Visionary;
