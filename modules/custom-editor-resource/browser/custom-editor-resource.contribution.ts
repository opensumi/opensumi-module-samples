import { Autowired } from '@opensumi/di';
import { CommandContribution, CommandRegistry, URI } from '@opensumi/ide-core-common';
import { Domain } from '@opensumi/ide-core-common/lib/di-helper/domain-helper';
import { IEditorDocumentModelContentRegistry } from '@opensumi/ide-editor/lib/browser/doc-model/types';
import {
  BrowserEditorContribution,
  EditorComponentRegistry,
  EditorOpenType,
  IEditorOpenType,
  IResource,
  ResourceService,
  WorkbenchEditorService,
} from '@opensumi/ide-editor/lib/browser/types';

import { CustomSchemeDocumentProvider } from './customSchemeDcoumentProvider';

@Domain(BrowserEditorContribution, CommandContribution)
export class CustomEditorResourceContribution implements BrowserEditorContribution, CommandContribution {
  @Autowired(WorkbenchEditorService)
  protected readonly editorService: WorkbenchEditorService;

  @Autowired(CustomSchemeDocumentProvider)
  private readonly customSchemeDocumentProvider: CustomSchemeDocumentProvider;

  registerEditorComponent(registry: EditorComponentRegistry) {
    // custom-resource 将以何种方式在编辑器中打开
    // 此处定义为使用默认的 code editor 打开
    registry.registerEditorComponentResolver(
      'custom-resource',
      (_resource: IResource<any>, _results: IEditorOpenType[], resolve: (results: IEditorOpenType[]) => void) => {
        resolve([
          {
            type: EditorOpenType.code,
            priority: 'default',
          },
        ]);
      },
    );
  }

  registerResource(service: ResourceService) {
    // 提供 custom-resource 对应资源的一些信息
    // 包括图标、编辑器标题栏显示的 name
    service.registerResourceProvider({
      scheme: 'custom-resource',
      provideResource: async (uri: URI): Promise<IResource<any>> => {
        return {
          uri,
          name: 'This is custom resource name',
          // @see https://microsoft.github.io/vscode-codicons/dist/codicon.html
          icon: 'codicon codicon-dashboard'!,
        };
      },
    });
  }

  registerEditorDocumentModelContentProvider(registry: IEditorDocumentModelContentRegistry) {
    // 用于管理、保存 custom-resource 对应内容的 provider
    registry.registerEditorDocumentModelContentProvider(this.customSchemeDocumentProvider);
  }

  registerCommands(commands: CommandRegistry): void {
    commands.registerCommand(
      {
        id: 'open-custom-resource',
        label: 'Open Custom Resource',
      },
      {
        execute: () => {
          this.editorService.open(new URI('custom-resource://path/to/resource?resourceId=1'), { preview: false });
        },
      },
    );
  }
}
