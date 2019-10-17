import { TestBed } from '@angular/core/testing';

import { GithubProfileService } from './github-profile.service';

describe('GithubProfileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GithubProfileService = TestBed.get(GithubProfileService);
    expect(service).toBeTruthy();
  });
});
