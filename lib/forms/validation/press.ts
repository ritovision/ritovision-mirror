import * as yup from 'yup';

export interface PressFormData {
  name: string;
  titleOrRole: string;
  email: string;
  outletOrPlatform: string;
  message: string;
  hearAbout?: string | null;
}

export const pressClientValidationSchema = yup
  .object({
    name: yup
      .string()
      .max(200, 'Name must be at most 200 characters')
      .required('Name is required'),

    titleOrRole: yup
      .string()
      .max(200, 'Title/Role must be at most 200 characters')
      .required('Title/Role is required'),

    email: yup
      .string()
      .email('Invalid email format')
      .max(100, 'Email must be at most 100 characters')
      .required('Email is required'),

    outletOrPlatform: yup
      .string()
      .max(200, 'Outlet/Platform must be at most 200 characters')
      .required('Outlet/Platform is required'),

    message: yup
      .string()
      .min(20, 'Message must be at least 20 characters')
      .max(2000, 'Message must be at most 2000 characters')
      .required('Message is required'),

    hearAbout: yup
      .string()
      .oneOf(
        ['social media', 'search engine', 'word of mouth', 'article', 'other'],
        'Invalid option'
      )
      .nullable()
      .notRequired(),
  })
  .noUnknown(true, 'Unexpected keys provided.')
  .strict();

export const pressServerValidationSchema = pressClientValidationSchema;
