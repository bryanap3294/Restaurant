import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estado'
})

export class EstadoPipe implements PipeTransform {
  transform(value: any){
    switch(value) {
      case 1: {
        return 'Ordenado';
      // break;
   }
      case 2: {
      return 'En proceso';
      // break;
   }
      default: {
      return 'Terminado';
      // break; 
   }
}
  }
}
