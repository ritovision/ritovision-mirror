// app/page.tsx
import React from 'react';
import HeroOrbsWrapper from "@/components/pages/home/hero/HeroOrbsWrapper";
import HeroDynamicImageWrapper from "@/components/pages/home/hero/HeroDynamicImageWrapper";
import DynamicTextServer from "@/components/pages/home/dynamicText/DynamicTextServer";
import SubheadingServer from "@/components/pages/home/subheading/SubheadingServer";
import WhiteOrbsWrapper from "@/components/pages/home/WhiteOrbsWrapper";
import ShowcaseWrapper from "@/components/pages/home/Sections/Showcase/ShowcaseWrapper";
import Cobrands from "@/components/pages/home/cobrands/Cobrands";
import { homePageMetadata } from "./metadata";

import { loadJsonLdScripts } from '@/lib/jsonld/loadJsonFromIndex';
import homepageJsonLdData from '@/_data/jsonld/homepage';

export const metadata = homePageMetadata;

export default function HomePage() {
  return (
    <main>
      <HeroOrbsWrapper />

      <HeroDynamicImageWrapper />

      <DynamicTextServer />
      <SubheadingServer />

      <WhiteOrbsWrapper />

      <ShowcaseWrapper />

      <Cobrands />

      {/* JSON-LD scripts for homepage */}
      {loadJsonLdScripts(homepageJsonLdData, 'homepage-jsonld')}
    </main>
  );
}
