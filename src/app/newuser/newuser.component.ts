import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.css']
})
export class NewuserComponent implements OnInit {

  fg= new FormGroup({
    username: new FormControl(),
    firstName: new FormControl(),
    lastName: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    confirmPwd: new FormControl()
  });

  constructor(private userSvc:UserService, private router:Router) { }

  ngOnInit(): void {
  }

  createUser(){
    this.fg.markAllAsTouched();//watch for this in lecture... 19?
    if(this.fg.valid){
      let userId = this.fg.get('username')?.value;
      let first = this.fg.get('firstName')?.value;
      let last = this.fg.get('lastName')?.value;
      let email = this.fg.get('email')?.value;
      let pwd = this.fg.get('password')?.value;
      let confirm = this.fg.get('confirmPwd')?.value;
      if(confirm == pwd){
        if(userId && first && last && email && pwd){
          this.userSvc.createUser(userId, first, last, email, pwd).subscribe({
            next: (data) => {
              alert(`${data.userId} successfully created`);
              this.router.navigate(['/signin'])
            },
            error: (err) => {
              alert(`Error: ${JSON.stringify(err)}`)
            }
          });
        }
      }else{
        alert('Passwords must match.');
      }
    }else{
      alert('All fields are required')
    }
  }

}
