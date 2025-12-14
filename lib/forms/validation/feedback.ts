import * as yup from 'yup';

export interface FeedbackFormData {
  name?: string;
  email: string;
  body: string;
}

export const feedbackClientValidationSchema = yup
  .object({
    name: yup.string().max(100, 'Name must be at most 100 characters').optional(),
    email: yup
      .string()
      .email('Invalid email format')
      .max(100, 'Email must be at most 100 characters')
      .required('Email is required'),
    body: yup
      .string()
      .min(10, 'Body must be at least 10 characters')
      .max(1000, 'Body must be at most 1000 characters')
      .required('Body is required'),
  })
  .noUnknown(true, 'Unexpected keys provided.')
  .strict();

export const feedbackServerValidationSchema = feedbackClientValidationSchema;
