import { isNotNullish, isNullish } from './nullish';

describe('nullish', () => {
  describe(isNotNullish, () => {
    it('should check whether a value is not nullish', () => {
      expect(isNotNullish('foo')).toEqual(true);
      expect(isNotNullish(null)).toEqual(false);
      expect(isNotNullish(undefined)).toEqual(false);
    });
  });

  describe(isNullish, () => {
    it('should check whether a value is nullish', () => {
      expect(isNullish('foo')).toEqual(false);
      expect(isNullish(null)).toEqual(true);
      expect(isNullish(undefined)).toEqual(true);
    });
  });
});
