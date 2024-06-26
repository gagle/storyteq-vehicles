declare function importScripts(): void;
type SelfWithEnv = typeof self & { env: Record<string, string> };

export const getEnvVar = (varName: string): string => {
  const env = new Map(Object.entries((self as SelfWithEnv).env || {}));

  const IS_WEB_WORKER_CONTEXT = typeof importScripts === 'function';
  if (IS_WEB_WORKER_CONTEXT) {
    throw Error(`"@y42/environment" indirectly being imported by web-worker`);
  }

  const varValue = env.get(varName);
  if (!varValue) {
    // TODO temporary, until environment library is cleaned up using the "/*" path alias approach
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!(window as any).IS_STORYBOOK) {
      console.error('missing env:', varName);
    }
    return '';
  }

  return varValue;
};
