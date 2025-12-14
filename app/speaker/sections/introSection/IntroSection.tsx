import React from 'react';
import Intro from '../../components/Intro';
import SectionLineWrapper from '../../../components/utilities/sections/SectionLineWrapper';
import ButtonSection from '../../../components/utilities/buttons/ButtonSection';
import { ButtonGroupProps } from '../../../components/utilities/buttons/ButtonGroup';
import styles from './IntroSection.module.css';

export default function IntroSection() {
  const buttonGroupProps: ButtonGroupProps = {
    buttons: [
      {
        text: 'Contact',
        href: '#contact',
        variant: 'blueAccentButton',
      },
      {
        text: 'Press',
        href: '/press',
        variant: 'blueAccentButton2',
      },
    ],
  };

  return (
    <div className={styles.wrapper}>
      <Intro />
      <SectionLineWrapper 
        isFirstSection={true} 
        responsiveBreakpoint={730} 
        responsiveMargin="15% auto 20% auto"
      >
        <div className={styles.buttonWrapper}>
          <ButtonSection 
            title="To book Rito for your event, you're welcome to submit a request or check out more of his accomplishments"
            buttonGroupProps={buttonGroupProps}
            withBackground={false}
          />
        </div>
      </SectionLineWrapper>
    </div>
  );
}
