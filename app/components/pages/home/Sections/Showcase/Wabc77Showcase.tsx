// app\components\pages\home\Sections\Showcase\Wabc77Showcase.tsx

'use client';
import React from "react";
import LogoDisplay from "@/components/utilities/sections/topicSegment/LogoDisplay";
import TitleDisplay from "@/components/utilities/sections/topicSegment/TitleDisplay";
import ContentDisplay from "@/components/utilities/sections/topicSegment/ContentDisplay";
import ButtonSection from "@/components/utilities/buttons/ButtonSection";
import subsectionStyles from "./ShowcaseSubsection.module.css";

const Wabc77Showcase = () => {
  return (
    <div>
      {/* Use a generic centering container for the logo */}
      <div className={subsectionStyles.centerLogoContainer}>
        <LogoDisplay
        href="https://wabcradio.com/episode/rito-rhymes-rapper-and-crypto-nerd-6-8-22/"
          src="/images/pages/press/logos/77-WABC-gold.png"
          alt="77 WABC Logo"
          fadeIn
          triggerAmountMobile={0.1}
          triggerAmountDesktop={0.4}
          mobileBreakpoint="(max-width: 768px)"
          borderColor="var(--secondary-blue)"
          backgroundColor="transparent"
        />
      </div>

      <TitleDisplay
      href="https://wabcradio.com/episode/rito-rhymes-rapper-and-crypto-nerd-6-8-22/"
        borderColor="var(--secondary-blue)"
        backgroundColor="transparent"
        fadeIn
        triggerAmountMobile={0.1}
        triggerAmountDesktop={0.4}
        mobileBreakpoint="(max-width: 768px)"
      >
        Live Radio Feature Interview & Rapping About Tech Topics on NYC's Flagship{" "}
        <em>77 WABC</em>
      </TitleDisplay>

      <ContentDisplay
        imageSrc="/images/pages/press/media/frankmorano.jpg"
        imageAlt="Frank Morano Interview"
        caption={
          <em>The Other Side of Midnight with Frank Morano</em>
        }
        body={
          <>
            Rito joined <em>The Other Side of Midnight with Frank Morano</em> for a one-of-a-kind live segment—offering sharp, insightful, and at times humorous takes on blockchain, the metaverse, and digital culture, while delivering improvised rap responses on air. A rare demonstration of true infotainment, broadcast across New York, even naming the episode in his honor “Insane in the Blockchain”.
          </>
        }
        backgroundColor="var(--black)"
        borderColor="var(--secondary-blue)"
        fadeIn
        triggerAmountMobile={0.1}
        triggerAmountDesktop={0.4}
        mobileBreakpoint="(max-width: 768px)"
        buttonText="Listen to Interview"
        buttonVariant="blueAccentButton"
        buttonHref="https://wabcradio.com/episode/rito-rhymes-rapper-and-crypto-nerd-6-8-22/"
      />

      <div
        style={{
          marginTop: "2rem",
          textAlign: "center",
          width: "var(--container-width-narrow)",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <ButtonSection
          title="Check out more of Rito's press coverage or his live performances."
          buttonGroupProps={{
            buttons: [
              {
                text: "Press",
                variant: "blueAccentButton",
                href: "/press",
              },
              {
                text: "Speaker",
                variant: "blackWhiteButton",
                href: "/speaker",
              },
            ],
          }}
          style={{ width: "var(--container-width-narrow)", margin: "0 auto" }}
        />
      </div>
    </div>
  );
};

export default Wabc77Showcase;
