export function assertNonNullable<T>(val: T, name: string): asserts val is NonNullable<T> {
  if (val === null || val === undefined) {
    const msg = `Expected "${name}" to be defined`;
    throw new Error(msg);
  }
}
