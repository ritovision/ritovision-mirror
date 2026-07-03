import * as yup from 'yup';

export interface ProjectsFormData {
  projectName: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  budget: number;
  technologies?: string[];
  active: boolean;
}

export const projectsClientValidationSchema = yup
  .object({
    projectName: yup
      .string()
      .min(3, 'Project name must be at least 3 characters')
      .max(100, 'Project name must be at most 100 characters')
      .required('Project name is required'),
    description: yup
      .string()
      .min(20, 'Description must be at least 20 characters')
      .max(2000, 'Description must be at most 2000 characters')
      .required('Description is required'),
    startDate: yup
      .date()
      .required('Start date is required'),
    endDate: yup
      .date()
      .optional(),
    budget: yup
      .number()
      .min(0, 'Budget must be a positive number')
      .required('Budget is required'),
    technologies: yup
      .array()
      .of(yup.string().required('Each technology must be a non-empty string'))
      .optional(),
    active: yup
      .boolean()
      .required('Active status is required'),
  })
  .noUnknown(true, 'Unexpected keys provided.')
  .strict();

export const projectsServerValidationSchema = projectsClientValidationSchema;
