import { Injectable, Autowired } from '@opensumi/di';
import { PreferenceService } from '@opensumi/ide-core-browser';
import { MaybePromise, URI, IEditorDocumentChange, IEditorDocumentModelSaveResult, Event, SaveTaskResponseState, Emitter, Schemes } from '@opensumi/ide-core-common';
import { IEditorDocumentModelContentProvider } from '@opensumi/ide-editor/lib/browser';
import { IFileServiceClient } from '@opensumi/ide-file-service';
import { EOL } from '@opensumi/ide-monaco/lib/common/types';

// 一个虚拟的数据仓库
const fakeDBServer = {
  getJsonData: (dbName: string, userName: string, userToken: string, tableName: string, extraExample: string) => {
    return {
      dbName,
      userName,
      userToken,
      tableName,
      random: Math.random(), // 用于验证数据刷新
      tableContent: [
        {
          "name": "John Doe",
          "id": 12345,
          "phone": "555-1234",
          "token": "abc123",
          "extra": extraExample || 'no extra example', // 用于验证参数传递
        },
        {
          "name": "Jane Smith",
          "id": 67890,
          "phone": "555-5678",
          "token": "def456"
        },
        {
          "name": "Bob Johnson",
          "id": 24680,
          "phone": "555-2468",
          "token": "ghi789"
        },
        {
          "name": "Samantha Williams",
          "id": 13579,
          "phone": "555-1357",
          "token": "jkl012"
        },
        {
          "name": "Tom Wilson",
          "id": 86420,
          "phone": "555-8642",
          "token": "mno345"
        }
      ],
      comment: 'this is a fake db server'
    };
  }
}

export const TokenCustomEditorDocumentContentProvider = Symbol('TokenCustomEditorDocumentContentProvider');

// 在OpenSumi Core项目中，可以参考的源码实现: 
// fs-editor-doc.ts / untitled-resource.ts
@Injectable()
export class CustomEditorDocumentContentProvider implements IEditorDocumentModelContentProvider {

  @Autowired(IFileServiceClient)
  protected readonly fileServiceClient: IFileServiceClient;

  @Autowired(PreferenceService)
  protected readonly preferenceService: PreferenceService;

  handlesScheme?(scheme: string): MaybePromise<boolean> {
    return scheme === 'custom-scheme';
  }
  async provideEditorDocumentModelContent(uri: URI, encoding?: string | undefined): Promise<string> {
    console.log('provideEditorDocumentModelContent', uri.toString());
    // 这是一个虚假的逻辑，大概的流程是:
    // 在项目中存储一个虚拟的DbConfig文件，然后读取这个文件，然后根据这个文件的配置，去请求一个虚假的数据库服务器，获取数据
        
    const fileURI = uri.withScheme(Schemes.file).withoutQuery(); // 还原fileURI，用于配置文件获取
    const { content: buffer } = await this.fileServiceClient.readFile(fileURI.toString());
    const content = buffer.toString(encoding); // get db config here
    const dbConfig = JSON.parse(content);
    const { customParam1 } = uri.getParsedQuery(); // 自定义参数
    const { dbName, userName, userToken, defaultTable, comment } = dbConfig;
    const jsonData = fakeDBServer.getJsonData(dbName, userName, userToken, defaultTable, customParam1);

    return JSON.stringify(jsonData);
  }
  isReadonly(uri: URI): MaybePromise<boolean> {
    return false;
  }
  saveDocumentModel?(uri: URI, content: string, baseContent: string, changes: IEditorDocumentChange[], encoding?: string | undefined, ignoreDiff?: boolean | undefined, eol?: EOL | undefined): MaybePromise<IEditorDocumentModelSaveResult> {
    // 这里实现保存数据的逻辑
    console.log('saveDocumentModel', uri, content, baseContent, changes, encoding, ignoreDiff, eol);
    return {
      state: SaveTaskResponseState.SUCCESS,
    };
  }
  preferLanguageForUri?(uri: URI): MaybePromise<string | undefined> {
    return 'json';
  }
  
  private _onDidChangeContent: Emitter<URI> = new Emitter();

  public onDidChangeContent: Event<URI> = this._onDidChangeContent.event;

  // 外部触发刷新事件
  // 但是要注意的点：当用户手动修改编辑器中的文档（格式化也是一种修改），导致Document处于dirty状态时，底层的文档更新不会显示在编辑器上
  // 参见源码：https://vscode.dev/github/opensumi/core/blob/8f6f12a8a1479800d1510ec34e7783d7eb0d682d/packages/editor/src/browser/doc-model/editor-document-model-service.ts#L190
  // 这算是一种编辑冲突的问题
  public fireDidChangeContent(uri: URI) {
    this._onDidChangeContent.fire(uri);
  }

}