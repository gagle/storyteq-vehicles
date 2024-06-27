import { ChangeDetectionStrategy, Component } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { getAnimationAppearDisappear } from '@st/animation';
import { ErrorHandlerService } from '@st/core/error-handling';
import { VehicleService } from '@st/vehicle/api/vehicle.service';
import { VehicleId } from '@st/vehicle/models';
import { VehicleQuery } from '@st/vehicle/state/vehicle.query';
import { of } from 'rxjs';
import { VehicleDetailsDialogService } from '../dialog/vehicle-details-dialog.service';

@Component({
  selector: 'st-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss'],
  standalone: true,
  providers: [VehicleDetailsDialogService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [getAnimationAppearDisappear({ enter: 500 })],
})
export class VehicleListComponent {
  constructor(
    private readonly vehicleService: VehicleService,
    private readonly vehicleDetailsDialogService: VehicleDetailsDialogService,
    private readonly vehicleQuery: VehicleQuery,
    private readonly errorHandlerService: ErrorHandlerService,
  ) {
    this.loadVehicles().pipe(takeUntilDestroyed()).subscribe();
  }

  readonly vehicles = toSignal(this.vehicleQuery.selectAllEntities());

  openVehicleDetailsDialog(vehicleId: VehicleId) {
    this.vehicleDetailsDialogService.open(vehicleId);
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
