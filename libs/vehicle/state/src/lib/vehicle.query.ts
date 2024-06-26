import { Injectable } from '@angular/core';
import { select } from '@ngneat/elf';
import { getEntity, selectAllEntities, selectEntity } from '@ngneat/elf-entities';
import { VehicleId, VehicleStoreModel } from '@st/vehicle/models';
import { Observable } from 'rxjs';
import { VehicleStore } from './vehicle.store';

@Injectable({ providedIn: 'root' })
export class VehicleQuery {
  constructor(private readonly vehicleStore: VehicleStore) {}

  selectAllEntities(): Observable<VehicleStoreModel[]> {
    return this.vehicleStore.pipe(selectAllEntities());
  }

  selectEntity(vehicleId: VehicleId): Observable<VehicleStoreModel | undefined> {
    return this.vehicleStore.pipe(selectEntity(vehicleId));
  }

  getEntity(vehicleId: VehicleId): VehicleStoreModel | undefined {
    return this.vehicleStore.query(getEntity(vehicleId));
  }

  selectLoading(): Observable<boolean> {
    return this.vehicleStore.pipe(select((state) => state.loading));
  }
}
