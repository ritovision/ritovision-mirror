import { describe, it, expect } from 'vitest';
import { pressClientValidationSchema } from '../press';
import { faker } from '@faker-js/faker';

describe('pressClientValidationSchema', () => {
    it('should validate valid data', async () => {
        const validData = {
            name: faker.person.fullName(),
            titleOrRole: faker.person.jobTitle(),
            email: faker.internet.email(),
            outletOrPlatform: faker.company.name(),
            message: faker.string.alpha(30),
            hearAbout: 'social media',
        };

        await expect(pressClientValidationSchema.validate(validData)).resolves.toBeDefined();
    });

    it('should fail if required fields are missing', async () => {
        const invalidData = {
            name: faker.person.fullName(),
        };

        await expect(pressClientValidationSchema.validate(invalidData)).rejects.toThrow();
    });

    it('should fail if hearAbout is invalid', async () => {
        const invalidData = {
            name: faker.person.fullName(),
            titleOrRole: faker.person.jobTitle(),
            email: faker.internet.email(),
            outletOrPlatform: faker.company.name(),
            message: faker.string.alpha(30),
            hearAbout: 'invalid option',
        };

        await expect(pressClientValidationSchema.validate(invalidData)).rejects.toThrow('Invalid option');
    });
});
