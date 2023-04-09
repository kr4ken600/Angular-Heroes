import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.verificarAuth().pipe(
      tap((status) => {
        if (!status) {
          this.router.navigate(['./auth']);
        }
      })
    );
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.verificarAuth().pipe(
      tap((status) => {
        if (!status) {
          this.router.navigate(['./auth']);
        }
      })
    );
  }
}
