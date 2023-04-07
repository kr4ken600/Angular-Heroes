import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { HeroresService } from '../../services/herores.service';
import { IHeroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
    `
      img{
        width: 100%;
        border-radius: 5px;
      }

      .cont-left{
        margin-right: 10px
      }
    `
  ],
})
export class HeroeComponent implements OnInit {
  heroe!: IHeroe;

  constructor(
    private activatedR: ActivatedRoute,
    private heroesSvc: HeroresService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedR.params
      .pipe(switchMap(({ id }) => this.heroesSvc.getHId(id)))
      .subscribe({
        next: (res: IHeroe) => {
          this.heroe = res;
        },
      });
  }

  regresar(){
    this.router.navigate(['/heroes'])
  }
}
