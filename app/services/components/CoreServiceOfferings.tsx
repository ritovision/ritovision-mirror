// c:/Users/Mattj/ritovision website/test/app/components/pages/services/CoreServiceOfferings.tsx
import React from 'react';
import styles from './CoreServiceOfferings.module.css';
import ServiceSlider from './ServiceSlider';

const sliderData = [
  {
    backgroundImage: '/images/pages/services/CoreServices/product.jpg',
    heading: 'Product Strategy & Management',
    slides: [
      'Navigating the ever-evolving complexities of bringing a product to market, or pivoting to a new one.',
      'Shape a product vision rooted in real audience needs and a value proposition that drives business growth and adoption',
      'Develop clear product roadmaps by identifying key milestones, risks, opportunities, and stakeholder needs.',
      'Turn strategy into action by aligning teams, timelines, and priorities across all moving parts.',
      'Build, measure, and adapt with continuous iteration guided by feedback, usage data, and evolving business goals.',
    ],
  },
  {
    backgroundImage: '/images/pages/services/CoreServices/ux.jpg',
    heading: 'UX Strategy, Architecture & Design',
    slides: [
      'Rito designs premium experiences rooted in brand truth and real user behavior—turning that first tap into trust that drives results.',
      'Where product and marketing often diverge, Rito unites them —turning user insight into design that reveals blind spots and clarifies what truly matters.',
      'Bringing calm to the complex —architecting elegant systems that scale effortlessly and grow with intention.',
      'Accessibility not as compromise, but as craft—expanding reach without sacrificing refinement.',
      'From strategy to prototyping to validation, Rito builds hands-on design that challenges assumptions and accelerates business.',
    ],
  },
  {
    backgroundImage: '/images/pages/services/CoreServices/fullstack.jpg',
    heading: 'Full Stack Engineering',
    slides: [
      'Foundations built for longevity —robust website and web app architecture using modern frameworks and scalable infrastructure.',
      'Elegant, responsive interfaces that adapt seamlessly across screens and browsers.',
      'Custom REST and GraphQL APIs —designed for performance, security, and ease of integration.',
      'Strategic SEO, ARIA support for accessibility, semantic markup, and structured data baked in.',
      'Diligent Quality Assurance testing for edge cases, usability, and long-term reliability.',
      'Leveraging blockchain, cloud infrastructure and edge computing for fast and scalable systems.',
    ],
  },
  {
    backgroundImage: '/images/pages/services/CoreServices/mobile.jpg',
    heading: 'Mobile App Development',
    slides: [
      'Deliver polished mobile experiences that drive engagement and harness the full power of modern devices.',
      'Streamline iOS and Android development with a single codebase using hybrid frameworks like React Native',
      'Connect with your backend and integrate push notifications for personalized, real-time user engagement.',
      'Build performant native Android apps using Kotlin that take full advantage of low level features and capabilities.',
      'Create a hybrid mobile app using your existing web codebase —reuse what you have built, add native features, and publish across platforms with ease.',
    ],
  },
  {
    backgroundImage: '/images/pages/services/CoreServices/brand.jpg',
    heading: 'Brand Strategy',
    slides: [
      'Define and articulate your brand’s purpose, values, and positioning to stand out in a crowded market.',
      'Develop a cohesive messaging framework that resonates with target audiences across all touchpoints.',
      'Craft visual and verbal brand guidelines to ensure consistency and authenticity in every experience.',
    ],
  },
  {
    backgroundImage: '/images/pages/services/CoreServices/creative.jpg',
    heading: 'Creative Direction',
    slides: [
      'Conceptualize visual narratives and campaign themes that amplify your brand story.',
      'Oversee design execution across digital, print, and experiential media for cohesive impact.',
      'Guide multimedia content creation—from moodboards to final deliverables—to ensure artistic excellence.',
    ],
  },
];

const CoreServiceOfferings: React.FC = () => (
  <section className={styles.coreServiceOfferings}>
    <div className={styles.intro}>
      <h2>Core Domains Offered</h2>
      <p>
        Engagements within these domains may be offered at virtually any point in the product lifecycle, from early stage through maturity or even reinvention.
      </p>
    </div>

    <div className={styles.grid}>
      {sliderData.map((item, idx) => (
        <ServiceSlider
          key={idx}
          heading={item.heading}
          backgroundImage={item.backgroundImage}
          slides={item.slides}
        />
      ))}
    </div>
  </section>
);

export default CoreServiceOfferings;
