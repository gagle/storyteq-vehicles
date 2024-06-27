import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of, tap, throwError } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';

describe(ErrorHandlerService, () => {
  let service: ErrorHandlerService;

  beforeEach(() => {
    console.error = jest.fn();
    console.warn = jest.fn();

    TestBed.configureTestingModule({
      providers: [],
    });

    service = TestBed.inject(ErrorHandlerService);
  });

  it('should implement the "ErrorHandler" interface', () => {
    const mockError = new Error('test error');
    service.handleError(mockError);
    expect(service).toBeTruthy();
  });

  describe('error', () => {
    it('should allow logging a random error', () => {
      service.error('error message');
      expect(service).toBeTruthy();
    });
  });

  describe('catchError', () => {
    it('should wrap the rxjs/catchError operator', () => {
      const err = new HttpErrorResponse({ status: 500, error: {} });
      const defaultCatchValue = 'default value';
      let defaultValue;

      throwError(() => err)
        .pipe(
          service.catchError('error description', () => of(defaultCatchValue)),
          tap((value) => {
            defaultValue = value;
          }),
        )
        .subscribe();

      expect(defaultValue).toEqual(defaultCatchValue);
    });
  });
});
