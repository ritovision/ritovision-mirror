import { describe, it, expect, vi, beforeEach } from 'vitest';
import { submitForm } from '../submitForm';

// Mock the config
vi.mock('@/lib/config/forms', () => ({
    formsConfig: {
        apiUrl: 'https://api.example.com',
        enableMocking: false,
    },
}));

describe('submitForm', () => {
    const mockData = { name: 'Test User', email: 'test@example.com' };
    const formId = 'contact';

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should return mock success when mocking is enabled', async () => {
        // Re-import to get the mocked object
        const { formsConfig: mockedConfig } = await import('@/lib/config/forms');
        // @ts-expect-error - Intentionally modifying mocked config for testing
        mockedConfig.enableMocking = true;

        const result = await submitForm(formId, mockData);

        expect(result).toEqual({ success: true });
    });

    it('should submit to API when mocking is disabled', async () => {
        const { formsConfig: mockedConfig } = await import('@/lib/config/forms');
        // @ts-expect-error - Intentionally modifying mocked config for testing
        mockedConfig.enableMocking = false;
        // @ts-expect-error - Intentionally modifying mocked config for testing
        mockedConfig.apiUrl = 'https://api.example.com';

        // Mock fetch
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => ({ success: true }),
        } as Response);

        const result = await submitForm(formId, mockData);

        expect(global.fetch).toHaveBeenCalledWith(
            'https://api.example.com/api/forms/contact',
            expect.objectContaining({
                method: 'POST',
                body: JSON.stringify(mockData),
            })
        );
        expect(result).toEqual({ success: true });
    });

    it('should handle API errors', async () => {
        const { formsConfig: mockedConfig } = await import('@/lib/config/forms');
        // @ts-expect-error - Intentionally modifying mocked config for testing
        mockedConfig.enableMocking = false;

        // Mock fetch error
        global.fetch = vi.fn().mockResolvedValue({
            ok: false,
            json: async () => ({ success: false, error: 'Server error' }),
        } as Response);

        const result = await submitForm(formId, mockData);

        expect(result).toEqual({ success: false, error: 'Server error' });
    });

    it('should throw error if API URL is missing in production', async () => {
        const { formsConfig: mockedConfig } = await import('@/lib/config/forms');
        // @ts-expect-error - Intentionally modifying mocked config for testing
        mockedConfig.enableMocking = false;
        // @ts-expect-error - Intentionally modifying mocked config for testing
        mockedConfig.apiUrl = undefined;

        await expect(submitForm(formId, mockData)).rejects.toThrow(
            'NEXT_PUBLIC_FORMS_API_URL is not configured'
        );
    });

    it('should handle network errors', async () => {
        const { formsConfig: mockedConfig } = await import('@/lib/config/forms');
        // @ts-expect-error - Intentionally modifying mocked config for testing
        mockedConfig.enableMocking = false;
        // @ts-expect-error - Intentionally modifying mocked config for testing
        mockedConfig.apiUrl = 'https://api.example.com';

        global.fetch = vi.fn().mockRejectedValue(new Error('Network failure'));

        const result = await submitForm(formId, mockData);

        expect(result).toEqual({ success: false, error: 'Network failure' });
    });
});
