import { TestBed } from '@angular/core/testing';

import { TyperService } from './typer.service';

describe('TyperService', () => {
  let service: TyperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TyperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
