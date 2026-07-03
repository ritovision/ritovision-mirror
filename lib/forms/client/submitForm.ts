import { formsConfig } from '@/lib/config/forms';

export interface FormSubmissionResponse {
  success: boolean;
  errors?: string[];
  error?: string;
}

/**
 * Submit form data to Cloudflare Worker
 * In development with mocking enabled, returns mock success without API call
 *
 * @param formId - The form identifier (general, services, speaker, press, contact, feedback, projects)
 * @param data - Form data object to submit
 * @returns Promise resolving to success/error response
 */
export async function submitForm(
  formId: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
): Promise<FormSubmissionResponse> {
  // Dev mocking: return mock success without API call
  if (formsConfig.enableMocking) {
    console.log(`[DEV MOCK] Form submission for "${formId}":`, data);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 500); // Simulate network delay
    });
  }

  // Production: submit to Cloudflare Worker
  const apiUrl = formsConfig.apiUrl;

  if (!apiUrl) {
    throw new Error(
      'NEXT_PUBLIC_FORMS_API_URL is not configured. Please set it in .env.local'
    );
  }

  const endpoint = `${apiUrl}/api/forms/${formId}`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result: FormSubmissionResponse = await response.json();

    if (!response.ok) {
      return result;
    }

    return result;
  } catch (error) {
    console.error('Form submission error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error occurred',
    };
  }
}
