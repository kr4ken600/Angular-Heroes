import { Component, OnInit } from '@angular/core';
import { HeroresService } from '../../services/herores.service';
import { IHeroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: [],
})
export class ListadoComponent implements OnInit {
  heroes: IHeroe[] = [];

  constructor(private heroeSvc: HeroresService) {}
  ngOnInit(): void {
    this.listarHeroes();
  }

  listarHeroes() {
    this.heroeSvc.listar().subscribe({
      next: (heroes: IHeroe[]) => {
        this.heroes = heroes;
      },
    });
  }
}
