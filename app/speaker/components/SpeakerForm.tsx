"use client";

import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { speakerClientValidationSchema, SpeakerFormData } from '@/lib/forms/validation/speaker';
import FormFieldFormikAdapter from '../../components/utilities/forms/FormFieldFormikAdapter';
import TextAreaFormikAdapter from '../../components/utilities/forms/TextAreaFormikAdapter';
import RadioContainerFormikAdapter from '../../components/utilities/forms/RadioContainerFormikAdapter';
import Button from '../../components/utilities/buttons/Button';
import Modal from '../../components/utilities/modal/Modal';
import styles from './SpeakerForm.module.css';
import { submitForm } from '@/lib/forms/client/submitForm';

type SpeakerFormProps = React.HTMLAttributes<HTMLDivElement>;

const SpeakerForm: React.FC<SpeakerFormProps> = (props) => {
  const initialValues: SpeakerFormData = {
    name: '',
    company: '',
    position: '',
    event: '',
    dates: '',
    description: '',
    hearAbout: null,
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [modalVariant, setModalVariant] = useState<'primaryBlue' | 'blackRed'>('primaryBlue');
  const [modalMessage, setModalMessage] = useState('');

  const handleCloseModal = () => setModalOpen(false);

  const handleSubmit = async (
    values: SpeakerFormData,
    { resetForm, setSubmitting }: { resetForm: () => void; setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      const result = await submitForm('speaker', values);

      if (result.success) {
        setModalVariant('primaryBlue');
        setModalMessage('Speaker form submitted successfully. Thank you!');
        resetForm();
      } else {
        setModalVariant('blackRed');
        setModalMessage(result.error || result.errors?.join(', ') || 'Submission failed. Please try again later.');
      }
    } catch {
      setModalVariant('blackRed');
      setModalMessage('Submission failed. Please try again later.');
    } finally {
      setModalOpen(true);
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.speakerFormContainer} {...props}>
      <h2 className={styles.formTitle}>Speaker Inquiry</h2>
      <Formik initialValues={initialValues} validationSchema={speakerClientValidationSchema} onSubmit={handleSubmit}>
        {({ isSubmitting, resetForm }) => (
          <Form>
            <div className={styles.formFieldWrapper}>
              <FormFieldFormikAdapter name="name" label="Name" placeholder="Enter your name" />
            </div>

            <div className={styles.formFieldWrapper}>
              <FormFieldFormikAdapter name="company" label="Company" placeholder="Enter your company (optional)" />
            </div>

            <div className={styles.formFieldWrapper}>
              <FormFieldFormikAdapter name="position" label="Position" placeholder="Enter your position" />
            </div>

            <div className={styles.formFieldWrapper}>
              <FormFieldFormikAdapter name="event" label="Event" placeholder="Enter the event name" />
            </div>

            <div className={styles.formFieldWrapper}>
              <FormFieldFormikAdapter name="dates" label="Date(s)" placeholder="Enter the date(s) of the event" />
            </div>

            <div className={styles.formFieldWrapper}>
              <TextAreaFormikAdapter
                name="description"
                label="Description"
                placeholder="Enter a description (minimum 20 characters)"
              />
            </div>

            <div className={styles.formFieldWrapper}>
              <RadioContainerFormikAdapter
                name="hearAbout"
                title="How did you hear about us?"
                items={['social media', 'search engine', 'word of mouth', 'article', 'other']}
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
              <Button isSubmit text="Submit" variant="blueAccentButton" isDisabled={isSubmitting} />
              <Button isReset text="Reset" variant="blueAccentButton2" onClick={() => resetForm()} />
            </div>
          </Form>
        )}
      </Formik>

      <Modal isOpen={modalOpen} onClose={handleCloseModal} variant={modalVariant}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', padding: '1rem' }}>
          <p style={{ margin: 0 }}>{modalMessage}</p>
          <Button text="OK" variant="blueAccentButton" onClick={handleCloseModal} />
        </div>
      </Modal>
    </div>
  );
};

export default SpeakerForm;
