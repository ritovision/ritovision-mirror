'use client';

import React, { useState } from 'react';
import { Field, Formik } from 'formik';
import type { FieldProps } from 'formik';
import styles from './ContactForm.module.css';

import Button from '../../buttons/Button';
import { Modal } from '../../modal';
import FormField from '../FormField';
import { submitForm } from '@/lib/forms/client/submitForm';

const initialValues = {
  name: '',
  email: '',
  body: '',
};

export interface ContactFormProps {
  /**
   * Optional override for submitting the form, useful for Storybook/tests.
   */
  submitFormFn?: typeof submitForm;
}

const ContactForm: React.FC<ContactFormProps> = ({ submitFormFn }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalVariant, setModalVariant] = useState<'primaryBlue' | 'blackRed'>('primaryBlue');
  const [modalMessage, setModalMessage] = useState('');

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const submit = submitFormFn || submitForm;
      const result = await submit('contact', values);

      if (result.success) {
        openModal('Form submitted successfully!', 'primaryBlue');
      } else {
        console.error('Submission error:', result.error || result.errors);
        openModal('Submission failed: ' + (result.error || result.errors?.join(', ')), 'blackRed');
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      openModal('Unexpected error occurred.', 'blackRed');
    }
  };

  const openModal = (message: string, variant: 'primaryBlue' | 'blackRed') => {
    setModalMessage(message);
    setModalVariant(variant);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ isSubmitting, handleSubmit }) => (
        <form onSubmit={handleSubmit} className={styles.formWrapper}>
          <Field name="name">
            {({ field, meta }: FieldProps) => (
              <FormField
                label="Name"
                placeholder="Your Name"
                state={
                  meta.touched
                    ? meta.error
                      ? 'invalid'
                      : 'valid'
                    : 'pre'
                }
                errorText={meta.error}
                {...field}
              />
            )}
          </Field>

          <Field name="email">
            {({ field, meta }: FieldProps) => (
              <FormField
                label="Email"
                placeholder="you@example.com"
                state={
                  meta.touched
                    ? meta.error
                      ? 'invalid'
                      : 'valid'
                    : 'pre'
                }
                errorText={meta.error}
                {...field}
              />
            )}
          </Field>

          <Field name="body">
            {({ field, meta }: FieldProps) => (
              <FormField
                label="Message"
                placeholder="Enter your message"
                state={
                  meta.touched
                    ? meta.error
                      ? 'invalid'
                      : 'valid'
                    : 'pre'
                }
                errorText={meta.error}
                {...field}
              />
            )}
          </Field>

          <div className={styles.actions}>
            <Button
              text="Send Message"
              variant="blueAccentButton"
              isSubmit
              isDisabled={isSubmitting}
            />
            <Button
              text="Help"
              variant="blackAndRedButton"
              onClick={() =>
                openModal('Please complete all required fields before submitting.', 'blackRed')
              }
            />
          </div>

          <Modal isOpen={modalOpen} onClose={closeModal} variant={modalVariant}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <p style={{ margin: '20px 0' }}>{modalMessage}</p>
              <Button
                text="Okay"
                variant={modalVariant === 'blackRed' ? 'blackAndRedButton' : 'blueAccentButton'}
                onClick={closeModal}
              />
            </div>
          </Modal>
        </form>
      )}
    </Formik>
  );
};

export default ContactForm;
