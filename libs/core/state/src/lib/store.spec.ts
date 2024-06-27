import { createStore, withProps } from '@ngneat/elf';
import { AppStore } from './app-store';

describe(AppStore, () => {
  interface TestStoreState {}
  const store = createStore({ name: 'test' }, withProps<TestStoreState>({}));

  it('should expose Elf store methods', () => {
    class TestStore extends AppStore<TestStoreState> {
      constructor() {
        super(store);
      }
    }

    const service = new TestStore();
    expect(service.storeName).toEqual(store.name);
    expect(service.getValue()).toEqual(store.getValue());
    expect(service.getValue()).toEqual(store.getValue());
  });

  it('should destroy the store when service is destroyed', () => {
    class TestStore extends AppStore<TestStoreState> {
      constructor() {
        super(store);
      }
    }

    const service = new TestStore();

    store.destroy = jest.fn();
    service.ngOnDestroy();

    expect(store.destroy).toHaveBeenCalledTimes(1);
  });
});
