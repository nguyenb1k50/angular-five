import { PostService } from "./../services/post.service";
import { Component, OnInit } from "@angular/core";
import { AppError } from "src/app/common/app-error";
import { NotFoundError } from "src/app/common/not-found-error";
import { BadInput } from "src/app/common/bad-input";

@Component({
  selector: "posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.css"]
})
export class PostsComponent implements OnInit {
  posts: any[];

  constructor(private service: PostService) {}

  ngOnInit() {
    this.service.getAll().subscribe(posts => {this.posts = posts; console.log(this.posts)
    });
  }

  createPost(input: HTMLInputElement) {
    let post = { title: input.value };
    input.value = "";

    this.service.create(post).subscribe(
      newPost => {
        console.log(newPost);
        post["id"] = newPost.id;
        console.log(post);
        this.posts.splice(0, 0, post);
        console.log(this.posts);
      },
      (error: AppError) => {
        if (error instanceof BadInput) {
          // this.form.setErrors(error.originalError);
        } else throw error;
      }
    );
  }

  updatePost(post) {
    this.service.update(post).subscribe(updatedPost => {
    });
  }

  deletePost(post) {
    this.service.delete(post.id).subscribe(
      () => {
        let index = this.posts.indexOf(post);
        this.posts.splice(index, 1);
      },
      (error: AppError) => {
        if (error instanceof NotFoundError)
          alert("This post has already been deleted.");
        else throw error;
      }
    );
  }
}
