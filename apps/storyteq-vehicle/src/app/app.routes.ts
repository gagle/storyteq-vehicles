import { Route } from '@angular/router';
import { VehicleView } from '@st/vehicle/routing';

export const APP_ROUTES: Route[] = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: VehicleView.Overview,
        pathMatch: 'full',
      },
      {
        path: VehicleView.Overview,
        loadChildren: () => import('@st/vehicle/feature/shell').then((m) => m.VEHICLE_SHELL_ROUTES),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
