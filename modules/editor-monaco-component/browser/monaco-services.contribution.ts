import { Autowired } from '@opensumi/di';
import {
  BrowserEditorContribution,
  EditorComponentRegistry,
  EditorComponentRenderMode,
  ResourceService,
} from '@opensumi/ide-editor/lib/browser/types';

import { IWorkspaceService } from '@opensumi/ide-workspace/lib/common';
import { IconService } from '@opensumi/ide-theme/lib/browser';
import { LabelService } from '@opensumi/ide-core-browser/lib/services';
import { Domain, Schemes, URI } from '@opensumi/ide-core-common';

import { CutsomMonacoEditorView } from './monaco-services.view';
import { IEditorDocumentModelContentProvider, IEditorDocumentModelContentRegistry } from '@opensumi/ide-editor/lib/browser';
import { TokenCustomEditorDocumentContentProvider } from './custom-document-provider';

const COMPONENTS_ID = 'opensumi-samples:monaco-editor';
const COMPONENTS_SCHEME_ID = 'customeEditor1';

const customFileRegex = /^.*\.jsonConfig\..*$/;

// example: handle xx.jsonCofnig with custom editor component
@Domain(BrowserEditorContribution)
export class CustomEditorMonacoContribution implements BrowserEditorContribution {
  @Autowired(IWorkspaceService)
  protected readonly workspaceService: IWorkspaceService;

  @Autowired(IconService)
  protected readonly iconService: IconService;

  @Autowired(IEditorDocumentModelContentRegistry)
  private readonly contentRegistry: IEditorDocumentModelContentRegistry;

  @Autowired(TokenCustomEditorDocumentContentProvider)
  private readonly customEditorDocumentContentProvider: IEditorDocumentModelContentProvider;

  @Autowired()
  labelService: LabelService;

  registerEditorComponent(registry: EditorComponentRegistry) {

    // 注册自定义组件
    registry.registerEditorComponent({
      uid: COMPONENTS_ID,
      scheme: COMPONENTS_SCHEME_ID,
      component: CutsomMonacoEditorView,
      renderMode: EditorComponentRenderMode.ONE_PER_RESOURCE,
    });

    // 注册相关的Scheme
    registry.registerEditorComponentResolver(
      COMPONENTS_SCHEME_ID,
      (resource, results) => {
        results.push({
          type: 'component',
          componentId: COMPONENTS_ID,
        });
      },
    );

    // 注册相关的文件后缀 或者 文件名的某种匹配方式
    // Handle `xxx.jsonconfig.xxx` files with custom component.
    registry.registerEditorComponentResolver(Schemes.file, (resource, results) => {
      if (resource.uri.path.ext === `.${'jsonconfig'}` || customFileRegex.test(resource.uri.path.toString())) {
        results.push({
          type: 'component',
          componentId: COMPONENTS_ID,
        });
      }
    });
  }

  // 注册自定义的 DocumentModelContentProvider
  registerEditorDocumentModelContentProvider(registry: IEditorDocumentModelContentRegistry): void {
    registry.registerEditorDocumentModelContentProvider(this.customEditorDocumentContentProvider);
  }

  // 注册自定义的 Resource
  registerResource(service: ResourceService) {
    service.registerResourceProvider({
      scheme: COMPONENTS_SCHEME_ID,
      provideResource: async (uri: URI): Promise<any> => {
        // 这里使用file Scheme来获取对应的文件名和图标，复用现有逻辑
        const uriWithFileScheme = uri.withScheme(Schemes.file).withoutQuery();

        // 可以在这里获取query参数，然后通过metadata的方式放置于resource中，然后传递给自定义EditorComponent组件
        const { param1, param2 } = uri.getParsedQuery();

        return {
          uri,
          name: this.labelService.getName(uriWithFileScheme),
          icon: this.labelService.getIcon(uriWithFileScheme),
          metadata: {
            param1,
            param2,
          },
        };
      },
    });
  }
}