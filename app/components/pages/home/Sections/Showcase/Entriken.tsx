// app\components\pages\home\Sections\Showcase\Entriken.tsx
'use client';
import React from "react";
import TitleDisplay from "@/components/utilities/sections/topicSegment/TitleDisplay";
import ContentDisplay from "@/components/utilities/sections/topicSegment/ContentDisplay";
import ButtonSection from "@/components/utilities/buttons/ButtonSection";
import Testimonial from "@/services/components/Testimonial";

export default function Entriken() {
  return (
    <div>
      <TitleDisplay
      href="/projects/entriken"
        borderColor="var(--secondary-blue)"
        backgroundColor="transparent"
        fadeIn
        triggerAmountMobile={0.1}
        triggerAmountDesktop={0.4}
        mobileBreakpoint="(max-width: 768px)"
      >
        Strategic Brand Repositioning for Pioneer William Entriken{" "}
        <span style={{ color: "var(--primary-red)" }}>AND</span>{" "}
        Co‑authoring an ERC with him
      </TitleDisplay>

      <ContentDisplay
        imageSrc="/images/pages/projects/entriken/hero/hero.png"
        imageAlt="William Entriken collaboration hero"
        caption=""
        body={`Rito partnered with William Entriken—the visionary behind the first mainstream standard formalizing the term “NFT”—to co-author a new ERC called Universal Asset Signing. After six months campaigning side by side to gain a foothold, the adoption hurdles laid bare a deeper truth: tackling this space demands a rare kind of multidisciplinarity. That realization led Rito to spearhead a strategic brand repositioning of William from “the NFT guy” into a polymathic civic hacker and businessman, culminating in the launch of WilliamEntriken.net.`}
        backgroundColor="var(--black)"
        borderColor="var(--secondary-blue)"
        fadeIn
        triggerAmountMobile={0.1}
        triggerAmountDesktop={0.4}
        mobileBreakpoint="(max-width: 768px)"
      />

      <div
        style={{
          marginTop: "100px",
          textAlign: "center",
          width: "var(--container-width-narrow)",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <ButtonSection
          title="Learn more about these two projects"
          buttonGroupProps={{
            buttons: [
              {
                text: "Brand Report",
                variant: "blueAccentButton",
                href: "/projects/entriken",
              },
              {
                text: "ERC Case Study",
                variant: "blackWhiteButton",
                href: "/projects/uas",
              },
            ],
          }}
        />
      </div>

      {/* Testimonial is now inside Entriken */}
      <div style={{ marginTop: "4rem" }}>
        <Testimonial />
      </div>
    </div>
  );
}
