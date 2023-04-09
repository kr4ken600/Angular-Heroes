import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IUsuario } from 'src/app/auth/interfaces/usuario.interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent {
  
  get user(){
    return this.auth.auth;
  }

  constructor(private auth: AuthService, private router:Router){}


  logout(){
    this.auth.logout();
    this.router.navigate(['./auth']);
  }
}
