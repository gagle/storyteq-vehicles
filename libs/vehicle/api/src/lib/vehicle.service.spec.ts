import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideMockErrorHandlerService } from '@st/core/error-handling/testing';
import { mockWith } from '@st/testing';
import { VehicleBaseHttpModel, VehicleFullHttpModel, VehicleStoreModel } from '@st/vehicle/models';
import { of, tap, throwError } from 'rxjs';
import { Mock } from 'ts-mockery';
import { VehicleService } from './vehicle.service';
import { VehicleHttpService } from './vehicle-http.service';

describe(VehicleService, () => {
  let service: VehicleService;
  let vehicleHttpService: VehicleHttpService;

  beforeEach(async () => {
    console.debug = jest.fn();

    TestBed.configureTestingModule({
      providers: [
        VehicleService,
        provideMockErrorHandlerService(),
        mockWith(
          VehicleHttpService,
          Mock.of<VehicleHttpService>({
            getAll: jest.fn(() =>
              of([
                {
                  id: '1',
                  media: [
                    {
                      url: '/foo/1x1',
                    },
                    {
                      url: '/foo/16x9',
                    },
                  ],
                },
                {
                  id: '2',
                  media: [
                    {
                      url: '/bar/1x1',
                    },
                    {
                      url: '/bar/16x9',
                    },
                  ],
                },
              ] as VehicleBaseHttpModel[]),
            ),
            get: jest.fn(() =>
              of({
                description: 'description',
              } as VehicleFullHttpModel),
            ),
          }),
        ),
      ],
    });

    service = TestBed.inject(VehicleService);
    vehicleHttpService = TestBed.inject(VehicleHttpService);
  });

  describe('getAll', () => {
    it('should fetch all vehicles and their full details', () => {
      let vehicles: VehicleStoreModel[] = [];

      service
        .getAll()
        .pipe(
          tap((value) => {
            vehicles = value;
          }),
        )
        .subscribe();

      expect(vehicleHttpService.getAll).toHaveBeenCalledTimes(1);
      expect(vehicleHttpService.get).toHaveBeenCalledTimes(2);
      expect(vehicles.length).toEqual(2);
      expect(vehicles[0].imgSquareUrl).toEqual('assets/foo/1x1');
      expect(vehicles[0].imgWideUrl).toEqual('assets/foo/16x9');
      expect(vehicles[0].description).toEqual('description');
    });

    it('should catch and filter-out "get" errors', () => {
      const err = new HttpErrorResponse({ status: 500, error: {} });

      vehicleHttpService.get = jest.fn(() => throwError(() => err));

      let vehicles: VehicleStoreModel[] = [];

      service
        .getAll()
        .pipe(
          tap((value) => {
            vehicles = value;
          }),
        )
        .subscribe();

      expect(vehicleHttpService.getAll).toHaveBeenCalledTimes(1);
      expect(vehicleHttpService.get).toHaveBeenCalledTimes(2);
      expect(vehicles.length).toEqual(0);
    });
  });
});
