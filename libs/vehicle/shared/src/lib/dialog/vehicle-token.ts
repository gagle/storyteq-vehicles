import { InjectionToken } from '@angular/core';
import { VehicleStoreModel } from '@st/vehicle/models';

export const VEHICLE = new InjectionToken<VehicleStoreModel | null>('VEHICLE', {
  factory: () => null,
});
