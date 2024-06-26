import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { catchError, Observable, ObservableInput, ObservedValueOf, OperatorFunction } from 'rxjs';

export interface ErrorHandlerOptions {
  err?: unknown;
  // Add additional context properties
}

/**
 * Used for logging errors. Currently it just overrides the Angular's built-in service but the
 * purpose is to send errors to an external service (eg. Sentry) and maybe display a toast message.
 */
@Injectable({ providedIn: 'root' })
export class ErrorHandlerService extends ErrorHandler {
  constructor(private readonly injector: Injector) {
    super();
  }

  /**
   * This method is called by Angular - **do not use it**.
   *
   * Please use `ErrorHandlerService.error` instead.
   *
   * @deprecated Please use `ErrorHandlerService.error` instead
   * @private
   */
  override handleError(error: unknown, options?: ErrorHandlerOptions): void {
    super.handleError(error);

    this.handleErrorHandlerOptions(error, {
      ...(options || {}),
    });
  }

  /**
   * Use this in place of the regular `rxjs/catchError`.
   *
   * @param errorMessage the technical error message that will be displayed in the external service
   * @param selector function that returns a new Observable value
   * @params options provide additional context or a toast message to be displayed
   */
  catchError<I, O extends ObservableInput<unknown>>(
    errorMessage: string,
    selector: (err: unknown, caught: Observable<I>) => O,
    _options?: Omit<ErrorHandlerOptions, 'err'>,
  ): OperatorFunction<I, I | ObservedValueOf<O>> {
    return catchError((err: unknown, caught) => {
      this.error(errorMessage, {
        err,
      });
      return selector(err, caught);
    });
  }

  /**
   * Reports error to external service.
   */
  error(_errorMessage: string, _options?: ErrorHandlerOptions): void {
    // Send error to external service
  }

  private handleErrorHandlerOptions(_err: unknown, _options?: ErrorHandlerOptions): void {
    // Maybe shoe toast message
  }
}
