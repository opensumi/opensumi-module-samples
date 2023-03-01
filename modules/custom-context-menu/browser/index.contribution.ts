import { Command, CommandContribution, CommandRegistry, Domain } from '@opensumi/ide-core-common';

import { ComponentContribution, ComponentRegistry } from '@opensumi/ide-core-browser';
import { IMenuRegistry, MenuContribution, MenuId } from '@opensumi/ide-core-browser/lib/menu/next';
import { Autowired } from '@opensumi/di';
import { IMessageService } from '@opensumi/ide-overlay';

const TestMenuBarId = 'menubar/test';
const HELLO_COMMAND: Command = {
  id: 'test.hello',
  label: 'Hello',
}

@Domain(MenuContribution, CommandContribution)
export class CustomContextMenuContribution implements MenuContribution, CommandContribution {
  @Autowired(IMessageService)
  protected readonly message: IMessageService;

  registerMenus(registry: IMenuRegistry) {
    // 在 Menubar 区域注册一个新的菜单
    registry.registerMenubarItem(TestMenuBarId, {
      label: 'OpenSumi',
      order: 0
    });

    registry.registerMenuItem(TestMenuBarId, {
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
  }
  
}
