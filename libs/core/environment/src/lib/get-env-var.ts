export type SelfWithEnv = typeof self & { env: Record<string, string> };

export function getEnvVar(varName: string): string {
  const env = new Map(Object.entries((self as SelfWithEnv).env || {}));

  const varValue = env.get(varName);
  if (!varValue) {
    console.error('[getEnvVar]: missing env var:', varName);
    return '';
  }

  return varValue;
}
