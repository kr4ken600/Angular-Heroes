import { Component, OnInit } from '@angular/core';
import { IHeroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroresService } from '../../services/herores.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarDialogComponent } from '../../components/confirmar-dialog/confirmar-dialog.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [],
})
export class AgregarComponent implements OnInit {
  credores = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics',
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics',
    },
  ];

  heroe: IHeroe = {
    superhero: '',
    publisher: Publisher.DCComics,
    alter_ego: '',
    first_appearance: '',
    characters: '',
    alt_img: '',
  };

  title: string = 'Nuevo Heroe';

  constructor(
    private heroesSvc: HeroresService,
    private activatedR: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (!this.router.url.includes('editar')) {
      return;
    }

    this.title = 'Editar Heroe';

    this.activatedR.params
      .pipe(switchMap(({ id }) => this.heroesSvc.getHId(id)))
      .subscribe({
        next: (heroe) => {
          this.heroe = heroe;
        },
      });
  }

  guardar() {
    if (this.heroe.superhero.trim().length === 0) {
      return;
    }

    if (this.heroe.id) {
      this.heroesSvc.editarHeroe(this.heroe).subscribe({
        next: (res) => console.log(res),
        complete: () => {
          this.snackBar.open('Hereo editado correctamente', 'ok', {
            duration: 2000,
          });
        },
      });
    } else {
      this.heroesSvc.gurdarHeroe(this.heroe).subscribe({
        next: (heroe) => {
          this.snackBar.open('Hereo creado correctamente', 'ok', {
            duration: 2000,
          });
          setTimeout(() => {
            this.router.navigate(['/heroes/editar', heroe.id]);
          }, 3000);
        },
      });
    }
  }

  eliminar() {
    const resutl = this.dialog.open(ConfirmarDialogComponent, {
      width: '250px',
      data: {heroe: this.heroe.superhero}
    });

    resutl.afterClosed().subscribe({
      next: (res) => {
        if (!res) return;
        this.heroesSvc.eliminarHeroe(this.heroe.id!).subscribe({
          complete: () => {
            this.snackBar.open('Hereo eliminado', 'ok', {
              duration: 2000,
            });
            setTimeout(() => {
              this.router.navigate(['/heroes']);
            }, 2001);
          },
        });
      },
    });
  }
}
