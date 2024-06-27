import { VehicleBaseHttpModel, VehicleFullHttpModel } from './vehicle-http.model';

export type VehicleId = string;

export interface VehicleStoreState {
  loading: boolean;
}

export type VehicleStoreModel = VehicleBaseHttpModel &
  VehicleFullHttpModel & {
    imgSquareUrl: string;
    imgWideUrl: string;
  };
