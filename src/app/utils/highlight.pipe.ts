import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight',
  standalone: true
})
export class HighlightPipe implements PipeTransform {
  
  /** Пайп для подсветки ключевого слова */
  transform([value, substring] : [string, string | null]): string {
    if (!substring) { return value };
    const regExpRule = new RegExp(substring, 'i');
    return value.replace(regExpRule, '<b>$&</b>');
  }

}
