import { Pipe, PipeTransform } from '@angular/core';
import { URL_IMAGE } from '../../config/url.services';

@Pipe({
  name: 'image',
})
export class ImagePipe implements PipeTransform {

  transform(codigo: string) {

    return URL_IMAGE + codigo + '.jpg';
  }
}
