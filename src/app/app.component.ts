import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
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
import { MatDialog } from '@angular/material/dialog';
import { LibraryCardComponent } from './components/library-card/library-card.component';

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
  /** Список бблиотек */
  readonly destroyed$ = new Subject<void>();
  /** Ключевое слово для фильтрации и хайлайта искомого слова в названии */
  readonly keyword$$ = new BehaviorSubject<string>('');
  readonly dialog = inject(MatDialog);
  
  /** Список библиотек */
  librariesList$!: Observable<ILibrary[]>;
  libInput!: string;

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

  /** Отображение карточки библиотеки в модальном окне */
  openDialog(library: ILibrary): void {
    this.dialog.open(LibraryCardComponent, {
      data: library
    })
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
