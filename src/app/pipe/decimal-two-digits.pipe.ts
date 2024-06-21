import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decimalTwoDigits'
})
export class DecimalTwoDigitsPipe implements PipeTransform {

  transform(value: number): string {
    if (!value) {
      return '';
    }

    let strValue = value.toString();

    if (strValue.includes('.')) {
      const parts = strValue.split('.');
      if (parts[1].length === 2) {
        return strValue;
      }
    }
    const fixedValue = value.toFixed(2);

    return fixedValue;
  }
}
