import { ChangeDetectionStrategy, Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { ErrorHandlerService } from '@st/error-handling';
import { VehicleService } from '@st/vehicle/api/vehicle.service';
import { of } from 'rxjs';

@Component({
  selector: 'st-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss'],
  standalone: true,
  imports: [RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehicleListComponent {
  constructor(
    private readonly vehicleService: VehicleService,
    private readonly errorHandlerService: ErrorHandlerService,
  ) {
    this.loadVehicles().pipe(takeUntilDestroyed()).subscribe();
  }

  private loadVehicles() {
    return this.vehicleService
      .getAll()
      .pipe(
        this.errorHandlerService.catchError('[VehicleListComponent.loadVehicles]: could not fetch vehicles', () =>
          of(undefined),
        ),
      );
  }
}
