import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeParsing',
})
export class TimeParsingPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    const date = new Date(value);
    const currentDate = new Date();
    //....
    const timeDiff = Math.floor(
      (currentDate.getTime() - date.getTime()) / (1000 * 3600 * 24)
    );
    const dayDif = currentDate.getDate() - date.getDate();
    //...
    if (!timeDiff && !dayDif) {
      return (
        date.getHours() +
        ':' +
        (date.getMinutes() / 10 >= 1
          ? date.getMinutes()
          : '0' + date.getMinutes())
      );
    }
    //...
    const month = date.toLocaleString('default', { month: 'long' });
    return date.getDate() + ' ' + month.toLowerCase().slice(0, 3) + '.';
  }
}
