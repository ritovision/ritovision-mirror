// c:/Users/Mattj/ritovision website/test/app/styles/forms/page.tsx
'use client';

import React, { useState, ChangeEvent, FocusEvent } from 'react';
import Head from 'next/head';
import { useClientRedirectIfProd } from 'lib/pages/clientRedirectIfProd';
import FormField from '../../components/utilities/forms/FormField';
import TextArea from '../../components/utilities/forms/TextArea';
import CheckmarkContainer from '../../components/utilities/forms/CheckmarkContainer';
import RadioContainer from '../../components/utilities/forms/RadioContainer';
import Dropdown from '../../components/utilities/dropdown/Dropdown';
import InteractiveSlider from '../../components/utilities/slider/InteractiveSlider';
import ModalDemo from '../../components/utilities/modal/ModalDemo';
import styles from './page.module.css';

const sampleItems = [
  'First item: Do something important',
  'Second item: Check the details',
  'Third item: Finalize the project',
];

const dropdownItems = [
  'Option A: Lorem ipsum dolor sit amet',
  'Option B: Consectetur adipiscing elit',
  'Option C: Sed do eiusmod tempor incididunt',
  'Option D: Ut labore et dolore magna aliqua',
];

const sliderMarks = ['Low', 'Medium', 'High'];

export default function FormStylesPage() {
  useClientRedirectIfProd();

  // Local state just to satisfy TextArea's controlled props
  const [textareaValues, setTextareaValues] = useState<Record<string, string>>({
    preTextarea: '',
    focusTextarea: '',
    validTextarea: '',
    invalidTextarea: '',
    disabledTextarea: '',
  });

  const handleChange = (key: string) => (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValues((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleBlur = (e: FocusEvent<HTMLTextAreaElement>) => { void e; };
  const handleFocus = (e: FocusEvent<HTMLTextAreaElement>) => { void e; };

  return (
    <>
      <Head>
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      <div className={styles.pageContainer}>
        <h1 className={styles.heading}>Form Fields Style Guide</h1>

        <div className={styles.fieldsWrapper}>
          <FormField
            name="pre"
            label="Pre-interaction"
            placeholder="Enter text here"
            state="pre"
          />
          <FormField
            name="focus"
            label="On-Focus"
            placeholder="Enter text here"
            state="focus"
          />
          <FormField
            name="valid"
            label="Filled-out & Validated"
            placeholder="Enter text here"
            state="valid"
          />
          <FormField
            name="invalid"
            label="Invalid"
            placeholder="Enter text here"
            state="invalid"
            errorText="Please enter a valid value"
          />
          <FormField
            name="disabled"
            label="Disabled"
            placeholder="Enter text here"
            state="disabled"
          />
        </div>

        <h2 className={styles.subheading}>Text Area Components</h2>
        <div className={styles.fieldsWrapper}>
          <TextArea
            name="preTextarea"
            label="Pre-interaction"
            placeholder="Enter text here"
            state="pre"
            value={textareaValues.preTextarea}
            onChange={handleChange('preTextarea')}
            onBlur={handleBlur}
            onFocus={handleFocus}
          />
          <TextArea
            name="focusTextarea"
            label="On-Focus"
            placeholder="Enter text here"
            state="focus"
            value={textareaValues.focusTextarea}
            onChange={handleChange('focusTextarea')}
            onBlur={handleBlur}
            onFocus={handleFocus}
          />
          <TextArea
            name="validTextarea"
            label="Filled-out & Validated"
            placeholder="Enter text here"
            state="valid"
            value={textareaValues.validTextarea}
            onChange={handleChange('validTextarea')}
            onBlur={handleBlur}
            onFocus={handleFocus}
          />
          <TextArea
            name="invalidTextarea"
            label="Invalid"
            placeholder="Enter text here"
            state="invalid"
            errorText="Please enter a valid value"
            value={textareaValues.invalidTextarea}
            onChange={handleChange('invalidTextarea')}
            onBlur={handleBlur}
            onFocus={handleFocus}
          />
          <TextArea
            name="disabledTextarea"
            label="Disabled"
            placeholder="Enter text here"
            state="disabled"
            value={textareaValues.disabledTextarea}
            onChange={handleChange('disabledTextarea')}
            onBlur={handleBlur}
            onFocus={handleFocus}
          />
        </div>

        <h2 className={styles.subheading}>Checkmark Container Examples</h2>
        <div className={styles.fieldsWrapper}>
          <CheckmarkContainer title="Pre-interaction" state="pre" items={sampleItems} />
          <CheckmarkContainer title="On-Focus" state="focus" items={sampleItems} />
          <CheckmarkContainer title="Filled-out & Validated" state="valid" items={sampleItems} />
          <CheckmarkContainer title="Invalid" state="invalid" items={sampleItems} />
          <CheckmarkContainer title="Disabled" state="disabled" items={sampleItems} />
        </div>

        <h2 className={styles.subheading}>Radio Container Examples</h2>
        <div className={styles.fieldsWrapper}>
          <RadioContainer title="Pre-interaction" state="pre" items={sampleItems} />
          <RadioContainer title="On-Focus" state="focus" items={sampleItems} />
          <RadioContainer title="Filled-out & Validated" state="valid" items={sampleItems} />
          <RadioContainer title="Invalid" state="invalid" items={sampleItems} />
          <RadioContainer title="Disabled" state="disabled" items={sampleItems} />
        </div>

        <h2 className={styles.subheading}>Dropdown Examples</h2>
        <div className={styles.fieldsWrapper}>
          <Dropdown
            headerText="Custom Dropdown Header"
            label="Pre-interaction"
            items={dropdownItems}
            state="pre"
          />
          <Dropdown label="Opened (Style Demo)" items={dropdownItems} state="pre" initialOpen />
          <Dropdown label="Filled-out & Validated" items={dropdownItems} state="valid" />
          <Dropdown label="Invalid" items={dropdownItems} state="invalid" />
          <Dropdown label="Disabled" items={dropdownItems} state="disabled" />
        </div>

        <h2 className={styles.subheading}>Slider Component</h2>
        <div className={styles.fieldsWrapper}>
          <InteractiveSlider title="How big is your current customer base?" marks={sliderMarks} />
        </div>

        <div className={styles.modalDemoWrapper}>
          <ModalDemo />
        </div>
      </div>
    </>
  );
}
