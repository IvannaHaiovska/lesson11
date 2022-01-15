import { Injectable } from '@angular/core';
import { IBlog } from 'src/app/shared/interfaces/blog.interface';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  public blogs: Array<IBlog> = [
    {
      id:1,
      postedBy: 'admin',
      topic:'First post',
      date: new Date (2020, 4, 22, 10, 0, 0),
      message:'Sign up to create your account and start to use Angular Blog'
    }
  ]
  constructor() { }
  getBlog():Array<IBlog>{
    return this.blogs;
  }
  addPost(post:IBlog):void{
    this.blogs.push(post);
    }
}
