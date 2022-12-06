import { Autowired } from '@opensumi/di';
import {
  CommandContribution,
  CommandRegistry,
  Domain,
  getIcon,
  KeybindingContribution,
  KeybindingRegistry,
  TabBarToolbarContribution,
  ToolbarRegistry,
} from '@opensumi/ide-core-browser';
import { IMainLayoutService, MainLayoutContribution } from '@opensumi/ide-main-layout';
import { EXPLORER_CONTAINER_ID } from '@opensumi/ide-explorer/lib/browser/explorer-contribution';

import { ITodo, ITodoService, TODO_COMMANDS, TODO_CONTEXT_MENU_ID } from '../common';
import { Todo } from './todo.view';
import { IMenuRegistry, MenuContribution } from '@opensumi/ide-core-browser/lib/menu/next';
import { IMessageService } from '@opensumi/ide-overlay';

@Domain(CommandContribution, KeybindingContribution, MainLayoutContribution, MenuContribution, TabBarToolbarContribution)
export class TodoContribution implements CommandContribution, KeybindingContribution, MainLayoutContribution, MenuContribution, TabBarToolbarContribution {
  @Autowired(ITodoService)
  private todoService: ITodoService;

  @Autowired(IMainLayoutService)
  private mainLayoutService: IMainLayoutService;

  @Autowired(IMessageService)
  private messageService: IMessageService;

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
    registry.registerCommand(TODO_COMMANDS.SHOW_TODO, {
      execute: (item: ITodo) => {
        console.log('item => ', item.description);
        this.messageService.info(`${item.description}, checked: ${item.isChecked ? 'true' : 'false'}`)
      },
    });
  }

  registerKeybindings(registry: KeybindingRegistry) {
    registry.registerKeybinding({
      keybinding: 'cmd+o',
      command: TODO_COMMANDS.ADD_TODO.id,
    });
  }

  registerMenus(menus: IMenuRegistry): void {
    menus.registerMenuItem(TODO_CONTEXT_MENU_ID, {
      command: TODO_COMMANDS.SHOW_TODO.id,
    })
  }

  registerToolbarItems(registry: ToolbarRegistry) {
    // 点击聚焦当前编辑器 focus 的文件
    registry.registerItem({
      id: TODO_COMMANDS.ADD_TODO.id,
      // https://opensumi.github.io/core/iconfont.html
      iconClass: getIcon('plus'),
      command: TODO_COMMANDS.ADD_TODO.id,
      label: 'Add Todo',
      viewId: 'todo-view',
      when: `view == 'todo-view'`,
      order: 0,
    });
  }
}
