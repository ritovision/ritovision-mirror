import * as yup from 'yup';

export interface ServicesFormData {
  companyName: string;
  contactEmail: string;
  serviceType: string;
  description: string;
  // Updated budget to be a string matching one of the slider labels
  budget?: string;
}

export const servicesClientValidationSchema = yup
  .object({
    companyName: yup
      .string()
      .max(200, 'Company name must be at most 200 characters')
      .required('Company name is required'),

    contactEmail: yup
      .string()
      .email('Invalid email format')
      .max(100, 'Email must be at most 100 characters')
      .required('Contact email is required'),

    serviceType: yup
      .string()
      .oneOf(['Consulting', 'Development', 'Management'], 'Invalid service type')
      .required('Service type is required'),

    description: yup
      .string()
      .min(20, 'Description must be at least 20 characters')
      .max(2000, 'Description must be at most 2000 characters')
      .required('Description is required'),

    // Budget is now a string and must be one of the allowed slider values.
    budget: yup
      .string()
      .oneOf(['Below $50k', '$50k - $100k', 'Above $100k'], 'Invalid budget option')
      .optional(),
  })
  .noUnknown(true, 'Unexpected keys provided.')
  .strict();

export const servicesServerValidationSchema = servicesClientValidationSchema;
