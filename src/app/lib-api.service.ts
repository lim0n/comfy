import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LIBRARIES } from './app.data';
import { ILibrariesListResponse } from './utils/libraries-response.interface';

@Injectable({
  providedIn: 'root'
})
export class LibApiService {
  // readonly url = 'https://data.mos.ru/ehdapi/catalog/get';
  // readonly payload = {
  //   "id": 7361,
  //   "offset": 0,
  //   "limit": 10,
  //   "criteria": "",
  //   "fetchGeodata": true,
  //   "epoch": new Date( Date.now() - 35400000 ).toISOString().split('T').join(' ').slice(0,-5),
  //   "timestamp": 1
  // };
  // readonly headers = new HttpHeaders(
  //   {
  //     'ehd-system': 'opoh'
  //   });
  // readonly options = {
  //   headers: this.headers
  // };

  // constructor(
  //   private _http: HttpClient
  // ) { }

  // getLibraryList(): Observable<any> {
  //   return this._http.post(this.url, this.payload, this.options);
  // }

  getLibraryList(): Observable<ILibrariesListResponse> {
    return of(LIBRARIES as unknown as ILibrariesListResponse);
  }
}
