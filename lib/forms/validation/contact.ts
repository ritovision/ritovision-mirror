// app\api\forms\[formId]\contact\types-and-validation.ts
import * as yup from 'yup';

export interface ContactFormData {
  name?: string;
  email: string;
  body: string;
  preferences?: string[];
  slider: number;
  dropdown: string; // New required dropdown field
}

export const contactClientValidationSchema = yup
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
    preferences: yup
      .array()
      .of(yup.string().defined())
      .transform((value, originalValue) => {
        if (Array.isArray(originalValue)) {
          return originalValue.filter((item: unknown): item is string => typeof item === 'string');
        }
        return value;
      })
      .optional(),
    slider: yup
      .number()
      .oneOf([0, 25, 50, 75, 100], 'Invalid slider value')
      .required('Slider is required'),
    dropdown: yup
      .string()
      .oneOf(['Option A', 'Option B', 'Option C'], 'Invalid dropdown selection')
      .required('Dropdown selection is required'),
  })
  .noUnknown(true, 'Unexpected keys provided.')
  .strict();

export const contactServerValidationSchema = contactClientValidationSchema;
