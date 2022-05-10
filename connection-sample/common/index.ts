export const ITodoConnectionServerPath = 'ITodoConnectionServerPath';

export const ITodoService = Symbol('ITodoService');
export interface ITodoService {
  showMessage(message: string): void;
  onMessage(message: string): void;
  addTodo(): void;
}

export const ITodoNodeService = Symbol('ITodoNodeService');
export interface ITodoNodeService {
  showMessage(message: string): void;
}

export namespace TODO_COMMANDS {
  export const ADD_TODO = {
    id: 'todo.addTodo',
  };
};
