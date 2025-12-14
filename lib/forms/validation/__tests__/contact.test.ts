import { describe, it, expect } from 'vitest';
import { contactClientValidationSchema } from '../contact';
import { faker } from '@faker-js/faker';

describe('contactClientValidationSchema', () => {
    it('should validate valid data', async () => {
        const validData = {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            body: faker.lorem.paragraph(),
            preferences: [faker.lorem.word(), faker.lorem.word()],
            slider: 50,
            dropdown: 'Option A',
        };

        await expect(contactClientValidationSchema.validate(validData)).resolves.toBeDefined();
    });

    it('should fail if required fields are missing', async () => {
        const invalidData = {
            // email missing
            // body missing
            slider: 50,
            dropdown: 'Option A',
        };

        await expect(contactClientValidationSchema.validate(invalidData)).rejects.toThrow();
    });

    it('should fail if email is invalid', async () => {
        const invalidData = {
            email: 'not-an-email',
            body: faker.lorem.paragraph(),
            slider: 50,
            dropdown: 'Option A',
        };

        await expect(contactClientValidationSchema.validate(invalidData)).rejects.toThrow('Invalid email format');
    });

    it('should fail if slider value is invalid', async () => {
        const invalidData = {
            email: faker.internet.email(),
            body: faker.lorem.paragraph(),
            slider: 33, // Invalid value
            dropdown: 'Option A',
        };

        await expect(contactClientValidationSchema.validate(invalidData)).rejects.toThrow('Invalid slider value');
    });

    it('should fail if dropdown value is invalid', async () => {
        const invalidData = {
            email: faker.internet.email(),
            body: faker.lorem.paragraph(),
            slider: 50,
            dropdown: 'Invalid Option',
        };

        await expect(contactClientValidationSchema.validate(invalidData)).rejects.toThrow('Invalid dropdown selection');
    });
});
