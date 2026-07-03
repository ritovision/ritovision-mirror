// app\press\sections\coverage\components\PressIntro.tsx
'use client';
import React from 'react';
import SectionLineWrapper from '@/components/utilities/sections/SectionLineWrapper';
import ScrollFadeIn from '@/components/utilities/animations/ScrollFadeIn';
import ButtonSection from '@/components/utilities/buttons/ButtonSection';

const PressIntro = () => (
  <SectionLineWrapper isFirstSection id="press-intro">
    <ScrollFadeIn>
      <ButtonSection
        buttonGroupProps={{
          buttons: [
            { text: 'Contact', variant: 'blueAccentButton', href: '#contact' },
            { text: 'Press Kit', variant: 'blueAccentButton', href: '#accordion' },
          ],
        }}
        title="For press inquiries, please contact us either at press@ritovision.com or through the form below."
        style={{ width: '90%', margin: '0 auto' }}
      />
    </ScrollFadeIn>
  </SectionLineWrapper>
);

export default PressIntro;
