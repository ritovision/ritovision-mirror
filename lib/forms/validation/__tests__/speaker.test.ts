import { describe, it, expect } from 'vitest';
import { speakerClientValidationSchema } from '../speaker';
import { faker } from '@faker-js/faker';

describe('speakerClientValidationSchema', () => {
    it('should validate valid data', async () => {
        const validData = {
            name: faker.person.fullName(),
            position: faker.person.jobTitle(),
            event: faker.company.catchPhrase(),
            dates: '2023-10-10',
            description: faker.string.alpha(30),
            hearAbout: 'article',
        };

        await expect(speakerClientValidationSchema.validate(validData)).resolves.toBeDefined();
    });

    it('should fail if required fields are missing', async () => {
        const invalidData = {
            name: faker.person.fullName(),
            // position missing
        };

        await expect(speakerClientValidationSchema.validate(invalidData)).rejects.toThrow();
    });
});
