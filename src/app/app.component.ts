import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LibApiService } from './lib-api.service';
import { Subject, Observable, takeUntil, map, BehaviorSubject } from 'rxjs';
import { AsyncPipe,  NgClass } from '@angular/common';
import { ILibrary } from './utils/libraries-response.interface';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { HighlightPipe } from './utils/highlight.pipe';
import { mapLibListResponseToLibList } from './utils/map-lib-list-response-to-lib-list.function';
import { filterLibListByFullName } from './utils/filter-lib-list-by-full-name.function';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    AsyncPipe,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    NgClass,
    HighlightPipe
  ],
  providers: [LibApiService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  host: { class: 'app' },
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  librariesList$!: Observable<ILibrary[]>;
  readonly destroyed$ = new Subject<void>();
  libInput!: string;
  keyword$$ = new BehaviorSubject<string>('');

  constructor(
    private _api: LibApiService,
  ) { }

  displayList(): void {
    if (!this.libInput?.length) {return};
    this.keyword$$.next(this.libInput);

    this.librariesList$ = this._api.getLibraryList()
      .pipe(
        map(mapLibListResponseToLibList),
        map(libs => filterLibListByFullName(libs, this.keyword$$.value)),
        takeUntil(this.destroyed$));
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
