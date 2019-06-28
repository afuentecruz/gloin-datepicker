import { TestBed } from '@angular/core/testing';

import { GloinDatepickerService } from './gloin-datepicker.service';

describe('GloinDatepickerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GloinDatepickerService = TestBed.get(GloinDatepickerService);
    expect(service).toBeTruthy();
  });
});
