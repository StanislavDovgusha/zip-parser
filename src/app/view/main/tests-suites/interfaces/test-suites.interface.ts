import { TestCase } from './test-case.interface';

export interface TestSuites {
  archiveName: string;
  cases: TestCase[];
  totalPass: number;
  totalFail: number;
  isSelected?: boolean;
}
