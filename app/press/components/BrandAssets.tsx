// app/components/pages/press/BrandAssets.tsx
"use client";

import React from "react";
import MasonGrid, { MasonGridItem } from "@/components/utilities/media/images/MasonGrid";
/*public\images\brand\wordmark-white.png
public\images\brand\wordmark-black.png
public\images\brand\ritovision-wordmark-tm.png
public\images\brand\ritovision-logomark.png
public\images\brand\ritovision-logomark-tm.png*/
const brandItems: MasonGridItem[] = [
  {
    src: "/images/brand/logomark-ritovision.png",
    alt: "RitoVision Logomark",
  },
  {
    src: "/images/brand/ritovision-wordmark-tm.png",
    alt: "RitoVision wordmark with TM symbol",
  },
  {
    src: "/images/brand/wordmark-black.png",
    alt: "RitoVision Wordmark black",
  },
   {
    src: "/images/brand/wordmark-white.png",
    alt: "RitoVision Wordmark white",
  },
  {
    src: "/images/brand/cobrands/ritography-logo.png",
    alt: "Ritography Co-brand logo",
  },
  {
    src: "/images/brand/cobrands/RitoRhymes-logo.png",
    alt: "Rito Rhymes Co-brand logo",
  },
];

const BrandAssets: React.FC = () => {
  return <MasonGrid items={brandItems} />;
};

export default BrandAssets;
