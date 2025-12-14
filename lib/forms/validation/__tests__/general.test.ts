import { describe, it, expect } from 'vitest';
import { generalClientValidationSchema } from '../general';
import { faker } from '@faker-js/faker';

describe('generalClientValidationSchema', () => {
    it('should validate valid data', async () => {
        const validData = {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            message: faker.string.alpha(30),
        };

        await expect(generalClientValidationSchema.validate(validData)).resolves.toBeDefined();
    });

    it('should fail if message is too short', async () => {
        const invalidData = {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            message: 'too short',
        };

        await expect(generalClientValidationSchema.validate(invalidData)).rejects.toThrow('Message must be at least 20 characters');
    });
});
