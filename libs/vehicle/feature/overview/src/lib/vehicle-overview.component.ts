import { ChangeDetectionStrategy, Component } from '@angular/core';
import { VehicleListComponent } from '@st/vehicle/shared/list/vehicle-list.component';

@Component({
  selector: 'st-vehicle-overview',
  templateUrl: './vehicle-overview.component.html',
  styleUrls: ['./vehicle-overview.component.scss'],
  standalone: true,
  imports: [VehicleListComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'h-full',
  },
})
export class VehicleOverviewComponent {}
