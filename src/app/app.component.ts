import { Component, Inject, OnInit, PLATFORM_ID, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LibApiService } from './lib-api.service';
import { Subject, Observable, tap, takeUntil, map } from 'rxjs';
import { AsyncPipe, isPlatformServer, JsonPipe } from '@angular/common';
import { ILibrary } from './utils/libraries-response.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, JsonPipe],
  providers: [LibApiService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'lirary2';
  data$!: Observable<ILibrary[] | undefined>;
  readonly destroyed$ = new Subject<void>();

  constructor(
    private _api: LibApiService,
    @Inject(PLATFORM_ID) private readonly _platformId: object
  ) {
    
  }

  ngOnInit(): void {
    this.data$ = this._api.getLibraryList().pipe(
      map(res => res.response),
      takeUntil(this.destroyed$)
    );
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
