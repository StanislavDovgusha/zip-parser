import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiOptions } from '../../interfaces/api-options.interface';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ApiService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public get<T>(url: string, options: ApiOptions = null): Promise<T> {
    return this.request('GET', url, options);
  }

  public post<T>(url: string, body: {}, options: ApiOptions = null): Promise<T> {
    return this.request('POST', url, options, body);
  }

  public put<T>(url: string, body: {}, options: ApiOptions = null): Promise<T> {
    return this.request('PUT', url, options, body);
  }

  public patch<T>(url: string, body: {}, options: ApiOptions = null): Promise<T> {
    return this.request('PATCH', url, options, body);
  }

  public delete<T>(url: string, body: {}, options: ApiOptions = null): Promise<T> {
    return this.request('DELETE', url, options, body);
  }

  private request(method: string, url: string, options: ApiOptions, body: {} = null): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.request(method, url, this.generateOptions(options, body)).toPromise().then((data) => {
        resolve(data);
      }).catch((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          console.warn('ERROR!');
        }
        console.error(error);
        reject(error.error ? error.error.message : 'System Error');
      });
    });
  }

  private generateOptions(apiOptions: ApiOptions, body: {}): {
    headers?: HttpHeaders,
    body?: {},
    observe: 'response' | 'body';
    responseType?: 'json' | 'arraybuffer' | 'blob' | 'text'
  } {
    let headers = new HttpHeaders();
    if (apiOptions.header) {
      headers = apiOptions.header;
    }
    headers = headers.append('Authorization', `bearer ${sessionStorage.getItem('auth.token')}`);
    return {
      headers: headers,
      body: body,
      observe: apiOptions != null ? apiOptions.observe ? apiOptions.observe : 'body' : 'body',
      responseType: apiOptions != null ? apiOptions.responseType : 'json'
    };
  }


}
