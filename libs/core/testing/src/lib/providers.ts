import { InjectionToken, Provider, Type } from '@angular/core';
import { Mock } from 'ts-mockery';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ConstructorFunction<T> = abstract new (...args: any[]) => T;

/**
 * Creates a mock of given service `provide` with defined implementation `mock`.
 * Use this if you need to mock a service in your unit test and need to specify return values.
 *
 * @param provide The service to mock
 * @param mock The mock implementation
 */
export const mockWith = <T>(provide: ConstructorFunction<T> | Type<T> | InjectionToken<T>, mock: T) =>
  ({
    provide,
    useFactory: () => mock,
  } as Provider);

/**
 * Creates a mock of all properties of a given service.
 * Use this if you need to mock a service in your unit test but don't care about the return values of functions.
 *
 * @param provide The service to mock
 */
export const mockAll = <T>(provide: ConstructorFunction<T> | Type<T> | InjectionToken<T>) => ({
  provide,
  useFactory: () => Mock.all<T>(),
});
