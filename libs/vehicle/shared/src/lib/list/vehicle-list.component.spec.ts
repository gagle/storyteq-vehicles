import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideMockErrorHandlerService } from '@st/core/error-handling/testing';
import { mockWith } from '@st/testing';
import { VehicleService } from '@st/vehicle/api/vehicle.service';
import { VehicleStoreModel } from '@st/vehicle/models';
import { VehicleQuery } from '@st/vehicle/state/vehicle.query';
import { of } from 'rxjs';
import { Mock } from 'ts-mockery';
import { VehicleDetailsDialogService } from '../dialog/vehicle-details-dialog.service';
import { VehicleListComponent } from './vehicle-list.component';

describe(VehicleListComponent, () => {
  let fixture: ComponentFixture<VehicleListComponent>;
  let vehicleService: VehicleService;

  const mockVehicles = [{ id: '1' }, { id: '2' }] as VehicleStoreModel[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleListComponent],
      providers: [
        provideNoopAnimations(),
        provideMockErrorHandlerService(),
        mockWith(
          VehicleService,
          Mock.of<VehicleService>({
            getAll: jest.fn(() => of(mockVehicles)),
          }),
        ),
        mockWith(
          VehicleQuery,
          Mock.of<VehicleQuery>({
            selectAllEntities: () => of(mockVehicles),
            getEntity: () => mockVehicles[0],
          }),
        ),
        mockWith(
          VehicleDetailsDialogService,
          Mock.of<VehicleDetailsDialogService>({
            open: jest.fn(),
          }),
        ),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleListComponent);
    fixture.detectChanges();

    vehicleService = TestBed.inject(VehicleService);
  });

  it('should display all vehicles', () => {
    expect(vehicleService.getAll).toHaveBeenCalledTimes(1);

    const vehicles = fixture.debugElement.queryAll(By.css('.vehicle'));
    expect(vehicles.length).toEqual(2);
  });
});
