import { TestBed } from '@angular/core/testing';

import { ReloadListService } from './reload-list.service';

describe('ReloadListService', () => {
  let service: ReloadListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReloadListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
