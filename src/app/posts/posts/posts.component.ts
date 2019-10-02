import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts: any[];
  constructor(http: Http) { 
    console.log(http.get('http://jsonplaceholder.typicode.com/posts'));
    http.get('http://jsonplaceholder.typicode.com/posts')
    .subscribe(response => {
      this.posts = response.json();
    })
  }

  ngOnInit() {
  }

}
