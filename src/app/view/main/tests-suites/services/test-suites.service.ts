import { Injectable } from '@angular/core';
import { ApiService } from '../../../../services/api/api.service';
import { TestSuites } from '../interfaces/test-suites.interface';
import { TestCase } from '../interfaces/test-case.interface';


@Injectable()
export class TestSuitesService {
  private source: string[];

  constructor(
    private api: ApiService
  ) { }

  public async initialize() {
    this.source = await this.getTestSutes();
  }

  public getArchivesName() {
    return this.source;
  }

  public async getTestSutes(): Promise<string[]> {
    return await this.api.get<string[]>('/api/tests', { responseType: 'json' });
  }

  public async getTestSute(name: string): Promise<TestSuites[]> {
    const suites = await this.api.get<TestSuites[]>(`/api/tests/${name}`, { responseType: 'json' });
    suites.forEach((suite) => {
      const data: { cases: TestCase[], totalFail: number, totalPass: number } = this.extraxtTestCases(suite.cases);
      suite.totalPass = data.totalPass;
      suite.totalFail = data.totalFail;
    });
    return suites;
  }

  private extraxtTestCases(casesTest: any[]): {
    cases: TestCase[], totalFail: number, totalPass: number
  } {
    let totalFail = 0;
    let totalPass = 0;
    let test: TestCase;
    const cases: TestCase[] = [];
    casesTest.forEach((item) => {
      test = this.extraxtTestCase(item);
      totalFail += test.fail;
      totalPass += test.pass;
      cases.push(test);
    });
    return {
      totalFail: totalFail,
      totalPass: totalPass,
      cases: cases
    };
  }

  private extraxtTestCase(data): TestCase {
    let pass = Number.parseInt(data.pass);
    let fail = Number.parseInt(data.fail);
    if (Number.isNaN(pass)) {
      pass = 0;
    }
    if (Number.isNaN(fail)) {
      fail = 0;
    }
    return {
      fail: fail,
      pass: pass,
      body: data.body,
      name: data.name,
    };
  }
}
