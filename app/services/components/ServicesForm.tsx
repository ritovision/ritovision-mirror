"use client";

import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { servicesClientValidationSchema, ServicesFormData } from '@/lib/forms/validation/services';
import FormFieldFormikAdapter from '@/utilities/forms/FormFieldFormikAdapter';
import TextAreaFormikAdapter from '@/utilities/forms/TextAreaFormikAdapter';
import DropdownFormikAdapter from '@/utilities/dropdown/DropdownFormikAdapter';
import SliderFormikAdapter from '@/utilities/slider/SliderFormikAdapter';
import Button from '@/utilities/buttons/Button';
import Modal from '@/utilities/modal/Modal';
import { submitForm } from '@/lib/forms/client/submitForm';

const ServicesForm: React.FC = () => {
  const initialValues = {
    companyName: '',
    contactEmail: '',
    serviceType: '',
    description: '',
    budget: "Below $50k",
  } as unknown as ServicesFormData;

  const [modalOpen, setModalOpen] = useState(false);
  const [modalVariant, setModalVariant] = useState<'primaryBlue' | 'blackRed'>('primaryBlue');
  const [modalMessage, setModalMessage] = useState('');

  const handleCloseModal = () => setModalOpen(false);

  const handleSubmit = async (
    values: ServicesFormData,
    { resetForm, setSubmitting }: { resetForm: () => void; setSubmitting: (isSubmitting: boolean) => void; }
  ) => {
    try {
      const result = await submitForm('services', values);

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
    <div
      id="services-form"
      className="servicesFormContainer"
      style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}
    >
      <h2 style={{ marginBottom: '1rem' }}>Contact Services</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={servicesClientValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, resetForm }) => (
          <Form>
            <div style={{ marginBottom: '1rem' }}>
              <FormFieldFormikAdapter
                name="companyName"
                label="Company Name"
                placeholder="Enter your company name"
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <FormFieldFormikAdapter
                name="contactEmail"
                label="Contact Email"
                placeholder="Enter your email"
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <DropdownFormikAdapter
                name="serviceType"
                label="Select Service Type"
                headerText="Service Type"
                items={["Consulting", "Development", "Management"]}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <TextAreaFormikAdapter
                name="description"
                label="Description"
                placeholder="Provide a detailed description of your needs"
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <SliderFormikAdapter
                name="budget"
                title="Budget"
                marks={["<$50k", "$50k - $100k", ">$100k"]}
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

export default ServicesForm;
