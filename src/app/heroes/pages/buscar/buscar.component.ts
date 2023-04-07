import { Component } from '@angular/core';
import { IHeroe } from '../../interfaces/heroes.interface';
import { HeroresService } from '../../services/herores.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [],
})
export class BuscarComponent {
  termino: string = '';

  heroes: IHeroe[] = [];
  heroeSelect!: IHeroe;

  constructor(private heroesSvc: HeroresService) {}

  buscando() {
    if (this.termino.trim().length < 1) return;
    this.heroesSvc.sugerencias(this.termino).subscribe({
      next: (heroes) => (this.heroes = heroes),
    });
  }

  opcionSeleccionada(event: MatAutocompleteSelectedEvent) {
    if (!event.option.value) {
      return;
    }

    const heroe: IHeroe = event.option.value;
    this.termino = heroe.superhero;
    this.heroesSvc.getHId(heroe.id!).subscribe({
      next: (heroe) => (this.heroeSelect = heroe),
    });
  }
}
