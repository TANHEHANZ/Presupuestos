import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { MeService } from '../services/components/me.service';

@Injectable({ providedIn: 'root' })
export class NavGuard implements CanActivate {
  constructor(private router: Router, private meService: MeService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.meService.isTokenExpired) {
      this.meService.clearSession();
      this.router.navigate(['/']);
      return false;
    }
    const currentPath = state.url;
    console.log(this.meService.permissions);

    if (this.meService.permissions.includes('ALL')) {
      return true;
    }

    const allPaths = this.meService.navigation.flatMap((group) =>
      group.items.map((item) => item.path)
    );
    if (allPaths.includes(currentPath)) {
      return true;
    }
    // const headers = new HttpHeaders({ 'X-token': token });

    this.router.navigate(['/notFound']);
    return false;
  }
}
