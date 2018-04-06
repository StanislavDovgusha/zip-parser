import { Component, OnInit, Input } from '@angular/core';
import { TestSuites } from '../../interfaces/test-suites.interface';

@Component({
  selector: 'app-tests-case',
  templateUrl: './tests-case.component.html',
  styleUrls: ['./tests-case.component.scss']
})
export class TestsCaseComponent implements OnInit {

  @Input('suites')
  public suites: TestSuites[];

  public spaces: { isSelected: boolean, name: string, suites: TestSuites[] }[];

  private cols: { header: string, field: string, className: string }[];

  constructor() { }

  public async ngOnInit() {
    this.spaces = [];
    this.cols = [
      { header: 'Test case', field: 'name', className: '' },
      { header: 'Pass', field: 'pass', className: 'cel-number' },
      { header: 'Fail', field: 'fail', className: 'cel-number' },
    ];
    this.genereteSpaces();
  }

  public async genereteSpaces() {
    this.suites.forEach((suite) => {
      suite.archiveName = suite.archiveName.replace('\\', '>').replace('\/', '>');
      const spases: string[] = suite.archiveName.split('>');
      suite.archiveName = spases[1];
      for (let i = 0; i < this.spaces.length; i++) {
        if (this.spaces[i].name === spases[0]) {
          this.spaces[i].suites.push(suite);
          return;
        }
      }
      this.spaces.push({
        name: spases[0],
        suites: [suite],
        isSelected: false
      });
    });
  }

  select(suite) {
    suite.isSelected = !suite.isSelected;
  }

  openSpace(space) {
    space.isSelected = !space.isSelected;
  }
}
