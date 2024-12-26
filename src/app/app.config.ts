import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { LucideAngularModule, BookOpen, Info, Mail, Scale, Wand, X } from 'lucide-angular';
import Showdown from 'showdown';

import { DiskPostReader } from './services/post-reader.service';
import { MARKDOWN_CONVERTER } from './tokens/markdown-converter.token';
import { POST_READER } from './tokens/post-reader.token';
import { routes } from './app.routes';
import { SITE_TITLE } from './tokens/site-title.token';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(),
    importProvidersFrom(LucideAngularModule.pick({ BookOpen, Info, Mail, Scale, Wand, X })),
    {
      provide: POST_READER,
      useExisting: DiskPostReader
    },
    { provide: MARKDOWN_CONVERTER, useFactory: () => new Showdown.Converter() },
    { provide: SITE_TITLE, useValue: 'voices of gaza' }
  ]
};
