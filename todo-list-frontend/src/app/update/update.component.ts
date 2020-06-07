import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Todo } from '../Todo';
import { TodoServiceService } from '../service/todo-service.service';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

@Input()
todoList:Todo[];

@Input()
idForUpdate:number;


updatedTodo:Todo;

@Output()
todoTransporter:EventEmitter<Todo> = new EventEmitter<Todo>();


  constructor(private todoService:TodoServiceService) { }

  ngOnInit(): void {
    this.updatedTodo = this.todoList.find(todo => todo.id === this.idForUpdate);
    console.log(this.updatedTodo);
  }



public updateTodo(){
  this.todoService.update(this.idForUpdate, this.updatedTodo)
  .subscribe(response => {this.todoTransporter.emit(this.updatedTodo)} )

}




}
