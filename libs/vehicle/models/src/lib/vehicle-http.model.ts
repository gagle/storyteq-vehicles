import { VehicleId } from './vehicle.model';

export interface VehicleMediaHttpModel {
  name: string;
  url: string;
}

export interface VehicleBaseHttpModel {
  id: VehicleId;
  name: string;
  modelYear: string;
  apiUrl: string;
  media: VehicleMediaHttpModel[];
}

export interface VehicleMetaEmissionsHttpModel {
  template: string;
  value: number;
}

export interface VehicleMetaHttpModel {
  passengers: number;
  drivetrain: string[];
  bodystyles: string[];
  emissions: VehicleMetaEmissionsHttpModel;
}

export interface VehicleFullHttpModel {
  id: VehicleId;
  description: string;
  price?: string;
  meta: VehicleMetaHttpModel;
}
