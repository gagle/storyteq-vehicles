import { Injectable, OnDestroy } from '@angular/core';
import { Store, StoreDef } from '@ngneat/elf';

@Injectable()
export abstract class AppStore<State extends object = object> implements OnDestroy {
  constructor(protected readonly store: Store<StoreDef<State>>) {}

  readonly storeName = this.store.name;
  readonly pipe = this.store.pipe.bind(this.store);
  readonly reset = this.store.reset.bind(this.store);
  readonly query = this.store.query.bind(this.store);
  readonly updateStore = this.store.update.bind(this.store);

  getValue() {
    return this.store.getValue();
  }

  ngOnDestroy() {
    this.store.destroy();
  }
}
