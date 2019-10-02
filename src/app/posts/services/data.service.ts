import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BadInput } from 'src/app/common/bad-input';
import { NotFoundError } from 'src/app/common/not-found-error';
import { AppError } from 'src/app/common/app-error';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
@Injectable()
export class DataService {
  constructor(private url: string, private http: Http) { }

  getAll() {
    console.log(this.http.get(this.url));
    console.log(this.http.get(this.url).map(response => response.json()));
    return this.http.get(this.url)
      .map(response => response.json())
      .catch(this.handleError);
  }

  create(resource) {
    return this.http.post(this.url, JSON.stringify(resource))
      .map(response => response.json())
      .catch(this.handleError);
  }

  update(resource) {
    return this.http.patch(this.url + '/' + resource.id, JSON.stringify({ isRead: true }))
      .map(response => response.json())      
      .catch(this.handleError);
  }

  delete(id) {
    console.log(this.http.delete(this.url + '/' + id));
    this.http.delete(this.url + '/' + id)
    .map(response => response.json())
    .catch(this.handleError)
    return this.http.delete(this.url + '/' + id)
      .map(response => {
        response.json();
      })
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    if (error.status === 400)
      return Observable.throw(new BadInput(error.json()));
  
    if (error.status === 404)
      return Observable.throw(new NotFoundError());
    
    return Observable.throw(new AppError(error));
  }
}
