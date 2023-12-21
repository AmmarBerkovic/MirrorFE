import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'booleanToIcon',
})
export class BooleanToIconPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: boolean): SafeHtml {
    return value
      ? this.sanitizer.bypassSecurityTrustHtml(
          '<i class="fa-solid fa-check fa-2x text-success"></i>'
        )
      : this.sanitizer.bypassSecurityTrustHtml(
          '<i class="fa-solid fa-xmark fa-2x text-danger"></i>'
        );
  }
}
