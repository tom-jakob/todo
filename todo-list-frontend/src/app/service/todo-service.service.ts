import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../Todo';

@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {

  rootApiPath: string = "http://localhost:8080/todo/";

  constructor(private http: HttpClient) { }


  public findAll(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.rootApiPath);
  }

  public findById(id: number): Observable<Todo> {
    return this.http.get<Todo>(this.rootApiPath + id);
  }

  public save(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.rootApiPath, todo);
  }

  public saveAll(todos: Todo[]): Observable<Todo[]> {
    return this.http.post<Todo[]>(this.rootApiPath + "saveall", todos);
  }

  public delete(id: number): Observable<Todo> {
    return this.http.delete<Todo>(this.rootApiPath + "delete/" + id);
  }

  public update(id: number, todo:Todo): Observable<Todo> {
    return this.http.put<Todo>(this.rootApiPath + "update/" + id, todo);
  }



}
