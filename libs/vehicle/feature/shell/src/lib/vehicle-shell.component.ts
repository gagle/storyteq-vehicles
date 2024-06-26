import { ChangeDetectionStrategy, Component } from '@angular/core';
import { provideVehicle } from '@st/vehicle/api/provide-vehicle';
import { VehicleListComponent } from '@st/vehicle/shared/list/vehicle-list.component';

@Component({
  selector: 'st-vehicle-shell',
  templateUrl: './vehicle-shell.component.html',
  styleUrls: ['./vehicle-shell.component.scss'],
  standalone: true,
  imports: [VehicleListComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideVehicle()],
})
export class VehicleShellComponent {}
