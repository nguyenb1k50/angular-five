
import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  posts: any[];
  constructor(private service: PostService) { 


  }
  ngOnInit() {
    this.service.getPost()
    .subscribe(response => {
      this.posts = response.json();
    })
  }
  createPost(input: HTMLInputElement){
    let post = { title: input.value};
    this.service.createPost()
    .subscribe(response =>{
      post['id'] = response.json().id;
      this.posts.splice(0, 0, post);
    })
  }

  updatePost(post){
    // console.log(post);
    this.service.updatePost(post)
    .subscribe(response =>{
      console.log(response.json());
    })

  }
  deletePost(post){
    // console.log(post);
    // this.http.delete(this.url + '/' + post.id)
    this.service.deletePost(post.id)
    .subscribe(response =>{
      let index = this.posts.indexOf(post);
      this.posts.splice(index, 1);
    })
  }
}
