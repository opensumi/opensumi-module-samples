import { Command, CommandContribution, CommandRegistry, Domain } from '@opensumi/ide-core-common';

import { ComponentContribution, ComponentRegistry, QuickPickService } from '@opensumi/ide-core-browser';
import { IMenuRegistry, MenuContribution, MenuId } from '@opensumi/ide-core-browser/lib/menu/next';
import { Autowired } from '@opensumi/di';
import { IMessageService } from '@opensumi/ide-overlay';

const TestMenuBarId = 'menubar/test';
const HELLO_COMMAND: Command = {
  id: 'test.hello',
  label: 'Hello',
}

const SHOW_PICK_SERVICE_COMMAND: Command = {
  id: 'test.show-pick',
  label: 'Show Pick Service',
}

@Domain(MenuContribution, CommandContribution)
export class CustomContextMenuContribution implements MenuContribution, CommandContribution {
  @Autowired(IMessageService)
  protected readonly message: IMessageService;

  @Autowired(QuickPickService)
  private quickPickService: QuickPickService;

  registerMenus(registry: IMenuRegistry) {
    // 在 Menubar 区域注册一个新的菜单
    registry.registerMenubarItem(TestMenuBarId, {
      label: 'OpenSumi',
      order: 0
    });

    registry.registerMenuItem(TestMenuBarId, {
      command: HELLO_COMMAND.id,
    });

    registry.registerMenuItem(TestMenuBarId, {
      command: SHOW_PICK_SERVICE_COMMAND.id,
    });

    // 注册二级菜单
    const SubMenuId = 'test/next';
    registry.registerMenuItem(TestMenuBarId, {
      submenu: SubMenuId,
      label: 'Hover Me',
      group: '1_second',
    });

    registry.registerMenuItem(SubMenuId, {
      command: HELLO_COMMAND.id,
    });


    // 向已有的菜单注册新的命令，如文件树
    registry.registerMenuItem(MenuId.ExplorerContext, {
      command: HELLO_COMMAND.id,
      group: '0_test',
    });
  }

  registerCommands(commands: CommandRegistry) {
    commands.registerCommand(HELLO_COMMAND, {
      execute: () => {
        this.message.info('Hello ~');
      },
    });

    commands.registerCommand(SHOW_PICK_SERVICE_COMMAND, {
      execute: async () => {
        const result = await this.quickPickService.show([
          'Hello',
          'World',
        ], {
          canPickMany: true,
        });

        this.message.info('you selected' + JSON.stringify(result));
      },
    });
  }
  
}
