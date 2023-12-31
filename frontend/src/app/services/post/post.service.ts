import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Post from 'src/app/core/models/post';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post> {
    return this.http.get<Post>(`${environment.API_BASE_URL}/api/v1/posts`);
  }

  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${environment.API_BASE_URL}/api/v1/posts${id}`);
  }
}
