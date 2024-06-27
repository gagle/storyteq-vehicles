import { ChangeDetectionStrategy, Component, Inject, Provider } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { assertNonNullable } from '@st/core/util/assert';
import { VehicleStoreModel } from '@st/vehicle/models';
import { VehicleQuery } from '@st/vehicle/state/vehicle.query';
import { VehicleDetailsDialogData } from './vehicle-details-dialog.service';
import { VEHICLE } from './vehicle-token';

function provideVehicle(): Provider {
  return {
    provide: VEHICLE,
    deps: [VehicleQuery, MAT_DIALOG_DATA],
    useFactory: (vehicleQuery: VehicleQuery, data: VehicleDetailsDialogData) => {
      const vehicle = vehicleQuery.getEntity(data.vehicleId);
      assertNonNullable(vehicle, `vehicle "${data.vehicleId}"`);
      return vehicle;
    },
  };
}

@Component({
  selector: 'st-vehicle-details-dialog',
  templateUrl: './vehicle-details-dialog.component.html',
  styleUrls: ['./vehicle-details-dialog.component.scss'],
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent],
  providers: [provideVehicle()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehicleDetailsDialogComponent {
  constructor(@Inject(VEHICLE) readonly vehicle: VehicleStoreModel) {}
}
