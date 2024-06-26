import { Injectable } from '@angular/core';
import { createStore, withProps } from '@ngneat/elf';
import { upsertEntities, withEntities } from '@ngneat/elf-entities';
import { AppStore } from '@st/core/state';
import { VehicleId, VehicleStoreModel, VehicleStoreState } from '@st/vehicle/models';

export function createInitialState(): VehicleStoreState {
  return {
    loading: false,
  };
}

@Injectable({ providedIn: 'root' })
export class VehicleStore extends AppStore<
  {
    entities: Record<VehicleId, VehicleStoreModel>;
    ids: VehicleId[];
  } & VehicleStoreState
> {
  constructor() {
    super(
      createStore(
        { name: 'vehicle' },
        withEntities<VehicleStoreModel, 'id'>({ idKey: 'id' }),
        withProps<VehicleStoreState>(createInitialState()),
      ),
    );
  }

  upsertMany(vehicles: VehicleStoreModel[]) {
    this.store.update(upsertEntities(vehicles));
  }

  setLoading(loading: boolean) {
    this.store.update((state) => ({
      ...state,
      loading,
    }));
  }
}
