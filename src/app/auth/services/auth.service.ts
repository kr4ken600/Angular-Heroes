import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IUsuario } from '../interfaces/usuario.interface';
import { Observable, tap, of, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private urlBase: string = environment.urlBase + '/usuarios';
  private _auth: IUsuario | undefined;

  get auth(): IUsuario {
    return { ...this._auth! };
  }

  constructor(private http: HttpClient) {}

  verificarAuth(): Observable<boolean>{
    if(!localStorage.getItem('token')){
      return of(false);
    }

    return this.http.get<IUsuario>(`${this.urlBase}/1`).pipe(
      map(res => {
        this._auth = res;
        return true;
      })
    )
  }

  login() {
    return this.http.get<IUsuario>(`${this.urlBase}/1`).pipe(
      tap((res) => (this._auth = res)),
      tap((res) => localStorage.setItem('token', res.id.toString()))
    );
  }

  logout() {
    this._auth = undefined;
    localStorage.removeItem('token')
  }
}
