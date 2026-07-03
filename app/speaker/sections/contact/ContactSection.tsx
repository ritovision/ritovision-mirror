'use client';

import SpeakerForm from '../../components/SpeakerForm';
import { BigAccordion } from '../../../components/utilities/accordion/BigAccordion';
import styles from './ContactSection.module.css';

const ContactSection = () => {
  return (
    <section id="contact" className={styles.contactWrapper}>
      <BigAccordion
        contentPadding={0}
        showUnderline={false}
        items={[
          {
            title: 'Submit a Speaker Request',
            value: 'speaker-form',
            content: <SpeakerForm />,
          },
        ]}
      />
    </section>
  );
};

export default ContactSection;
