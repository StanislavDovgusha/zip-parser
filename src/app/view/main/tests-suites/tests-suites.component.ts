import { Component, OnInit } from '@angular/core';
import { TestSuitesService } from './services/test-suites.service';
import { TestSuites } from './interfaces/test-suites.interface';


@Component({
  selector: 'app-tests-suites',
  templateUrl: './tests-suites.component.html',
  styleUrls: ['./tests-suites.component.scss']
})
export class TestsSuitesComponent implements OnInit {

  public selectedArchive: TestSuites[];
  public isSpinner = false;
  public archives: string[];

  constructor(
    private _testSuites: TestSuitesService
  ) { }

  public async ngOnInit() {
    this.archives = this._testSuites.getArchivesName();
    this.isSpinner = true;
  }

  public async getSuits($event: any) {
    this.selectedArchive = null;
    this.selectedArchive = await this._testSuites.getTestSute(this.archives[$event.index]);
  }

}
