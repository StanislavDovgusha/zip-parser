import { HttpParams, HttpHeaders } from '@angular/common/http';

export interface ApiOptions {
  header?: HttpHeaders;
  responseType?: 'json' | 'arraybuffer' | 'blob' | 'text';
  params?: HttpParams | { [param: string]: string | string[]; };
  observe?: 'response' | 'body';
}
