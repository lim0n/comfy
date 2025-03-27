import { Component, inject } from '@angular/core';
import { ILibrary } from '../../utils/libraries-response.interface';
import { JsonPipe } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent
} from '@angular/material/dialog';

@Component({
  selector: 'app-library-card',
  standalone: true,
  imports: [
    JsonPipe,
    MatDialogTitle,
    MatDialogContent
  ],
  templateUrl: './library-card.component.html',
  styleUrl: './library-card.component.scss'
})
export class LibraryCardComponent {
  readonly data = inject<ILibrary>(MAT_DIALOG_DATA);
}
