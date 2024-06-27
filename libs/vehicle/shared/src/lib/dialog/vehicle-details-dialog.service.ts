import { Injectable, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VehicleId } from '@st/vehicle/models';
import { VehicleDetailsDialogComponent } from './vehicle-details-dialog.component';

export interface VehicleDetailsDialogData {
  vehicleId: VehicleId;
}

@Injectable()
export class VehicleDetailsDialogService {
  constructor(private readonly dialog: MatDialog, private readonly vcRef: ViewContainerRef) {}

  open(vehicleId: VehicleId) {
    return this.dialog.open<VehicleDetailsDialogComponent, VehicleDetailsDialogData>(VehicleDetailsDialogComponent, {
      viewContainerRef: this.vcRef,
      data: {
        vehicleId,
      },
    });
  }
}
