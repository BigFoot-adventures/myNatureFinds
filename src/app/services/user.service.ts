import { Token } from '../models/token';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Blogpost } from '../models/blogpost';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  @Output() loggedIn = new EventEmitter<boolean>();
  postAry:Blogpost[]=[];
  userAry:User[]=[];
  userObj: User|undefined;
  editingPost: Blogpost | undefined;

  currentUser:Token|undefined;
  constructor(private client:HttpClient) {
    this.postAry=[];
    let tokenInstance = localStorage.getItem('token');
    this.currentUser = tokenInstance?JSON.parse(tokenInstance):null;
    //trying to test current current token before storing it's data
    //this.client.get(`${environment.serverEndpoint}/Users`, {headers:{Authorization:`Bearer ${this.currentUser?.token}`}}).subscribe((data) => {});
    if(this.currentUser){
      let decoded = jwt_decode(this.currentUser.token) as any;
      this.userObj = decoded.UserData;
    }
    console.log(this.userObj);
  }

  getFinds(){
    this.client.get(`${environment.serverEndpoint}/Posts`).subscribe((data) => {
      if(this.postAry.length > 0){
      this.postAry = [];
      }
      let newAry = data as Blogpost[];
      for (let post of newAry.reverse()) {
        this.postAry.push(post);
      }
    })
  }

  getUsers(){
    this.client.get(`${environment.serverEndpoint}/Users`, {headers:{Authorization: `Bearer ${this.currentUser?.token}`}}).subscribe((data) => {
      let ary = data as User[];      
      for(let user of ary){
        this.userAry.push(user);
      }
    })
    return this.userAry;
  }

  newPost(title: string, url:string, content: string){
    let np = {title:title, content:content, headerImage: url};    
    return this.client.post(`${environment.serverEndpoint}/Posts`, np, {headers:{Authorization:`Bearer ${this.currentUser?.token}`}});
  }

  updatePost(id: number, title: string, url:string, content: string){
    let np = {title:title, content:content, headerImage: url};
    return this.client.patch(`${environment.serverEndpoint}/Posts/${id}`, np, {headers:{Authorization:`Bearer ${this.currentUser?.token}`}});
  }

  deletePost(post: Blogpost){
    return this.client.delete(`${environment.serverEndpoint}/Posts/${post.postId}`, {headers:{Authorization:`Bearer ${this.currentUser?.token}`}});
  }

  setEditPost(post: Blogpost){
    this.editingPost= post;
  }

  getEditPost(){
    return this.editingPost;
  }

  setCurrentUser(token: Token){
    this.currentUser = token;
    localStorage.setItem('token', JSON.stringify(token));
    this.loggedIn.emit(true);
  }

  getCurrentUser(){//return token with userId
    return this.currentUser;
  }

  getUserObj(){
    return this.userObj;
  }

  setUserObj(){
    let tokenInstance = localStorage.getItem('token');
    this.currentUser = tokenInstance?JSON.parse(tokenInstance):null;
    if(this.currentUser){
      let decoded = jwt_decode(this.currentUser.token) as any;
      this.userObj = decoded.UserData;
    }
  }

  clearUserObj(){
    this.userObj = undefined;
    return this.userObj;
  }

  Login(username:string, password:string){
    return this.client.get<Token>(`${environment.serverEndpoint}/Users/${username}/${password}`);
  }
  
  Logout(){
    this.currentUser = undefined;
    localStorage.removeItem('token');
    this.loggedIn.emit(false);
  }

  createUser(Id:string, first:string, last:string, email:string, pwd:string){
    let newUser = {userId:Id, firstName:first, lastName:last, emailAddress:email, password:pwd};
    return this.client.post<User>(`${environment.serverEndpoint}/Users`, newUser);
  }
}
