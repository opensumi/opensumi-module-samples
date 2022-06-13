import * as React from 'react';
import { ViewState, useInjectable } from '@opensumi/ide-core-browser';
import { RecycleList, CheckBox } from '@opensumi/ide-components';

import { ITodoService } from '../common';
import * as styles from './todo.module.less';

export interface ITodo {
  description: string;
  isChecked: boolean;
}

export const Todo = ({ viewState }: React.PropsWithChildren<{ viewState: ViewState }>) => {
  const { width, height } = viewState;
  const [todos, setTodos] = React.useState<ITodo[]>([
    {
      description: 'First Todo',
      isChecked: true,
    },
  ]);
  const { showMessage } = useInjectable<ITodoService>(ITodoService);

  const template = ({ data, index }: { data: ITodo; index: number }) => {
    const handlerChange = () => {
      const newTodos = todos.slice(0);
      newTodos.splice(index, 1, {
        description: data.description,
        isChecked: !data.isChecked,
      });
      showMessage(`Set ${data.description} to be ${!data.isChecked}`);
      setTodos(newTodos);
    };
    return (
      <div className={styles.todo_item} key={`${data.description + index}`}>
        <CheckBox checked={data.isChecked} onChange={handlerChange} label={data.description} />
      </div>
    );
  };

  return (
    <RecycleList className={styles.todo} height={height} width={width - 20} itemHeight={24} data={todos} template={template} />
  );
};
