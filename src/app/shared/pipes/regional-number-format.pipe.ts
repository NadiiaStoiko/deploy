import { Pipe, PipeTransform, LOCALE_ID, Inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Pipe({
  name: 'regionalNumberFormat'
})
export class RegionalNumberFormatPipe implements PipeTransform {

    constructor(@Inject(LOCALE_ID) private locale: string, private decimalPipe: DecimalPipe) {}

    transform(value: number | null | undefined): string | null {
        if (value === null || value === undefined) {
            return null;
        }

        const formattedValue = this.decimalPipe.transform(value, '1.2-2', this.locale);
        if (formattedValue === null) {
            return null;
        }

        return formattedValue.replace(',', 'temp').replace('.', ',').replace('temp', '.');
    }
}
