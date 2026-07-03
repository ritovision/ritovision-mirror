import React from 'react';
import Script from "next/script";
import { AccordionComponent } from '@/components/utilities/accordion/Accordion';
import { AccordionText } from '@/components/utilities/accordion/AccordionText';
import SectionLineWrapper from '@/components/utilities/sections/SectionLineWrapper';
import ButtonSection from '@/components/utilities/buttons/ButtonSection';
import styles from './Faq.module.css';

interface AccordionItem {
  title: string;
  heading?: string;
  content: string;
}

const accordionItems: AccordionItem[] = [
  {
    title: "What's Rito's educational background?",
    content: "He earned his Masters of Science in Human-Computer Interaction (HCI) from DePaul University; and his Bachelor's degree in Psychology with a minor in Cognitive Science at Rutgers University."
  },
  {
    title: "If I want to work with RitoVision, do I actually get Rito?",
    heading: "Yes",
    content: "Rito is hands-on and involved in every project directly. At times he may delegate and/or collaborate on certain tasks but always under his lead and direction."
  },
  {
    title: "Does Rito do strategy, design or software development?",
    heading: "Yes, yes and yes.",
    content: "If you really have to ask that, we may need to revisit our site's content strategy to make it clearer! Rito operates at the high level of strategy and design, but also gets into the nitty-gritty of execution."
  },
  {
    title: "Is Rito really good at everything? Like c'mon, EVERYTHING?",
    heading: "Nope, not everything.",
    content: "While Rito is a demonstrated polymath with a track record of mastering diverse domains, his strengths lie in creative problem-solving, systems thinking, and qualitative insight. He moves fast, learns deeply, and builds fluidly—but if you're looking for hardline quantitative analysis or algorithmic optimization, he's not your guy."
  },
  {
    title: "Does RitoVision accept cryptocurrency for payment?",
    heading: "Yes, but on a case by case basis.",
    content: "Stablecoins are preferred, but RitoVision is open to accepting other options."
  },
  {
    title: "What's Rito's software engineering background?",
    content: "Rito has spent over a decade working at the intersection of UX and front-end development, building websites, prototyping interfaces, and using custom code to augment CMS platforms and digital experiences. He's expanded into full-stack and mobile app development, working with AI-assisted tools to architect and implement more complex systems.\n\n While not focused on algorithmic depth, Rito is fluent in applying engineering principles to real-world challenges. He's familiar with languages like TypeScript (a typed version of JavaScript), Python, and Kotlin; has experience with APIs, Linux environments, and databases; and is comfortable navigating a wide range of front-end and back-end frameworks. His technical strength lies in systems fluency, creative implementation, and bridging product, UX, and code."
  },
  {
    title: "What kinds of startups has Rito founded or worked with over the years?",
    content: "Rito's startup journey spans AI, FinTech, fashion, Web3, creative tools, and consumer wearables. He founded PersonaVibe—an early social cybernetics company—well before the current AI wave. Since then, he's contributed to everything from embedded crypto wallets and NFT galleries to wearable tech accessories with JUMPTAG CLUB. Some ventures were experimental, others client-facing—but all refined his ability to build at the intersection of brand, product, and infrastructure."
  },
  {
    title: "Who built this website?",
    heading: "Rito!",
    content: "From the ground up using Next.js, a custom UI library and a swath of AI helpers."
  },
  {
    title: "What's the difference between RitoVision and hiring a traditional agency?",
    content: "Agencies tend to silo teams by function, but RitoVision is integrated. You're getting end-to-end thinking from someone who operates across brand, product, UX, and systems with a cohesive vision. Less overhead, more clarity, greater velocity."
  },
  {
    title: "How does working with RitoVision usually start?",
    content: "Most engagements start with a discovery call. From there, we scope a project or retainer based on your goals, timeline, and needs. No pressure, no hard sell—just a smart conversation to explore fit and opportunity."
  },
  {
    title: "What kind of clients does RitoVision usually work with?",
    content: "RitoVision works best with founders, early-stage teams, VCs, DAOs, and culture-forward companies who need cross-disciplinary thinking to align brand, product, and systems. If you're building something ambitious and need clarity, narrative, or executional firepower—there's probably a fit."
  },
  {
    title: "Does Rito offer speaking, workshops, or advising?",
    heading: "All the above",
    content: "Rito is available for speaking, panels, and occasional workshop facilitation; please see the Speaker page for more information. Advisory roles are considered selectively"
  },
];

// Generate FAQ structured data
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: accordionItems.map((item) => ({
    "@type": "Question",
    name: item.title,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.heading
        ? `${item.heading} – ${item.content}`
        : item.content,
    },
  })),
};

export const Faq: React.FC = () => {
  return (
    <>
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema, null, 2) }}
      />

      <SectionLineWrapper isFirstSection={true}>
        <div className={styles.buttonSectionWrapper}>
          <ButtonSection
            title="Check out RitoVision's service offerings or get in touch"
            buttonGroupProps={{
              buttons: [
                { text: "Services", href: "/services", variant: "blueAccentButton" },
                { text: "Contact", href: "/contact", variant: "blueAccentButton" },
              ],
            }}
          />
        </div>
      </SectionLineWrapper>

      <h2 className={styles.faqTitle}>FAQ</h2>

      <div className={styles.accordionWrapper}>
        <AccordionComponent
          items={accordionItems.map((item, index) => ({
            title: item.title,
            value: `item-${index}`,
            content: (
              <AccordionText
                text={item.content}
                {...(item.heading ? { heading: item.heading } : {})}
              />
            ),
          }))}
        />
      </div>
    </>
  );
};

export default Faq;
