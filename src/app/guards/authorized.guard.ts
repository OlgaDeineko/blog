import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';

@Injectable()
export class AuthorizedGuard implements CanActivate {
  constructor(private $Router: Router) {
  }

  canActivate() {
    if (localStorage.getItem('currentUser')) {
      return true;
    }

    this.$Router.navigate(['/login']);
    return false;
  }
}


