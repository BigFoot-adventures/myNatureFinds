import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate{

  constructor(private router: Router, private userSvc: UserService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(this.userSvc.currentUser){
      return true;
    }else{
      alert("Please sign in to reach this page");
      this.router.navigate(['/signin']);
      return false;
    }
  }
}
