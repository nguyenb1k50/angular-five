import { DataService } from './../services/data.service';
import { BadInput } from 'src/app/common/bad-input';
import { AppError } from 'src/app/common/app-error';
import { Component, OnInit } from "@angular/core";
import { PostService } from "src/app/services/post.service";
import { NotFoundError } from 'src/app/common/not-found-error';

@Component({
  selector: "posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.scss"]
})
export class PostsComponent implements OnInit {
  posts: any[];
  constructor(
    private DataService: DataService
    ) {}
  ngOnInit() {
    this.DataService.getPost().subscribe(
      response => {
      this.posts = response.json();
    }, 
    error =>{
      alert('An unexpected error')
    });
  }
  createPost(input: HTMLInputElement) {
    let post = { title: input.value };
    this.DataService.createPost(post).subscribe(
      response => {
      post["id"] = response.json().id;
      this.posts.splice(0, 0, post);
     },
    (error: AppError) => {
      if(error instanceof BadInput) {
 //       this.form.setErrors(error.originalError);
      } 
      else {
        alert('An unexpected error');
        console.log(error);
      }
    });
 }
  updatePost(post) {
    // console.log(post);
    this.DataService.updatePost(post).subscribe(response => {
      console.log(response.json());
    });
  }
  deletePost(post) {
    // console.log(post);
    // this.http.delete(this.url + '/' + post.id)
    this.DataService.deletePost(5555).subscribe(
      response => {
        let index = this.posts.indexOf(post);
        this.posts.splice(index, 1);
      },
      (error: AppError) => {
        if (error instanceof NotFoundError) {
          alert("this post has been deleted");
        } else {
          alert("this unexpected error occurred");
        }
      }
    );
}
}
