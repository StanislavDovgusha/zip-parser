import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Info } from '../../interfaces/info.interface';

@Injectable()
export class InfoService {
  constructor(private api: ApiService) {
  }

  public async getVersion(): Promise<string> {
    const info = await this.api.get<Info>('/api/info?key=version', { responseType: 'json' });
    return info.value;
  }

}
