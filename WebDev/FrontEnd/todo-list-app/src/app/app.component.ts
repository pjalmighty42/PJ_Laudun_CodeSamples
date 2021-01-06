import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'todo-list-app';

  constructor() {
    this.changeName('Todo List App');
  }

  changeName(name: string): void{
    this.title = name;
  }
}
