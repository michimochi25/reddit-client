import { TestBed } from '@angular/core/testing';

import { GetAbout } from './get-about';

describe('GetAbout', () => {
  let service: GetAbout;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAbout);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
