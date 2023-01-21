import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userSvcInstance:UserService, private router:Router, private activatedRoute:ActivatedRoute) { }
  username="";
  password="";

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params)=>{
      this.username=params['username'];
    });
  }

  Login(){
    this.userSvcInstance.Login(this.username, this.password).subscribe({
      next: (data)=>{
        localStorage.setItem('token', JSON.stringify(data));
        this.userSvcInstance.setCurrentUser(data);
        this.userSvcInstance.setUserObj();
        this.userSvcInstance.loggedIn.emit(true);
        this.router.navigate(['/']);
      },
      error: (err) => {
        alert(`Error: ${JSON.stringify(err)}`);
      },
      complete: () => {
        //alert('User logged in');
        //what is typical for this?
      }      
    });
  }
}
