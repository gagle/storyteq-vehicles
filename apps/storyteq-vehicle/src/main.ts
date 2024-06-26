import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { enableElfProdMode } from '@ngneat/elf';
import { devTools } from '@ngneat/elf-devtools';
import { IS_PROD_BUILD } from '@st/core/environment';
import { AppComponent } from './app/app.component';
import { APP_CONFIG } from './app/app.config';

if (IS_PROD_BUILD) {
  enableProdMode();
  enableElfProdMode();
} else {
  devTools();
}

bootstrapApplication(AppComponent, APP_CONFIG).catch((err) => console.error(err));
