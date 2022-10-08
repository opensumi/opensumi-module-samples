import { Autowired } from '@opensumi/di';
import { ClientAppContribution } from '@opensumi/ide-core-browser/lib/common';
import {
  BrowserEditorContribution,
  EditorComponentRegistry,
  EditorComponentRenderMode,
  WorkbenchEditorService,
  ResourceService,
  IResource,
} from '@opensumi/ide-editor/lib/browser/types';
import {
  CommandContribution,
  CommandRegistry,
  Domain,
  Schemes,
  StorageProvider,
  URI,
} from '@opensumi/ide-core-common';
import { IWorkspaceService } from '@opensumi/ide-workspace/lib/common';
import { IconService } from '@opensumi/ide-theme/lib/browser';
import { IMenuRegistry, MenuContribution, MenuId } from '@opensumi/ide-core-browser/lib/menu/next';

import { AntdComponentsSampleView } from './components.view';
import { IconType } from '@opensumi/ide-theme';

const COMPONENTS_VIEW_COMMAND = {
  id: 'opensumi-antd-theme-sample',
};

const COMPONENTS_ID = 'opensumi-samples:antd-theme';
const COMPONENTS_SCHEME_ID = 'antd-theme';

@Domain(BrowserEditorContribution, ClientAppContribution, CommandContribution, MenuContribution)
export class AntdComponentsContribution implements ClientAppContribution, BrowserEditorContribution, CommandContribution, MenuContribution {
  @Autowired(IWorkspaceService)
  protected readonly workspaceService: IWorkspaceService;

  @Autowired(IconService)
  protected readonly iconService: IconService;

  @Autowired(StorageProvider)
  protected readonly getStorage: StorageProvider;


  @Autowired(WorkbenchEditorService)
  protected readonly editorService: WorkbenchEditorService;


  registerCommands(registry: CommandRegistry) {
    registry.registerCommand(COMPONENTS_VIEW_COMMAND, {
      execute: () => {
        this.editorService.open(new URI(`${COMPONENTS_SCHEME_ID}://`), { preview: false });
      },
    });
  }

  registerMenus(registry: IMenuRegistry) {
    registry.registerMenuItem(MenuId.MenubarHelpMenu, {
      command: { id: COMPONENTS_VIEW_COMMAND.id, label: 'AntD 主题覆盖案例' },
      order: 1,
      group: '2_addon',
    });
  }

  registerEditorComponent(registry: EditorComponentRegistry) {
    registry.registerEditorComponent({
      uid: COMPONENTS_ID,
      scheme: COMPONENTS_SCHEME_ID,
      component: AntdComponentsSampleView,
      renderMode: EditorComponentRenderMode.ONE_PER_WORKBENCH,
    });

    registry.registerEditorComponentResolver(COMPONENTS_SCHEME_ID, (resource, results) => {
      results.push({
        type: 'component',
        componentId: COMPONENTS_ID,
      });
    });
    
    // Handle `xxx.ant-theme` files with custom component.
    registry.registerEditorComponentResolver(Schemes.file, (resource, results) => {
      if (resource.uri.path.ext === `.${COMPONENTS_SCHEME_ID}`) {
        results.push({
          type: 'component',
          componentId: COMPONENTS_ID,
        });
      }
    });
  }

  registerResource(service: ResourceService) {
    service.registerResourceProvider({
      scheme: COMPONENTS_SCHEME_ID,
      provideResource: async (uri: URI): Promise<IResource<any>> => {
        const iconClass = this.iconService.fromIcon(
          '',
          'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
          IconType.Background,
        );
        return {
          uri,
          name: 'AntD 组件案例',
          icon: iconClass!,
        }
      },
    });
  }

  async onDidStart() {
    this.editorService.open(new URI(`${COMPONENTS_SCHEME_ID}://`), { preview: false });
  }
}
