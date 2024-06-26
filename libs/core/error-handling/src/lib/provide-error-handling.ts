import { ErrorHandler, Provider } from '@angular/core';
import { ErrorHandlerService } from './error-handler.service';

export function provideErrorHandling(): Provider[] {
  return [
    {
      provide: ErrorHandler,
      useClass: ErrorHandlerService,
    },
  ];
}
