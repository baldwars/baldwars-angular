import { TestBed } from '@angular/core/testing';

import { CodeSendService } from './code-send.service';

describe('CodeSendService', () => {
  let service: CodeSendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodeSendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
