import { ChangeDetectionStrategy, Component } from '@angular/core';
import { VehicleListComponent } from '@st/vehicle/shared/list/vehicle-list.component';

@Component({
  selector: 'st-vehicle-shell',
  templateUrl: './vehicle-shell.component.html',
  styleUrls: ['./vehicle-shell.component.scss'],
  standalone: true,
  imports: [VehicleListComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex h-full',
  },
})
export class VehicleShellComponent {}
