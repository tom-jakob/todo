import { Component, OnInit, Input } from '@angular/core';
import { Todo } from '../Todo';
import { TodoServiceService } from '../service/todo-service.service';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css']
})
export class TodoDetailComponent implements OnInit {


  // @Input()
  // todoList:Todo[];
  
  @Input()
  idForDetails:number;

  todo:Todo;


  constructor(private todoService:TodoServiceService) { }

  ngOnInit(): void {
    this.todoService.findById(this.idForDetails).subscribe(fetchedTodo => this.todo = fetchedTodo);
  }

}
