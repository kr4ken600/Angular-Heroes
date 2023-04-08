import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IHeroe } from '../interfaces/heroes.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HeroresService {
  private urlBase: string = environment.urlBase + '/heroes';

  constructor(private http: HttpClient) {}

  listar(): Observable<IHeroe[]> {
    return this.http.get<IHeroe[]>(this.urlBase);
  }

  getHId(id: string): Observable<IHeroe> {
    return this.http.get<IHeroe>(`${this.urlBase}/${id}`);
  }

  sugerencias(termino: string): Observable<IHeroe[]> {
    const params = new HttpParams().set('q', termino).set('_limit', 5);

    return this.http.get<IHeroe[]>(this.urlBase, { params });
  }

  gurdarHeroe(heroe: IHeroe): Observable<IHeroe>{
    return this.http.post<IHeroe>(this.urlBase, heroe);
  }

  editarHeroe(heroe: IHeroe): Observable<IHeroe>{
    return this.http.put<IHeroe>(`${this.urlBase}/${heroe.id}`, heroe);
  }

  eliminarHeroe(id: string): Observable<IHeroe>{
    return this.http.delete<IHeroe>(`${this.urlBase}/${id}`);
  }
}
