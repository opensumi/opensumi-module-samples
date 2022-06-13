import { Autowired } from '@opensumi/di';
import {
  CommandContribution,
  CommandRegistry,
  Domain,
  KeybindingContribution,
  KeybindingRegistry,
} from '@opensumi/ide-core-browser';
import { IMainLayoutService, MainLayoutContribution } from '@opensumi/ide-main-layout/lib/common/main-layout.defination';
import { EXPLORER_CONTAINER_ID } from '@opensumi/ide-explorer/lib/browser/explorer-contribution';

import { ITodoService, TODO_COMMANDS } from '../common';
import { Todo } from './todo.view';

@Domain(CommandContribution, KeybindingContribution, MainLayoutContribution)
export class TodoContribution implements CommandContribution, KeybindingContribution, MainLayoutContribution {
  @Autowired(ITodoService)
  private todoService: ITodoService;

  @Autowired(IMainLayoutService)
  private mainLayoutService: IMainLayoutService;

  onDidRender() {
    this.mainLayoutService.collectViewComponent(
      {
        component: Todo,
        collapsed: false,
        id: 'todo-view',
        name: 'Todo'
      },
      EXPLORER_CONTAINER_ID
    );
  }

  registerCommands(registry: CommandRegistry) {
    registry.registerCommand(TODO_COMMANDS.ADD_TODO, {
      execute: () => {
        return this.todoService.addTodo();
      },
    });
  }

  registerKeybindings(registry: KeybindingRegistry) {
    registry.registerKeybinding({
      keybinding: 'cmd+o',
      command: TODO_COMMANDS.ADD_TODO.id,
    });
  }
}
