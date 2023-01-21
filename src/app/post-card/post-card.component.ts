import { Component, Input, OnInit } from '@angular/core';
import { Blogpost } from '../models/blogpost';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent implements OnInit {
  userObj: User|undefined;
  @Input() currentPost:Blogpost|undefined;
  footer = false;
  updated = false;
  createdDate: any;
  lastUpdated: any;
  image = false;

  constructor(private userInstance: UserService) {
    this.userObj = userInstance.getUserObj();
  }

  ngOnInit(): void {
    if(this.currentPost?.userId == this.userObj?.userId){
      this.footer = true;
    }
    if(this.currentPost?.createdDate != this.currentPost?.lastUpdated){
      this.updated = true;
    }
    if(this.currentPost?.createdDate && this.currentPost?.lastUpdated){
      let createMsc = Date.parse(this.currentPost.createdDate);
      let updateMsc = Date.parse(this.currentPost.lastUpdated);
      this.createdDate = new Date(createMsc).toLocaleDateString();
      this.lastUpdated = new Date(updateMsc).toLocaleDateString();      
    }
    if(this.currentPost?.headerImage){
      try{
        if(new URL(this.currentPost.headerImage)){
          this.image = true;
        }
      }catch(err){
        console.log(`Error ${JSON.stringify(err)}`);
      }
    }
  }

  setEditPost(){
    if(this.currentPost){
      this.userInstance.setEditPost(this.currentPost)
    }
  }

  deletePost(){
    if(this.currentPost){
      if(confirm("Delete this post forever?")){
        this.userInstance.deletePost(this.currentPost).subscribe((data)=>{
          this.userInstance.getFinds();
          console.log('Post Deleted');
        });
        //ask prof how to refresh (ngOnInit) app-components from other components
        //I want to refresh parent element from here
        //and navbar element from login page and logout button
        //did by making delete an a with href, but would like to know how to call the ngOnInit still
      }
    }
  }
  
}
