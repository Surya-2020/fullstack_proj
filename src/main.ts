import { bootstrapApplication } from '@angular/platform-browser';
import routeConfig from './app/app.routes';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routeConfig), provideHttpClient()],
}).catch((err) => console.error(err));
