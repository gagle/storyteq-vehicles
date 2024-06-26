import { Route } from '@angular/router';

export const APP_ROUTES: Route[] = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () => import('@st/vehicle/feature/shell').then((m) => m.VEHICLE_SHELL_ROUTES),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
