// app/page.tsx
import React from 'react';
import HeroOrbsWrapper from "@/home/hero/HeroOrbsWrapper";
import HeroDynamicImageWrapper from "@/home/hero/HeroDynamicImageWrapper";
import DynamicTextServer from "@/home/dynamicText/DynamicTextServer";
import SubheadingServer from "@/home/subheading/SubheadingServer";
import WhiteOrbsWrapper from "@/home/WhiteOrbsWrapper";
import ShowcaseWrapper from "@/home/Sections/Showcase/ShowcaseWrapper";
import Cobrands from "@/home/cobrands/Cobrands";
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
