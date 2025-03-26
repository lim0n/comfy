import { Component, Inject, OnInit, PLATFORM_ID, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LibApiService } from './lib-api.service';
import { Subject, Observable, tap, takeUntil, map } from 'rxjs';
import { AsyncPipe, isPlatformServer, JsonPipe, NgClass } from '@angular/common';
import { ILibrary } from './utils/libraries-response.interface';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    AsyncPipe,
    JsonPipe,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NgClass
  ],
  providers: [LibApiService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  host: { class: 'app' },
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'lirary2';
  data$!: Observable<ILibrary[] | undefined>;
  readonly destroyed$ = new Subject<void>();
  libInput!: string;

  constructor(
    private _api: LibApiService,
    @Inject(PLATFORM_ID) private readonly _platformId: object
  ) {
    
  }

  ngOnInit(): void {
    // this.data$ = this._api.getLibraryList().pipe(
    //   map(res => res.response),
    //   takeUntil(this.destroyed$)
    // );
  }

  displayList(): void {
    console.warn('FIRE');

    // this.data$ = this._api.getLibraryList().pipe(
    //   tap(val=>{
    //     console.warn('DATA%$')
    //   }),
    //   map(res => res.response),
    //   takeUntil(this.destroyed$)
    // );

    this.data$ = this._api.getLibraryList().pipe(
      map(res => {
        const result: ILibrary[] = [];
        res.response?.forEach(lib=>{
          const { FullName, ObjectAddress } = lib;
          const library = {
            FullName,
            ObjectAddress: ObjectAddress?.map(item=>({Address: item.Address}))
          };
          result.push(library);
        });
        return result;
      }),
      tap(val=>{
        console.warn('#%@@@#@#@#',val);
      }),
      takeUntil(this.destroyed$)
    );
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
