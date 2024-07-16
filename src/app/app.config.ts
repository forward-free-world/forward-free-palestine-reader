import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';

import { DiskPostReader } from './services/post-reader.service';
import { POST_READER } from './tokens/post-reader.token';
import { routes } from './app.routes';
import { MARKDOWN_CONVERTER } from './tokens/markdown-converter.token';
import Showdown from 'showdown';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    {
      provide: POST_READER,
      useExisting: DiskPostReader
    },
    { provide: MARKDOWN_CONVERTER, useFactory: () => new Showdown.Converter() }
  ]
};
