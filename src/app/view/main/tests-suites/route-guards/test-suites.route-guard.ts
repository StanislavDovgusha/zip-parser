import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { TestSuitesService } from '../services/test-suites.service';

@Injectable()
export class TestSuitesRouteGuard implements CanActivate {
  constructor(private _testSuites: TestSuitesService) { }

  public async canActivate(): Promise<boolean> {
    // Initialize module services
    try { await this._testSuites.initialize(); } catch { }
    return true;
  }
}
