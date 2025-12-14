// app\components\pages\home\Sections\Showcase\Hackernoon.tsx

'use client';
import React from "react";
import LogoDisplay from "@/components/utilities/sections/topicSegment/LogoDisplay";
import TitleDisplay from "@/components/utilities/sections/topicSegment/TitleDisplay";
import ContentDisplay from "@/components/utilities/sections/topicSegment/ContentDisplay";
import ButtonSection from "@/components/utilities/buttons/ButtonSection";
import subsectionStyles from "./ShowcaseSubsection.module.css";

const HackernoonShowcase = () => {
  return (
    <div>
      {/* logo as originally */}
      <div className={subsectionStyles.squareLogoContainer}>
        <LogoDisplay
        href="https://hackernoon.com/about/ritorhymes"
          src="/images/pages/press/logos/Hackernoon.jpg"
          alt="Hackernoon Logo"
          fadeIn
          triggerAmountMobile={0.1}
          triggerAmountDesktop={0.8}
          mobileBreakpoint="(max-width: 768px)"
          borderColor="var(--secondary-blue)"
          backgroundColor="transparent"
        />
      </div>

      {/* title with “Hackernoon” italicized */}
      <TitleDisplay
        href="https://hackernoon.com/about/ritorhymes"
        borderColor="var(--secondary-blue)"
        backgroundColor="transparent"
        fadeIn
        triggerAmountMobile={0.1}
        triggerAmountDesktop={0.4}
        mobileBreakpoint="(max-width: 768px)"
      >
        Nominated as Contributor of the Year in 3 Categories by <em>HackerNoon</em>
      </TitleDisplay>

      {/* content with updated body text and built‑in button */}
      <ContentDisplay
        imageSrc="/images/pages/press/media/rito-dogey.jpg"
        imageAlt="Rito Dogey"
        caption="Rito posing in a Doge mask."
        body={
          <>
            Rito was recognized by <em>HackerNoon’s Noonies awards</em> as a Contributor of the Year nominee in three distinct categories—Metaverse, Music, and Humor. The nominations highlight his cross-disciplinary impact at the intersection of emerging tech and culture, blending product insight with creative storytelling. He was in strong company, nominated alongside Web3 builders, fintech journalists, and contributors to major outlets like Forbes and Cointelegraph.
          </>
        }
        backgroundColor="var(--black)"
        borderColor="var(--secondary-blue)"
        fadeIn
        triggerAmountMobile={0.1}
        triggerAmountDesktop={0.4}
        mobileBreakpoint="(max-width: 768px)"
        buttonText="Dogepalooza Article"
        buttonVariant="blueAccentButton"
        buttonHref="https://hackernoon.com/who-showed-up-to-dogepalooza-and-who-cares-much-surprise"
      />

      {/* bottom button group */}
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
          title="Check out more of Rito's press contributions"
          buttonGroupProps={{
            buttons: [
              {
                text: "Roadmap Article",
                variant: "blueAccentButton",
                href:
                  "https://hackernoon.com/is-dogecoin-headed-to-twitter-the-moon-or-throughout-the-universe",
              },
              {
                text: "Press",
                variant: "blackWhiteButton",
                href: "/press",
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

export default HackernoonShowcase;
