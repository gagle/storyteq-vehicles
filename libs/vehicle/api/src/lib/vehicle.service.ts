import { Injectable } from '@angular/core';
import { VehicleHttpModel } from '@st/vehicle/models';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VehicleService {
  getAll(): Observable<VehicleHttpModel[]> {
    return of([]);
  }
}
