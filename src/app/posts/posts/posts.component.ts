import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { splitClasses } from '@angular/compiler';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts: any[];
  private url = 'http://jsonplaceholder.typicode.com/posts';
  constructor(private http: Http) { 


  }
  ngOnInit() {
    this.http.get(this.url)
    .subscribe(response => {
      this.posts = response.json();
    })
  }
  createPost(input: HTMLInputElement){
    let post = { title: input.value};
    this.http.post(this.url, JSON.stringify)
    .subscribe(response =>{
      post['id'] = response.json().id;
      this.posts.splice(0, 0, post);
    })
  }

  updatePost(post){
    // console.log(post);
    this.http.patch(this.url + '/' + post.id, JSON.stringify({ isRead: true}))
    .subscribe(response =>{
      console.log(response.json());
    })

  }
  deletePost(post){
    // console.log(post);
    this.http.delete(this.url + '/' + post.id)
    .subscribe(response =>{
      let index = this.posts.indexOf(post);
      this.posts.splice(index, 1);
    })

  }
}
