import { Component, OnInit } from '@angular/core';
import { IBlog } from './shared/interfaces/blog.interface';
import { IUser } from './shared/interfaces/user.interface';
import { BlogService } from './shared/services/blog/blog.service';
import { UserService } from './shared/services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'lesson6';

  public userName!: string;
  public email!: string;
  public password!: string;
  public titlePost!: string;
  public text!: string;
  public isOpenPost = false;
  public isOpenSignIn = false;
  public isOpenSignUp = false;
  public editPostBtn = false;
  public grayBlock = false;
  public visible = false;
  public username!: string;
  public blogInfo: IBlog[] = [];
  public user: Array<IUser> = [];
  public uniqueUser = false;
  public uniqueU = false;
  public logUser = false;
  public logUnknownUser = false;
  public datePost !: Date;
  public emailUser!: string;
  public userIndex!: number;
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
  signIn(): void {
    this.isOpenSignIn = true;
    this.grayBlock = true;
  }
  close(): void {
    this.isOpenSignIn = false;
    this.isOpenSignUp = false;
    this.grayBlock = false;
    this.logUser = false;
    this.isOpenPost = false;
    this.resetForm();
  }

  signUp(): void {
    this.isOpenSignUp = true;
    this.grayBlock = true;
  }

  signOut(): void {
    this.visible = false;

  }

  submitUp(): void {
    const newUser = {
      id: 1,
      username: this.userName,
      email: this.email,
      password: this.password
    }
    if (this.user) {
      const id = this.user.slice(-1)[0].id;
      newUser.id = id + 1;
    }
    this.user.forEach(obj => {
      if ((obj.username === this.userName) && (obj.email === this.email)) {
        this.uniqueUser = true;
      }
      else {
        this.uniqueUser = false;
        this.logUser = false;
      }
    });

    if ((this.uniqueUser === false)) {
      this.userService.addUser(newUser);
      this.username = newUser.username;
      this.isOpenSignUp = false;
      this.grayBlock = false;
      this.visible = true;
      this.logUser = false;
    }
    else {
      this.logUser = true;
    }
    this.resetForm();
  }

  submitIn(): void {
    this.user.forEach(obj => {
      if ((obj.email === this.email) && (obj.password === this.password)) {
        this.username = obj.username;
        this.uniqueU = true;
      }
    });
    if (this.uniqueU === true) {
      this.isOpenSignIn = false;
      this.grayBlock = false;
      this.visible = true;
      this.logUnknownUser = false;
    }
    else {
      this.logUnknownUser = true;
    }
    this.resetForm();
  }
  addPost(): void {
    this.isOpenPost = true;
    this.grayBlock = true;

  }
  post(): void {
    const newPost = {
      id: 1,
      postedBy: this.username,
      topic: this.titlePost,
      date: new Date(),
      message: this.text
    }
    if (this.blogInfo) {
      const id = this.blogInfo.slice(-1)[0].id;
      newPost.id = id + 1;
    }
    this.datePost = newPost.date;
    this.blogService.addPost(newPost);
    this.isOpenPost = false;
    this.grayBlock = false;
    this.resetForm();
  }

  edit(index: number): void {
    if ((this.username === this.blogInfo[index].postedBy) || (this.username === 'admin')) {
      this.titlePost = this.blogInfo[index].topic;
      this.text = this.blogInfo[index].message;
      this.userIndex = index;
      this.isOpenPost = true;
      this.grayBlock = true;
      this.editPostBtn = true;
    }
  }
  saveEditPost(): void {
    const newPost = {
      id: this.userIndex,
      postedBy: this.username,
      topic: this.titlePost,
      date: this.datePost,
      message: this.text,
    }

    this.blogInfo[this.userIndex] = newPost;
    this.resetForm();
    this.isOpenPost = false;
    this.grayBlock = false;
    this.editPostBtn = false;
  }

  delete(index: number): void {
    if ((this.username === this.blogInfo[index].postedBy) || (this.username === 'admin')) {
      this.blogInfo.splice(index, 1);
    }
  }

  resetForm(): void {
    this.email = '';
    this.password = '';
    this.userName = '';
    this.text = '';
    this.titlePost = '';
  }
}
