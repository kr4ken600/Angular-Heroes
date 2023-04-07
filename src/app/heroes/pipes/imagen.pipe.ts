import { Pipe, PipeTransform } from '@angular/core';
import { IHeroe } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imagen',
})
export class ImagenPipe implements PipeTransform {
  transform(heroe: IHeroe): string {
    if(heroe.alt_img?.length === 0){
      return 'assets/no-image.png';
    }
    
    return `assets/heroes/${heroe.id}.jpg`;
  }
}
