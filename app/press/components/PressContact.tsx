"use client";

import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { pressClientValidationSchema, PressFormData } from '@/lib/forms/validation/press';
import FormFieldFormikAdapter from '../../components/utilities/forms/FormFieldFormikAdapter';
import TextAreaFormikAdapter from '../../components/utilities/forms/TextAreaFormikAdapter';
import RadioContainerFormikAdapter from '../../components/utilities/forms/RadioContainerFormikAdapter';
import Button from '../../components/utilities/buttons/Button';
import Modal from '../../components/utilities/modal/Modal';
import styles from './PressContact.module.css';
import { submitForm } from '@/lib/forms/client/submitForm';

type PressContactProps = React.HTMLAttributes<HTMLDivElement>;

const PressContact: React.FC<PressContactProps> = (props) => {
  const initialValues: PressFormData = {
    name: '',
    titleOrRole: '',
    email: '',
    outletOrPlatform: '',
    message: '',
    hearAbout: null,
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [modalVariant, setModalVariant] = useState<'primaryBlue' | 'blackRed'>('primaryBlue');
  const [modalMessage, setModalMessage] = useState('');

  const handleCloseModal = () => setModalOpen(false);

  const handleSubmit = async (
    values: PressFormData,
    { resetForm, setSubmitting }: { resetForm: () => void; setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      const result = await submitForm('press', values);

      if (result.success) {
        setModalVariant('primaryBlue');
        setModalMessage('Press form submitted successfully. Thank you!');
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
    <div className={styles.pressContactContainer} {...props}>
      <h2 className={styles.formTitle}>Press Contact</h2>
      <Formik initialValues={initialValues} validationSchema={pressClientValidationSchema} onSubmit={handleSubmit}>
        {({ isSubmitting, resetForm }) => (
          <Form>
            <div className={styles.formFieldWrapper}>
              <FormFieldFormikAdapter
                name="name"
                label="Name"
                placeholder="Enter your name"
              />
            </div>

            <div className={styles.formFieldWrapper}>
              <FormFieldFormikAdapter
                name="titleOrRole"
                label="Title / Role"
                placeholder="Enter your title or role"
              />
            </div>

            <div className={styles.formFieldWrapper}>
              <FormFieldFormikAdapter
                name="email"
                label="Email"
                placeholder="Enter your email"
              />
            </div>

            <div className={styles.formFieldWrapper}>
              <FormFieldFormikAdapter
                name="outletOrPlatform"
                label="Outlet / Platform"
                placeholder="Enter your outlet or platform"
              />
            </div>

            <div className={styles.formFieldWrapper}>
              <TextAreaFormikAdapter
                name="message"
                label="Message"
                placeholder="Enter your message (minimum 20 characters)"
              />
            </div>

            <div className={styles.formFieldWrapper}>
              <RadioContainerFormikAdapter
                name="hearAbout"
                title="How did you hear about Rito?"
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

export default PressContact;
