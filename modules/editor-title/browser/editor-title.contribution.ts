import { Autowired } from '@opensumi/di';
import {
  CommandContribution,
  CommandRegistry,
  Domain,
  getIcon,
} from '@opensumi/ide-core-browser';
import { IMenuRegistry, MenuContribution, MenuId } from '@opensumi/ide-core-browser/lib/menu/next';
import { OutputService } from '@opensumi/ide-output/lib/browser/output.service';

export namespace EDITOR_TITLE_SAMPLE_COMMANDS {
  export const DEBUG = {
    id: 'editor-title.debug',
    label: '调试',
  }
}

const OUTPUT_CHANNEL_ID = 'Editor Tile Test';

@Domain(CommandContribution, MenuContribution)
export class EditorTitleSampleContribution implements CommandContribution, MenuContribution {
  private seed = 0;

  @Autowired(OutputService)
  private readonly output: OutputService

  registerCommands(registry: CommandRegistry) {
    registry.registerCommand(EDITOR_TITLE_SAMPLE_COMMANDS.DEBUG, {
      execute: () => {
        const channel = this.output.getChannel(OUTPUT_CHANNEL_ID);
        channel.setVisibility(true);
        this.output.updateSelectedChannel(channel);
        channel.appendLine(`Time: ${this.seed ++}`);
      },
    });
  }

  registerMenus(registry: IMenuRegistry) {
    registry.registerMenuItem(MenuId.EditorTitle, {
      command: EDITOR_TITLE_SAMPLE_COMMANDS.DEBUG.id,
      iconClass: getIcon('debug'),
      group: 'navigation',
      when: 'resource',
    })
  }
}
