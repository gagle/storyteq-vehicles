import { getEnvVar, SelfWithEnv } from './get-env-var';

describe(getEnvVar, () => {
  const globalObject = globalThis as SelfWithEnv;

  beforeAll(() => {
    console.error = jest.fn();
  });

  afterEach(() => {
    const partialGlobalObject = globalObject as Partial<SelfWithEnv>;
    delete partialGlobalObject.env;
  });

  it('should read properties from the global object', () => {
    globalObject.env = {
      foo: 'bar',
    };

    expect(getEnvVar('foo')).toEqual('bar');
    expect(getEnvVar('no-exist')).toEqual('');
  });

  it('should default to empty object if "env" was not set', () => {
    expect(getEnvVar('foo')).toEqual('');
  });
});
