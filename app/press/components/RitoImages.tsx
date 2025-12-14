// app/components/pages/press/RitoImages.tsx
"use client";

import React from "react";
import MasonGrid, { MasonGridItem } from "@/components/utilities/media/images/MasonGrid";

const ritoItems: MasonGridItem[] = [
  {
    src: "/images/home/hero/rito-picture1.png",
    alt: "Portrait of Rito",
  },
  {
    src: "/images/utilities/imageQuote/Ignorance.png",
    alt: "Rito in a suit in front of computer terminals",
  },
  {
    src: "/images/utilities/imageQuote/Foundations.png",
    alt: "Rito wiring a robot",
  },
 {
    src: "/images/pages/press/rito-images/Rito-dashboard.jpg",
    alt: "Rito navigating a holographic dashboard",
  },
  {
    src: "/images/utilities/imageQuote/Roadmap.jpg",
    alt: "Depiction of Rito flying through a Tron City directory structure",
  },
  {
    src: "/images/pages/press/media/ritorhymes-bitcoin.jpeg",
    alt: "Rito Rhymes holding a Bitcoin coin",
  },
  {
    src: "/images/pages/speaker/pastEngagements/ritoradio.jpg",
    alt: "Depiction of Rito during an interview",
  },
  {
    src: "/images/home/cobrands/blackshirt-rito.jpg",
    alt: "Rito posing in deep thought",
  },
  {
    src: "/images/home/cobrands/Rito-mic-hold.jpg",
    alt: "Rito Rhymes holding microphone",
  },
  {
    src: "/images/pages/speaker/hero/ritorhymes.jpg",
    alt: "Rito on stage at Dogepalooza",
  },
  {
    src: "/images/mobileMenu/img1.jpg",
    alt: "Rito Rhymes with Grammy Winner Damon Elliot after performing together at Dogepalooza music festival",
  },
{
    src: "/images/pages/press/rito-images/TrailmapRap.jpg",
    alt: "Rito Rhymes performing spoken-word Dogemap Rap on stage at Dogepalooza music festival",
  },
];

const RitoImages: React.FC = () => {
  return <MasonGrid items={ritoItems} />;
};

export default RitoImages;
