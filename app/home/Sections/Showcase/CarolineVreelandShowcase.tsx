// app\components\pages\home\Sections\Showcase\CarolineVreelandShowcase.tsx

'use client';
import React from "react";
import LogoDisplay from "@/components/utilities/sections/topicSegment/LogoDisplay";
import TitleDisplay from "@/components/utilities/sections/topicSegment/TitleDisplay";
import ContentDisplay from "@/components/utilities/sections/topicSegment/ContentDisplay";
import ButtonSection from "@/components/utilities/buttons/ButtonSection";
import Testimonial from "@/projects/fansite/components/Testimonial";
import subsectionStyles from "./ShowcaseSubsection.module.css";

const CarolineVreelandShowcase = () => {
  return (
    <div>
      {/* NYT logo */}
      <div className={subsectionStyles.squareLogoContainer}>
        <LogoDisplay
        href="https://www.nytimes.com/2020/01/16/style/caroline-vreeland-a-singer-with-a-famous-fashion-name.html"
          src="/images/pages/press/logos/NYT-logo.png"
          alt="New York Times Logo"
          fadeIn
          triggerAmountMobile={0.1}
          triggerAmountDesktop={0.8}
          mobileBreakpoint="(max-width: 768px)"
          borderColor="var(--secondary-blue)"
          backgroundColor="transparent"
        />
      </div>

      {/* Title with name on its own centered line */}
      <TitleDisplay
       href="/projects/fansite"
        borderColor="var(--secondary-blue)"
        backgroundColor="transparent"
        fadeIn
        triggerAmountMobile={0.1}
        triggerAmountDesktop={0.4}
        mobileBreakpoint="(max-width: 768px)"
      >
        NYT‑featured Platform for Celebrity Fashion Icon
        
        Caroline Vreeland
      </TitleDisplay>

      {/* Main content with built‑in button */}
      <ContentDisplay
        imageSrc="/images/pages/press/media/carovreeland.jpg"
        imageAlt="Caroline Vreeland"
        caption=""
        body={
          <>
            Rito independently created a tribute fansite for fashion icon and singer Caroline Vreeland—great granddaughter of legendary Vogue editor Diana Vreeland—that unexpectedly earned a spotlight in <em>The New York Times</em> where it was presented and directly linked by the editor to strategically convey her claim to fame in the introduction. Built with vision and care, the platform drew over 100,000 organic hits in a year and received a heartfelt response from Caroline herself.
          </>
        }
        backgroundColor="var(--black)"
        borderColor="var(--secondary-blue)"
        fadeIn
        triggerAmountMobile={0.1}
        triggerAmountDesktop={0.4}
        mobileBreakpoint="(max-width: 768px)"
        buttonText="CarolineVreeland.com"
        buttonVariant="blueAccentButton"
        buttonHref="https://carolinevreeland.com"
      />

      {/* bottom button group */}
      <div
        style={{
          marginTop: "4rem",
          textAlign: "center",
          width: "var(--container-width-narrow)",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <ButtonSection
          title="Learn more about the project"
          buttonGroupProps={{
            buttons: [
              {
                text: "NYT Article",
                variant: "blueAccentButton",
                href: "https://www.nytimes.com/2020/01/16/style/caroline-vreeland-a-singer-with-a-famous-fashion-name.html",
              },
              {
                text: "Project Details",
                variant: "blackWhiteButton",
                href: "/projects#Caroline",
              },
            ],
          }}
        />
      </div>

      {/* Caroline Vreeland testimonial */}
      <div style={{ marginTop: "4rem" }}>
        <Testimonial />
      </div>
    </div>
  );
};

export default CarolineVreelandShowcase;
