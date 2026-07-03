import { describe, it, expect } from 'vitest';
import { servicesClientValidationSchema } from '../services';
import { faker } from '@faker-js/faker';

describe('servicesClientValidationSchema', () => {
    it('should validate valid data', async () => {
        const validData = {
            companyName: faker.company.name(),
            contactEmail: faker.internet.email(),
            serviceType: 'Development',
            description: faker.string.alpha(30),
            budget: '$50k - $100k',
        };

        await expect(servicesClientValidationSchema.validate(validData)).resolves.toBeDefined();
    });

    it('should fail if serviceType is invalid', async () => {
        const invalidData = {
            companyName: faker.company.name(),
            contactEmail: faker.internet.email(),
            serviceType: 'Invalid',
            description: faker.string.alpha(30),
        };

        await expect(servicesClientValidationSchema.validate(invalidData)).rejects.toThrow('Invalid service type');
    });

    it('should fail if budget is invalid', async () => {
        const invalidData = {
            companyName: faker.company.name(),
            contactEmail: faker.internet.email(),
            serviceType: 'Development',
            description: faker.string.alpha(30),
            budget: 'Invalid Budget',
        };

        await expect(servicesClientValidationSchema.validate(invalidData)).rejects.toThrow('Invalid budget option');
    });
});
