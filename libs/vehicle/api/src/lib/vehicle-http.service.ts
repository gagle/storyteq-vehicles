import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@st/core/environment';
import { VehicleBaseHttpModel, VehicleFullHttpModel, VehicleId } from '@st/vehicle/models';
import { Observable } from 'rxjs';

@Injectable()
export class VehicleHttpService {
  constructor(private readonly httpClient: HttpClient) {}

  private readonly baseUrl = environment.url.vehicle_api;

  getAll(): Observable<VehicleBaseHttpModel[]> {
    return this.httpClient.get<VehicleBaseHttpModel[]>(this.baseUrl);
  }

  get(vehicleId: VehicleId): Observable<VehicleFullHttpModel> {
    return this.httpClient.get<VehicleFullHttpModel>(`${this.baseUrl}/${vehicleId}`);
  }
}
