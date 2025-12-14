// FILE PATH: app/projects/page.tsx

import React from 'react';
import { loadJsonLdScripts } from '@/lib/jsonld/loadJsonFromIndex';
import jsonLdData from './jsonld';
import { projectsPageMetadata } from './metadata';
import SectionHeading from '../components/utilities/sections/SectionHeading';
import CustomWhiteOrbs from './components/CustomWhiteOrbs';
import ProjectSection, { ProjectData } from './components/ProjectSection';
import TransitionBox from '../components/utilities/media/images/TransitionBox';
import Testimonial from '../services/components/Testimonial';
import Hero from './components/Hero';
import styles from './styles.module.css';

export const metadata = projectsPageMetadata;

export default function ProjectsPage() {
  const projects: ProjectData[] = [
    {
      id: "fansite",
      title: "NYT-Featured Fansite for Fashion Icon Caroline Vreeland",
      text: "End-to-end production of a New York Times recognized fansite for fashion icon and musician Caroline Vreeland, organically reaching 100k hits in a year, and currently powered with lean and robust Next.js architecture designed to function like a CMS with minimal overhead.",
      imageSrc: "/images/pages/projects/fansite/caroline-hero.jpg",
      link: "/projects/fansite",
      tags: ["Celebrity", "Fashion Icon", "Caroline Vreeland", "Next.js", "Content Strategy", "SEO", "AI", "Creative Direction", "The New York Times", "Brand Strategy", "Product Management", "CMS Replacement", "Typescript", "Web Development"],
    },
    {
      id: "jumptag",
      title: "End-to-End Management of Wearable Tech Used by Celeb Fashion Designers",
      text: "An end-to-end wearable tech pilot where Rito orchestrated the branding, design, production, and deployment of dynamic QR dog tags alongside a custom platform for real-time management; used by celebrity fashion designers in a future-forward fashion show and worn by internationally published models.",
      link: "/projects/jumptag",
      tags: ["Wearable Tech", "Product Management", "UX Design", "Deeplinks", "QR Codes", "FashionTech", "Fashion Show", "Dog Tags", "Android App", "Web App", "Phygital", "React Native", "Jewelry Design", "SvelteKit", "Romeo Hunte", "Pamela Dennis", "Brand Strategy", "Photography", "Video Production"],
      customMedia: (
        <TransitionBox
          images={[
            '/images/pages/projects/jumptag/hero/hero1.jpg',
            '/images/pages/projects/jumptag/hero/hero2.jpg',
            '/images/pages/projects/jumptag/hero/hero3.jpg',
            '/images/pages/projects/jumptag/hero/hero4.jpg',
            '/images/pages/projects/jumptag/hero/hero5.jpg',
            '/images/pages/projects/jumptag/hero/hero6.jpg',
          ]}
          duration={2000}
          transitionDuration={500}
        />
      ),
    },
    {
      id: "cod",
      title: "Global Press Coverage for Call of Duty Quality Assurance that Led to Game Studio Fixes",
      text: "Rito turned quality assurance work into an infotaining content campaign receiving global press coverage by major gaming news outlets and resulting in the game developer fixing the issues publicized.",
      imageSrc: "/images/pages/projects/cod/hero/warzone.webp",
      link: "/projects/cod",
      tags: ["Quality Assurance", "Press Coverage", "Adobe Premiere", "Game Development", "Content Strategy", "Infotainment", "Call of Duty", "Game Bugs", "Screen Rant", "Dexerto", "Gfinity"],
    },
    {
      id: "entriken",
      title: "Strategic Brand Repositioning for Industry Pioneer",
      text: "From 'NFT Guy' to multi-disciplinary civic hacker and business leader, Rito lead and executed a full-scale personal brand repositioning for leading software pioneer William Entriken, aligning legacy assets with a future-proof identity and a PR-ready web platform to diversify audience reach across web3, finance, cybersecurity, and civic tech.",
      imageSrc: "/images/pages/projects/entriken/hero/hero.png",
      link: "/projects/entriken",
      tags: ["Brand Strategy", "Personal Branding", "UX Strategy", "Content Strategy", "Creative Direction", "Thought Leadership", "Information Architecture", "SEP", "CMS", "SEO"],
    },
    {
      id: "uas",
      title: "Co-Authoring ERC with a Blockchain Legend",
      text: "Collaborated on a game-changing Ethereum blockchain standard (an ERC) alongside a legendary blockchain pioneer, William Entriken, to push for industry-wide adoption.",
      imageSrc: "/images/pages/projects/uas/conclusion.jpg",
      link: "/projects/uas",
      tags: ["Blockchain", "Ethereum", "EVM", "Smart Contracts", "ERC Standard", "Technical Writing,", "Proposal Writing", "Community Engagement", "Roadmap", "Solutions Architecture", "Thought Leadership"],
    },
    {
      id: "ritoswap",
      title: "RitoSwap: Full-stack dApp Showcase (Blockchain)",
      text: "RitoSwap brings Rito’s vision of the classic dApp experience to life, delivering a polished, end-to-end multichain system with token trading, minting, burning and exclusive token-gated channels. The repo bundles private-chain deployment, smart-contract development & security testing, plus a sophisticated front-end for seamless wallet management on desktop & mobile, blending live on-chain interactions with traditional back-end integrations.",
      imageSrc: "/images/pages/projects/ritoswap/ritoswap-cover.png",
      modal: {
        url: "https://docs.ritoswap.com",
        message: "You are about to leave RitoVision.com and visit RitoSwap's documentation site.",
        openInNewWindow: true,
      },
      tags: ["Web3", "dApp", "Smart Contracts", "UI/UX", "Blockchain", "DeFi", "Redis", "PostgreSQL", "Wagmi", "WalletConnect", "EVM", "Security Testing", "ERC-721", "SiWE", "Ethereum", "Alchemy", "Full Node", "Blockscout", "Next.js", "Solidity", "TypeScript", "Mythril", "Hardhat", "Slither", "Echidna", "Sepolia"],
    },
  ];

  return (
    <>
      {loadJsonLdScripts(jsonLdData, 'projects-jsonld')}

      <CustomWhiteOrbs
        height="100%"
        background={0x012035}
        circleColor={0x04426C}
        glowColor={0x04426C}
      >
        <div className={styles.pageContent}>
          <SectionHeading title="Projects" />
          <Hero />
          <ProjectSection projects={projects} />
          <div className={styles.testimonialWrapper}>
            <Testimonial />
          </div>
        </div>
      </CustomWhiteOrbs>
    </>
  );
}