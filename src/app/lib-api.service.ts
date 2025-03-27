import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { LIBRARIES } from './app.data';
import { ILibrariesListResponse } from './utils/libraries-response.interface';

@Injectable({
  providedIn: 'root'
})
export class LibApiService {

  data$!: Observable<ILibrariesListResponse>;
  
  getLibraryList(): Observable<ILibrariesListResponse> {
    if (this.data$) {
      return this.data$
    } else {
      this.data$ = of(LIBRARIES)
      return this.data$;
    }
  }
}
