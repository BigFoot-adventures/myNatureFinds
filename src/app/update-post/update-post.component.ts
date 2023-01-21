import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Blogpost } from '../models/blogpost';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css']
})
export class UpdatePostComponent implements OnInit {
  currentPost: Blogpost | undefined;
  imageValid=false;
  fg = new FormGroup({
    title: new FormControl(),
    image: new FormControl(),
    content: new FormControl()
  });

  constructor(private userSvc: UserService) {
    this.currentPost = this.userSvc.getEditPost();
  }
  ngOnInit(): void {
    if(this.currentPost){
      this.fg.get('title')?.setValue(this.currentPost.title);
      this.fg.get('image')?.setValue(this.currentPost.headerImage); 
      this.fg.get('content')?.setValue(this.currentPost.content);
      this.checkImage();
    }    
  }

  home(){
    this.userSvc.getFinds();   
  }

  checkImage() {
    this.imageValid = false;
    if(this.currentPost){ 
      try{
        if(new URL(this.fg.get('image')?.value)){
          this.imageValid = true;
        }
      }catch(err){
        console.log(`Error ${err}`);
      }
    }
  }

  updatePost(){
    if(this.currentPost){
      if(this.fg.valid){
        let title = this.fg.get('title')?.value;
        let image = this.fg.get('image')?.value;
        let content = this.fg.get('content')?.value;
        this.userSvc.updatePost(this.currentPost.postId, title, image, content).subscribe({
          next: (data) => {
            this.userSvc.getFinds();
            alert('Post Updated');
          },
          error: (err) => {
            alert('Oops! Something went wrong');
            console.log({err})
          }
        });
      }
    }
  }

}
