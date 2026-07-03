// ./app/components/utilities/forms/GeneralForm.tsx
'use client';

import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { generalClientValidationSchema, GeneralFormData } from '@/lib/forms/validation/general';
import FormFieldFormikAdapter from '@/utilities/forms/FormFieldFormikAdapter';
import TextAreaFormikAdapter from '@/utilities/forms/TextAreaFormikAdapter';
import Button from '@/utilities/buttons/Button';
import Modal from '@/utilities/modal/Modal';
import { submitForm } from '@/lib/forms/client/submitForm';

const GeneralForm: React.FC = () => {
  const initialValues: GeneralFormData = {
    name: '',
    email: '',
    message: '',
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [modalVariant, setModalVariant] = useState<'primaryBlue' | 'blackRed'>('primaryBlue');
  const [modalMessage, setModalMessage] = useState('');

  const handleCloseModal = () => setModalOpen(false);

  const handleSubmit = async (
    values: GeneralFormData,
    { resetForm, setSubmitting }: { resetForm: () => void; setSubmitting: (isSubmitting: boolean) => void; }
  ) => {
    try {
      const result = await submitForm('general', values);

      if (result.success) {
        setModalVariant('primaryBlue');
        setModalMessage('Submission successful. Thank you!');
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
    <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
      <h2>General Contact Form</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={generalClientValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, resetForm }) => (
          <Form>
            <div style={{ marginBottom: '1rem' }}>
              <FormFieldFormikAdapter
                name="name"
                label="Name"
                placeholder="Enter your name"
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <FormFieldFormikAdapter
                name="email"
                label="Email"
                placeholder="Enter your email"
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <TextAreaFormikAdapter
                name="message"
                label="Message"
                placeholder="Enter your message (min 20 characters)"
              />
            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
              <Button isSubmit text="Submit" variant="blueAccentButton" isDisabled={isSubmitting} />
              <Button
                isReset
                text="Reset"
                variant="blueAccentButton2"
                onClick={() => resetForm()}
              />
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

export default GeneralForm;
