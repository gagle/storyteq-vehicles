import { Injectable } from '@angular/core';
import { ErrorHandlerService } from '@st/core/error-handling';
import { isNotNullish } from '@st/core/util/nullish';
import {
  VehicleBaseHttpModel,
  VehicleFullHttpModel,
  VehicleMediaHttpModel,
  VehicleStoreModel,
} from '@st/vehicle/models';
import { VehicleStore } from '@st/vehicle/state/vehicle.store';
import { combineLatest, finalize, map, Observable, of, switchMap, tap } from 'rxjs';
import { VehicleHttpService } from './vehicle-http.service';

@Injectable()
export class VehicleService {
  constructor(
    private readonly vehicleHttpService: VehicleHttpService,
    private readonly vehicleStore: VehicleStore,
    private readonly errorHandlerService: ErrorHandlerService,
  ) {}

  getAll(): Observable<VehicleStoreModel[]> {
    this.vehicleStore.setLoading(true);

    return this.vehicleHttpService.getAll().pipe(
      switchMap((vehicles) => {
        return combineLatest(
          vehicles.map((vehicle) =>
            this.vehicleHttpService.get(vehicle.id).pipe(
              map((fullVehicle) => this.mapVehicleToStoreModel(vehicle, fullVehicle)),
              this.errorHandlerService.catchError(
                `[VehicleService.getAll]: failed to fetch vehicle '${vehicle.id}'`,
                () => of(undefined),
              ),
            ),
          ),
        );
      }),
      map((vehicles) => vehicles.filter(isNotNullish)),
      tap((vehicles) => {
        this.vehicleStore.upsertMany(vehicles);
      }),
      finalize(() => {
        this.vehicleStore.setLoading(false);
      }),
    );
  }

  private mapVehicleToStoreModel(
    baseVehicle: VehicleBaseHttpModel,
    fullVehicle: VehicleFullHttpModel,
  ): VehicleStoreModel {
    return {
      ...baseVehicle,
      ...fullVehicle,
      imgSquare: this.getVehicleImageUrl(baseVehicle.media, '1x1'),
      imgWide: this.getVehicleImageUrl(baseVehicle.media, '16x9'),
    };
  }

  private getVehicleImageUrl(media: VehicleMediaHttpModel[], substring: string) {
    const url = media.filter((img) => img.url.includes(substring))[0]?.url || '';
    return `assets${url}`;
  }
}
