import { Event } from "@opensumi/ide-core-common";

export const ITodoConnectionServerPath = 'ITodoConnectionServerPath';

export const ITodoService = Symbol('ITodoService');
export interface ITodoService {
  showMessage(message: string): void;
  onMessage(message: string): void;
  addTodo(): void;
  handleContextMenu(event: any, item: ITodo): void;
  onDidChange: Event<string>;
}

export const ITodoNodeService = Symbol('ITodoNodeService');
export interface ITodoNodeService {
  showMessage(message: string): void;
}

export namespace TODO_COMMANDS {
  export const ADD_TODO = {
    id: 'todo.addTodo',
  };
  export const SHOW_TODO = {
    id: 'todo.showTodo',
    label: 'Show TODO',
  };
};

export const TODO_CONTEXT_MENU_ID = 'todo_context_menu';

export interface ITodo {
  description: string;
  isChecked: boolean;
}
