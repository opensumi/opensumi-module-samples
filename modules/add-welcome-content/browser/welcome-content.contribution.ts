import { Autowired } from '@opensumi/di';
import {
  ClientAppContribution,
  CommandContribution,
  CommandRegistry,
  Domain,
  FILE_COMMANDS,
  getIcon,
} from '@opensumi/ide-core-browser';
import { IViewsRegistry } from '@opensumi/ide-main-layout';
import { RESOURCE_VIEW_ID } from '@opensumi/ide-file-tree-next';
import { ViewContentGroups } from '@opensumi/ide-main-layout/lib/browser/views-registry';



@Domain(ClientAppContribution)
export class WelcomeContentSampleContribution implements ClientAppContribution {
  @Autowired(IViewsRegistry)
  private readonly viewsRegistry: IViewsRegistry

  onDidStart() {
    this.viewsRegistry.registerViewWelcomeContent(RESOURCE_VIEW_ID, {
      content: `Add new Welcome Content\n[Open Folder 2.0](command:${FILE_COMMANDS.OPEN_FOLDER.id})`,
      group: ViewContentGroups.Open,
      order: 1,
    });
  }
}
