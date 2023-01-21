import { Token } from '../models/token';
import { Component, OnInit } from '@angular/core';
import { Blogpost } from '../models/blogpost';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-finds-page',
  templateUrl: './finds-page.component.html',
  styleUrls: ['./finds-page.component.css']
})
export class FindsPageComponent implements OnInit {
  postArray: Blogpost[];
  currentUser: Token|undefined;

  constructor(private userInstance:UserService) {
    this.postArray = [];
    this.currentUser = this.userInstance.getCurrentUser();
  }

  ngOnInit(): void {
    this.userInstance.getFinds();
    this.postArray = this.userInstance.postAry;
  }
}
