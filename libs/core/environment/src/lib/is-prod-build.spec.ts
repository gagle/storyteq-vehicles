import { environment } from './environments/environment';
import { IS_PROD_BUILD } from './is-prod-build';

describe('is-prod-build', () => {
  it('should read the "production_build" environment property', () => {
    expect(IS_PROD_BUILD).toEqual(environment.production_build);
  });
});
