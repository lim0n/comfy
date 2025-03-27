import { Pipe, PipeTransform } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'highlight',
  standalone: true
})
export class HighlightPipe implements PipeTransform {

  transform([value, substring] : [string, string | null]): string {
    // console.warn('FIRE HighlightPipe');
    // console.warn(value);
    // console.warn(substring);
    if (!substring) { return value };
    const regExpRule = new RegExp(substring, 'i');
    return value.replace(regExpRule, '<b>$&</b>');
  }

}
