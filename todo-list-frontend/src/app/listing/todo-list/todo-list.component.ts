import { Component, OnInit } from '@angular/core';
import { TodoServiceService } from 'src/app/service/todo-service.service';
import { Todo } from 'src/app/Todo';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todoList: Todo[];
  newTodo: Todo;
  idForUpdate: number;
  idForDetails:number;

  toggleDetails: boolean = false;
  toggleUpdate: boolean = false;

  constructor(private todoService: TodoServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.todoService.findAll().subscribe(fetchedTodos => (this.todoList = fetchedTodos));
    
  }



  public deleteTodo(id: number): void {
    this.todoService.delete(id)
      .subscribe(_ => { this.todoList = this.todoList.filter(todo => todo.id !== id) })
  }

  public setDone(id: number, todo: Todo) {
    todo.done = !todo.done;
    console.log(todo);
    this.todoService.update(id, todo).subscribe((_) => { });
  }

// Button oder Links für Details einfügen

public setToggleDetails(id:number): void {
  this.idForDetails = id;
  this.toggleDetails = !this.toggleDetails;
}




public setToggleUpdate(id:number){
  this.toggleUpdate = !this.toggleUpdate;
  this.idForUpdate = id;
  console.log(this.idForUpdate);
}



  public setUpdatedTodo(todo: Todo) {
    this.todoList.forEach(element => {
      if (element.id === todo.id) {
        element = todo;
      }

    });
    this.toggleUpdate = !this.toggleUpdate;
  }

}
