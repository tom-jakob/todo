import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewTodoComponent } from './new-todo/new-todo.component';
import { TodoListComponent } from './listing/todo-list/todo-list.component';



const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "todos" },
  { path: "todos", component: TodoListComponent},
  { path: "todos/newtodo", component: NewTodoComponent },
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
