// FILE PATH: app/projects/page.tsx

import React from 'react';
import { loadJsonLdScripts } from '@/lib/jsonld/loadJsonFromIndex';
import jsonLdData from './jsonld';
import { projectsPageMetadata } from './metadata';
import SectionHeading from '../components/utilities/sections/SectionHeading';
import CustomWhiteOrbs from './components/CustomWhiteOrbs';
import ProjectSection, { ProjectData } from './components/ProjectSection';
import OrbImage from '../components/utilities/media/images/OrbImage';
import TransitionBox from '../components/utilities/media/images/TransitionBox';
import Testimonial from '@/components/content/Testimonial';
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
      id: "oss",
      title: "Contributions to Major Open Source Software (OSS) Projects",
      text: "Rito has shipped high-visibility and often site-wide improvements to the flagship websites of major open source ecosystems serving millions of developers and software professionals each year. He's also contributed to Core Infrastructure like Git for browsing source code. These projects are held to strict review standards, and his contributions focus on enhancing usability, clarity and consistency where it matters at scale, particularly on mobile devices.",
      imageSrc: "/images/pages/projects/oss/logos/oss-logos.png",
      link: "/projects/oss",
      tags: ["Git", "Ethereum EIP", "LangChain", "Kubernetes","OWASP", "VWAD", "Storybook", "Public Inbox", "systemd", "Web Development", "Infrastructure", "Bug Fixes", "Quality Assurance", "TypeScript", "JavaScript", "CSS", "Perl", "Documentation", "Mobile Optimization", "Cloud", "AI", "Security", "Blockchain", "UI Development", "GitHub", "Jekyll", "Hugo", "Next.js", "User Experience", "Developer Experience", "OSS", "Mailing Lists",],
    },
    {
      id: "ritoswap",
      title: "RitoSwap: Musical Multi-chain dApp & Multi-modal AI Game Experience",
      text: "RitoSwap is a production-quality flagship showcase: a musical multi-chain dApp paired with an agentic, multi-modal AI game experience called 'RapBotRito' in the likeness of Rito's known musical persona, Rito Rhymes. It's a massive solo-build, architected and executed by Rito, integrating product, brand, UX, and full-stack engineering at the scale of a small team of specialists. Shipped as an ecosystem of four web properties including a dedicated documentation site. Open sourced on GitHub.",
      imageSrc: "/images/pages/projects/ritoswap/ritoswap-cover.png",
      modal: {
        url: "https://docs.ritoswap.com",
        message: "You are about to leave RitoVision.com and visit RitoSwap's documentation site.",
        openInNewWindow: true,
      },
      tags: [
        "Web3",
        "DeFi",
        "NFT",
        "Music",
        "Multichain",
        "Ethereum",
        "Sepolia",
        "Hyperledger Besu",
        "Next.js",
        "TypeScript",
        "Wagmi",
        "WalletConnect",
        "Viem",
        "Ethers",
        "LiFi",
        "Alchemy",
        "ERC-721",
        "SIWE",
        "JWT",
        "Smart Contracts",
        "Hardhat",
        "Slither",
        "Mythril",
        "Echidna",
        "Blockscout",
        "PWA",
        "Vercel",
        "Cloudflare Workers",
        "Durable Objects",
        "PostgreSQL",
        "Prisma",
        "Sentry",
        "Multimodal AI",
        "OpenAI",
        "LM Studio",
        "Agentic Systems",
        "MCP",
        "LangChain",
        "Vercel AI SDK",
        "Pinecone",
        "Image Generation",
        "CI/CD",
        "Vitest",
        "Playwright",
        "Supertest",
        "Storybook",
        "Postman"
      ],
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
      text: "From 'NFT Guy' to multi-disciplinary civic hacker and business leader, Rito lead and executed a full-scale personal brand repositioning for leading software pioneer William Entriken, aligning legacy assets with a future-proof identity and a PR-ready web platform built in Astro to diversify audience reach across web3, finance, cybersecurity, and civic tech. Open sourced under Apache 2.0.",
      imageSrc: "/images/pages/projects/entriken/hero/hero.png",
      link: "/projects/entriken",
      tags: ["Brand Strategy", "Personal Branding", "UX Strategy", "Content Strategy", "Creative Direction", "Thought Leadership", "Information Architecture", "SEO", "Astro", "TypeScript", "Vercel", "GitHub Actions", "CI/CD", "Cloudflare Workers", "Playwright", "Vitest", "OSS"],
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
      id: "susquares",
      title: "Modernized a Historic NFT Project and Landed Upstream Improvements",
      text: "Rito built a modernized Su Squares fork on top of legacy infrastructure, reframing a pioneering ERC-721 project as a more credible modern dApp and a broader platform for learning, experimentation, and extension. The fork also included an AI agent-guided developer workflow alongside improvements to mobile UX, wallet interaction, metadata, branding, and maintainability. That work earned him co-maintainership on the upstream project, where he landed a scoped set of improvements.",
      customMedia: (
        <div
          style={{
            width: '80%',
            maxWidth: 'var(--container-max-width-cards)',
            aspectRatio: '1',
            borderRadius: 'var(--border-radius-standard)',
            overflow: 'hidden',
            margin: '16px 0',
            position: 'relative',
          }}
        >
          <OrbImage
            src="/images/pages/projects/susquares/branding/logo-square-full.png"
            alt="Su Squares logo"
            fill
            sizes="(max-width: 900px) 80vw, 420px"
            radius="var(--border-radius-standard)"
            style={{ objectFit: 'cover' }}
          />
        </div>
      ),
      link: "/projects/susquares",
      tags: [
        "Jekyll",
        "Legacy Modernization",
        "NFT",
        "ERC-721",
        "Web3",
        "Blockchain",
        "Mobile UX",
        "PWA",
        "Metadata",
        "Branding",
        "Wallet UI",
        "Wagmi",
        "Security",
        "Storybook",
        "Vitest",
        "Playwright",
        "Developer Experience",
        "OSS",
      ],
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
