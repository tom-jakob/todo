import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { TodoServiceService } from '../service/todo-service.service';
import { Todo } from '../Todo';
import { DatePipe, Time } from '@angular/common';
import { isUndefined, isDate } from 'util';
import { noUndefined } from '@angular/compiler/src/util';
import { Moment } from 'moment';
import * as moment from 'moment';

@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.css']
})
export class NewTodoComponent implements OnInit {


  newTodoList: Todo[] = [];
  todoLenght:moment.Duration;
  toggleSuccess: boolean = false;
  successSave: string;


  constructor(
    private router: Router,
    private todoService: TodoServiceService) { }

  ngOnInit(): void {
    this.addTodoToList();
  }

  public saveTodo(index: number): void {
    this.showSuccessMsg(index);
    let todoToSave = this.newTodoList[index];

    this.todoService.save(todoToSave).subscribe(
                 (_) => {if (this.newTodoList.length < 1) {
      this.router.navigate(["todos"]) }
            });
      
       this.removeTodo(index);
      
    console.log("Länge Liste:" + this.newTodoList.length);

  }



  public addTodoToList(): void {
    const todoToPush = new Todo();
    todoToPush.done = false;
    this.newTodoList.push(todoToPush);
  }

  public removeTodo(index: number): void {
    this.newTodoList.splice(index, 1);

  }

  public saveAll(): void {
    if (this.checkInputFields()) {
      this.todoService.saveAll(this.newTodoList)
        .subscribe((_) => { this.router.navigate(["todos"]) });
    }
  }

  public showSuccessMsg(index: number): void {
    this.toggleSuccess = true;
    this.successSave = this.newTodoList[index].name;
    console.log(this.toggleSuccess);
    console.log(this.successSave);

  }


  public checkInputFields(): boolean {

    if (this.checkForNull()) {

      alert("Mindestens ein To-Do Name ist unausgefüllt!")
      return false;

    } else if (this.checkForNameLength()) {
      alert("Mindestens ein To-Do Name hat keine gültige Länge (5-20 Zeichen)");
      return false;
    }

    if (this.checkForDescNotBlank()) {
      alert("Die Details durfen nicht leer sein!");
      return false
    } else if (this.checkForValidDate()) {
      alert("Mindestens ein To-Do Datum ist ungültig!");
      return false
    }

    else { return true; }

  }

  checkForNull(): boolean {
    const isNull = (todo: Todo) => isUndefined(todo.name);
    return this.newTodoList.some(isNull);
  }

  checkForValidDate(): boolean {
    const noDate = (todo: Todo) => isUndefined(todo.date);
    return this.newTodoList.some(noDate);
  }

  checkForNameLength(): boolean {
    const wrongLenght = (todo: Todo) => todo.name.length < 5 || todo.name.length > 20;
    return this.newTodoList.some(wrongLenght);
  }

  checkForDescNotBlank(): boolean {
    const descBlank = (todo: Todo) => isUndefined(todo.details) || todo.details === "";
    console.log("Einige Details leer:" + this.newTodoList.some(descBlank));
    return this.newTodoList.some(descBlank);
  }

}