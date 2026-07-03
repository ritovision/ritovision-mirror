import { describe, it, expect } from 'vitest';
import { projectsClientValidationSchema } from '../projects';
import { faker } from '@faker-js/faker';

describe('projectsClientValidationSchema', () => {
    it('should validate valid data', async () => {
        const validData = {
            projectName: faker.commerce.productName(),
            description: faker.string.alpha(30),
            startDate: new Date(),
            budget: 1000,
            active: true,
            technologies: ['React', 'Node.js'],
        };

        await expect(projectsClientValidationSchema.validate(validData)).resolves.toBeDefined();
    });

    it('should fail if budget is negative', async () => {
        const invalidData = {
            projectName: faker.commerce.productName(),
            description: faker.string.alpha(30),
            startDate: new Date(),
            budget: -100,
            active: true,
        };

        await expect(projectsClientValidationSchema.validate(invalidData)).rejects.toThrow('Budget must be a positive number');
    });
});
