import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '@st/core/environment';
import { VehicleHttpService } from './vehicle-http.service';

describe(VehicleHttpService, () => {
  let service: VehicleHttpService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VehicleHttpService, provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(VehicleHttpService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('getAll', () => {
    it('should fetch all vehicles', () => {
      service.getAll().subscribe();

      const url = environment.url.vehicle_api;
      const req = httpTestingController.expectOne(url);
      req.flush([]);
    });
  });

  describe('get', () => {
    it('should fetch a single vehicle', () => {
      service.get('1').subscribe();

      const url = `${environment.url.vehicle_api}/1`;
      const req = httpTestingController.expectOne(url);
      req.flush({});
    });
  });
});
