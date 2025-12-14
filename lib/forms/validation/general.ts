import * as yup from 'yup';

export interface GeneralFormData {
  name: string;
  email: string;
  message: string;
}

export const generalClientValidationSchema = yup
  .object({
    name: yup
      .string()
      .max(100, 'Name must be at most 100 characters')
      .required('Name is required'),
      
    email: yup
      .string()
      .email('Invalid email format')
      .max(100, 'Email must be at most 100 characters')
      .required('Email is required'),
      
    message: yup
      .string()
      .min(20, 'Message must be at least 20 characters')
      .max(2000, 'Message must be at most 2000 characters')
      .required('Message is required'),
  })
  .noUnknown(true, 'Unexpected keys provided.')
  .strict();

export const generalServerValidationSchema = generalClientValidationSchema;
