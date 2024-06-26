import { Provider } from '@angular/core';
import { VehicleService } from './vehicle.service';
import { VehicleHttpService } from './vehicle-http.service';

export function provideVehicle(): Provider[] {
  return [VehicleService, VehicleHttpService];
}
