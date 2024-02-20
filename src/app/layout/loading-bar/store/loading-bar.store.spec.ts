import { TestBed } from '@angular/core/testing';

import { LoadingBarStore } from './loading-bar.store';

describe(LoadingBarStore.name, () => {
  let service: LoadingBarStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingBarStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
