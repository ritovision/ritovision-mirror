import { describe, it, expect, vi } from 'vitest';
import { loadValidationSchema } from '../validationSchemaLoader';

const mockSchema = { type: 'mockSchema' };

// Fixed: Removed the 3rd argument { virtual: true }
vi.mock('@/app/api/forms/contact/types-and-validation', () => ({
    contactClientValidationSchema: mockSchema,
}));

describe('loadValidationSchema', () => {
    it('should load schema for valid form name', async () => {
        const schema = await loadValidationSchema('contact');
        expect(schema).toEqual(mockSchema);
    });

    it('should throw error if module not found', async () => {
        await expect(loadValidationSchema('unknown')).rejects.toThrow();
    });
});
