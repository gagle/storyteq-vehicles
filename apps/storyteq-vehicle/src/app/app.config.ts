import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideErrorHandling } from '@st/core/error-handling';
import { APP_ROUTES } from './app.routes';

export const APP_CONFIG: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideRouter(APP_ROUTES),
    provideErrorHandling(),
    provideAnimations(),
  ],
};
