import { Token } from '../models/token';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private userSvcInstance:UserService) { 
    this.userObj = this.userSvcInstance.getUserObj();
  }
  currentUser: Token|undefined;
  userObj: User|undefined;
  ngOnInit(): void {
    this.userSvcInstance.loggedIn.subscribe((data)=>{
      if(data){
        this.userObj = this.userSvcInstance.getUserObj();
        this.currentUser = this.userSvcInstance.getCurrentUser();
      }else{
        this.currentUser = undefined;
      }
    });
    if(localStorage.getItem('token')){
      let tok = localStorage.getItem('token')
      this.currentUser = tok?JSON.parse(tok):null;
    }
    
    document.addEventListener('DOMContentLoaded', () => {
      const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
      $navbarBurgers.forEach( el => {
        const target = el.dataset.target;
        const $target = document.getElementById(target);
        // below is to close nav dropdown when link clicked, does not work on canActivate routes, why?
        // issue fixed after adding localStorage above
        // correction: always works on Home button (/finds), but
        // for some reason the issue starts when loggedIn status changes
        el.addEventListener('click', () => {
          el.classList.toggle('is-active');
          $target?.classList.toggle('is-active');
        });
        const navItems = Array.prototype.slice.call(document.getElementsByClassName('navbar-item'));
        // dont know exactly what navItems is an array of
        navItems.forEach(item => {
          item.addEventListener('click', () => {
            el.classList.toggle('is-active');
            $target?.classList.toggle('is-active');
          });
        });
      });
    });
  }

  Logout(){
    this.userSvcInstance.loggedIn.emit(false);
    this.userObj = this.userSvcInstance.clearUserObj();
    this.userSvcInstance.Logout();
  }

}

