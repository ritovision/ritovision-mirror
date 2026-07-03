import * as yup from 'yup';

export interface SpeakerFormData {
  name: string;
  company?: string | null;
  position: string;
  event: string;
  dates: string;
  description: string;
  hearAbout?: string | null;
}

export const speakerClientValidationSchema = yup
  .object({
    name: yup
      .string()
      .max(100, 'Name must be at most 100 characters')
      .required('Name is required'),

    company: yup
      .string()
      .max(100, 'Company must be at most 100 characters')
      .nullable()
      .notRequired(),

    position: yup
      .string()
      .max(100, 'Position must be at most 100 characters')
      .required('Position is required'),

    event: yup
      .string()
      .max(100, 'Event must be at most 100 characters')
      .required('Event is required'),

    dates: yup
      .string()
      .max(100, 'Dates must be at most 100 characters')
      .required('Dates are required'),

    description: yup
      .string()
      .min(20, 'Description must be at least 20 characters')
      .max(2000, 'Description must be at most 2000 characters')
      .required('Description is required'),

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

export const speakerServerValidationSchema = speakerClientValidationSchema;
