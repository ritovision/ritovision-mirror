import { describe, it, expect } from 'vitest';
import { feedbackClientValidationSchema } from '../feedback';
import { faker } from '@faker-js/faker';

describe('feedbackClientValidationSchema', () => {
    it('should validate valid data', async () => {
        const validData = {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            body: faker.string.alpha(20),
        };

        await expect(feedbackClientValidationSchema.validate(validData)).resolves.toBeDefined();
    });

    it('should fail if required fields are missing', async () => {
        const invalidData = {
            name: faker.person.fullName(),
        };

        await expect(feedbackClientValidationSchema.validate(invalidData)).rejects.toThrow();
    });

    it('should fail if body is too short', async () => {
        const invalidData = {
            email: faker.internet.email(),
            body: 'short',
        };

        await expect(feedbackClientValidationSchema.validate(invalidData)).rejects.toThrow('Body must be at least 10 characters');
    });
});
