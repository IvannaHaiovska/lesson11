import { Component, OnInit } from '@angular/core';

import { IBlog } from '../shared/interfaces/blog.interface';
import { IUser } from '../shared/interfaces/user.interface';
import { BlogService } from '../shared/services/blog/blog.service';
import { UserService } from '../shared/services/user/user.service';

@Component({
  selector: 'app-angular-blog',
  templateUrl: './angular-blog.component.html',
  styleUrls: ['./angular-blog.component.scss']
})
export class AngularBlogComponent implements OnInit {
  public newUser = {
    name: '',
    surname: '',
    login: '',
    password: '',
    rePassword: '',
    email: '',
    sex: ''
  };
  public titlePost!: string;
  public text!: string;
  public isOpenSignIn = true;
  public isOpenSignUp = false;
  public editPostBtn = false;
  public confirm = false;
  public visible = false;
  public invalid = false;
  public uniqueUser = false;
  public uniqueU = false;
  public logUser = false;
  public logUnknownUser = false;
  public ifUserIs = false;
  public id = 0;
  public LogUser!: string;
  public username!: string;
  public blogInfo: Array<IBlog> = [];
  public user: Array<IUser> = [];
  public male = 'male';
  public female = 'female';
  public datePost !: Date;
  public userIndex!: number;
  public nameExp = /^[a-zA-Z]{2,20}$/;
  public passwordExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])[a-zA-Z0-9]{6,15}$/;
  public emailExp = /^([a-zA-Z0-9_\.\-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
  public newPost = {};

  constructor(
    private blogService: BlogService,
    private userService: UserService
  ) { }
  ngOnInit(): void {
    this.getBlog();
    this.getUser();
  }
  getBlog(): void {
    this.blogInfo = this.blogService.getBlog();

  }
  getUser(): void {
    this.user = this.userService.getUser();
  }

  LogOut(): void {
    this.visible = false;
    this.isOpenSignIn = true;
    this.uniqueU = false;
    this.ifUserIs = false;
  }
  addSex(item: string): void {
    if (item == 'female') {
      this.newUser.sex = 'female';
    }
    else if (item == 'male') {
      this.newUser.sex = 'male';
    }
  }
  submitUp(): void {
    if (this.nameExp.test(this.newUser.name) && this.nameExp.test(this.newUser.surname) && this.nameExp.test(this.newUser.login) && (this.passwordExp.test(this.newUser.password)) && (this.passwordExp.test(this.newUser.rePassword)) && this.emailExp.test(this.newUser.email)) {
      if (this.newUser.password === this.newUser.rePassword) {
        this.confirm = false;
        const newUser = {
          id: 1,
          name: this.newUser.name,
          surname: this.newUser.surname,
          login: this.newUser.login,
          password: this.newUser.password,
          email: this.newUser.email,
          sex: this.newUser.sex || 'male'
        }
        this.invalid = false;
        if (this.user) {
          const id = this.user.slice(-1)[0].id;
          newUser.id = id + 1;
        }
        this.user.forEach(obj => {
          if ((obj.login === this.newUser.login) && (obj.email === this.newUser.email)) {
            this.uniqueUser = true;
          }
          else {
            this.uniqueUser = false;
            this.logUser = false;
          }
        });

        if ((this.uniqueUser === false)) {
          this.userService.addUser(newUser);
          this.isOpenSignUp = false;
          this.isOpenSignIn = true;
          this.logUser = false;
        }
        else {
          this.logUser = true;
        }
        this.resetForm();
        this.confirm = false;
      }
      else {
        this.confirm = true;
      }
    }
    else {
      this.invalid = true;
    }
  }

  submitIn(): void {
    this.user.forEach(obj => {
      if ((obj.login === this.newUser.login) && (obj.password === this.newUser.password)) {
        this.uniqueU = true;
        this.ifUserIs = true
        this.LogUser = obj.name;
        this.username = obj.name
      }
      else if (obj.login === this.newUser.login) {
        this.ifUserIs = true;
      }
    });
    if (this.ifUserIs === true) {
      if (this.uniqueU === true) {
        this.logUnknownUser = false;
        this.isOpenSignIn = false;
        this.visible = true;
      }
      else {
        this.logUnknownUser = true;
      }
    }
    else {
      this.isOpenSignUp = true;
      this.isOpenSignIn = false;
    }
    this.resetForm();
  }

  post(): void {
    const newPost = {
      id: this.id,
      postedBy: this.username,
      topic: this.titlePost,
      date: new Date(),
      message: this.text
    }

    if (this.blogInfo) {
      newPost.id = this.id + 1;
      this.id = newPost.id;
    }
    this.datePost = newPost.date;
    this.blogService.addPost(newPost, this.blogInfo);
    this.getBlog();
    this.resetForm();
  }

  edit(post: IBlog): void {
    this.titlePost = post.topic;
    this.text = post.message;
    this.id = post.id;
    this.username = post.postedBy;
    this.datePost = post.date;
    this.editPostBtn = true;
    this.userIndex = this.blogInfo.indexOf(post);
  }

  saveEditPost(): void {
    const newPost = {
      id: this.id,
      postedBy: this.username,
      topic: this.titlePost,
      date: this.datePost,
      message: this.text,
    }
    this.blogInfo[this.userIndex] = newPost;
    this.blogService.UpdateBlog(this.blogInfo);
    this.resetForm();
    this.editPostBtn = false;
  }

  deletePost(post: any): void {
    let i = this.blogInfo.indexOf(post);
    this.blogInfo.splice(i, 1);
    this.blogService.UpdateBlog(this.blogInfo);
  }
  ClearAll() {
    if (confirm("Are you sure to delete all posts?")) {
      this.blogService.Clear();
      this.getBlog();
    }
  }

  resetForm(): void {
    this.newUser.login = '';
    this.newUser.password = '';
    this.newUser.email = '';
    this.newUser.name = '';
    this.newUser.rePassword = '';
    this.newUser.surname = '';
    this.text = '';
    this.titlePost = '';
  }
}
