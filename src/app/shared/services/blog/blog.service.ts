import { Injectable } from '@angular/core';
import { IBlog } from 'src/app/shared/interfaces/blog.interface';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor() { }

  getBlog(): Array<IBlog> {
    return JSON.parse(localStorage.getItem('blogs') || "[]");
  }
  addPost(post: IBlog, blogs: any): void {
    blogs.push(post);
    localStorage.setItem("blogs", JSON.stringify(blogs));
  }
  UpdateBlog(blogs: Array<IBlog>): void {
    localStorage.setItem('blogs', JSON.stringify(blogs));
  }
  Clear(): void {
    localStorage.clear();
  }
}
