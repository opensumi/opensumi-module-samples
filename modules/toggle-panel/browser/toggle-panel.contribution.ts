import { Autowired } from '@opensumi/di';
import {
  ClientAppContribution,
  Domain,
  Command,
  CommandRegistry,
  CommandContribution,
  SlotLocation,
} from '@opensumi/ide-core-browser';
import { IMainLayoutService } from '@opensumi/ide-main-layout';
import { RESOURCE_VIEW_ID } from '@opensumi/ide-file-tree-next';
import { ViewContentGroups } from '@opensumi/ide-main-layout/lib/browser/views-registry';

namespace LAYOUT_TOGGLE_COMMANDS {
  export const CATEGORY = 'Toggle';

  export const toggleLeftPanel: Command = {
    category: CATEGORY,
    id: 'toggle.command.toggleLeftPanel',
    label: 'Toggle Left Panel',
  }
  export const toggleLeftPanelAndSidebar = {
    category: CATEGORY,
    id: 'toggle.command.toggleLeftPanelAndSidebar',
    label: 'Toggle Left Panel and Sidebar',
  }
}

@Domain(CommandContribution)
export class TogglePanelSampleContribution implements CommandContribution {
  @Autowired(IMainLayoutService)
  private readonly layoutService: IMainLayoutService

  private show = true;

  registerCommands(registry: CommandRegistry) {
    registry.registerCommand(LAYOUT_TOGGLE_COMMANDS.toggleLeftPanel, {
      execute: () => {
        const isVisible = this.layoutService.isVisible(SlotLocation.left);
        this.layoutService.toggleSlot(SlotLocation.left, !isVisible);
      },
    });

    registry.registerCommand(LAYOUT_TOGGLE_COMMANDS.toggleLeftPanelAndSidebar, {
      execute: () => {
        this.show = !this.show;
        this.layoutService.getTabbarService(SlotLocation.left).updatePanelVisibility(this.show);
      },
    });
  }
  
}
