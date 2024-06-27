import { Injector } from '@angular/core';
import { catchError } from 'rxjs';
import { ErrorHandlerService } from '../error-handler.service';

export const provideMockErrorHandlerService = () => [
  {
    provide: ErrorHandlerService,
    deps: [Injector],
    useFactory: () => {
      const errorHandlerService = new ErrorHandlerService();

      errorHandlerService.error = () => undefined;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (errorHandlerService as any).catchError = (_errorMessage: string, selector: (err: unknown, caught: any) => any) =>
        catchError(selector);

      return errorHandlerService;
    },
  },
];
