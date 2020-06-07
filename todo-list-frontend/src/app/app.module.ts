import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';  
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListComponent } from './listing/todo-list/todo-list.component';
import { NewTodoComponent } from './new-todo/new-todo.component';
import { DatePipe } from '@angular/common';
import { UpdateComponent } from './update/update.component';
import { TodoDetailComponent } from './todo-detail/todo-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    NewTodoComponent,
    UpdateComponent,
    TodoDetailComponent,
     ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
