import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  fg = new FormGroup({
    title: new FormControl(),
    image: new FormControl(),
    content: new FormControl()
  });

  constructor(private userSvc: UserService, private router:Router) { }

  ngOnInit(): void {
  }
  createPost() {
    if(this.fg.valid){
      let title = this.fg.get('title')?.value;
      let image = this.fg.get('image')?.value;
      let content = this.fg.get('content')?.value;
      this.userSvc.newPost(title, image, content).subscribe({
        next: (data) => {
          alert('Post Created');
          this.userSvc.getFinds();
        },
        error: (err) => {
          alert(`Error: ${JSON.stringify(err)}`)
        }
      });
    }
  }
}
