import { assertNonNullable } from './assert';

describe('assert', () => {
  describe(assertNonNullable, () => {
    it('should not throw error when value is not nullish', () => {
      expect(() => {
        assertNonNullable('value', 'value');
      }).not.toThrow();
    });

    it('should throw error when value is nullish', () => {
      expect(() => {
        assertNonNullable(null, 'value');
      }).toThrow();

      expect(() => {
        assertNonNullable(undefined, 'value');
      }).toThrow();
    });
  });
});
