import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { IUsuario } from '../../interfaces/usuario.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent {
  usuario!: IUsuario;

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.auth.login().subscribe({
      next: (res: IUsuario) => (this.usuario = res),
      complete: () => {
        if (this.usuario.id) {
          this.router.navigate(['./heroes']);
        }
      },
    });
  }
}
