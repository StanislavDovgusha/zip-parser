import { Component, OnInit } from '@angular/core';
import { InfoService } from './services/api/info.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public version;

  constructor(
    private _infoService: InfoService
  ) { }

  public async ngOnInit() {
    this.version = await this._infoService.getVersion();
  }

}
