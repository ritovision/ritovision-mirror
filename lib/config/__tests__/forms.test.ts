import { describe, it, expect } from 'vitest';
import { formsConfig } from '../forms';

describe('formsConfig', () => {
    it('should have default values', () => {
        expect(formsConfig).toHaveProperty('enableMocking');
        expect(formsConfig).toHaveProperty('apiUrl');
    });

    it('should allow enableMocking to be boolean', () => {
        expect(typeof formsConfig.enableMocking).toBe('boolean');
    });

    it('should allow apiUrl to be string or undefined', () => {
        if (formsConfig.apiUrl !== undefined) {
            expect(typeof formsConfig.apiUrl).toBe('string');
        } else {
            expect(formsConfig.apiUrl).toBeUndefined();
        }
    });
});
