import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'messageBodyParser',
})
export class MessageBodyParserPipe implements PipeTransform {
  transform(value: string, title?: string, count?: number): unknown {
    if (!value) {
      return;
    }
    if (!title) {
      value = value.replaceAll('\n', '<br>');
      return value;
    } else {
      count = count ? count : 70;
      let result = title + ' - ' + value;
      return result.length > count ? result.slice(0, count) + '...' : result;
    }
  }
}
