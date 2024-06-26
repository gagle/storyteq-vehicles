import { Routes } from '@angular/router';
import { DEFAULT_VEHICLE_VIEW, VehicleView } from '@st/vehicle/routing';
import { VehicleShellComponent } from './vehicle-shell.component';

export const VEHICLE_SHELL_ROUTES: Routes = [
  {
    path: '',
    component: VehicleShellComponent,
    children: [
      {
        path: '',
        redirectTo: DEFAULT_VEHICLE_VIEW,
        pathMatch: 'full',
      },
      {
        path: VehicleView.Overview,
        loadComponent: () => import('@st/vehicle/feature/overview').then((m) => m.VehicleOverviewComponent),
      },
    ],
  },
];
