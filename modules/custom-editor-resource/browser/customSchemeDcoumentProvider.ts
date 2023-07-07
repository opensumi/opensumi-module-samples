import { Injectable } from '@opensumi/di';
import { Event, Emitter, MaybePromise, URI, UTF8, SaveTaskResponseState } from '@opensumi/ide-core-common';
import { IEditorDocumentModelContentProvider } from '@opensumi/ide-editor/lib/browser/doc-model/types';
import { ReadEncodingOptions } from '@opensumi/ide-editor/lib/browser/fs-resource/fs-editor-doc';

@Injectable()
export class CustomSchemeDocumentProvider implements IEditorDocumentModelContentProvider {

  private customSchemeDocuments: Map<string, string> = new Map();

  handlesScheme(scheme: string) {
    return scheme === 'custom-resource';
  }

  // 读取 custom-resource 协议文本
  // 此处可以是任意实现，例如读取远程服务端提供的内容
  async read(uri: URI, options: ReadEncodingOptions): Promise<{ encoding: string; content: string }> {
    const { resourceId } = uri.getParsedQuery();
    if(!this.customSchemeDocuments.has(resourceId)) {
      this.customSchemeDocuments.set(resourceId, 'Hello world!');
    }

    return {
      encoding: UTF8,
      content: this.customSchemeDocuments.get(resourceId)!,
    };
  }

  async provideEditorDocumentModelContent(uri: URI, encoding: string): Promise<string> {
    const res = (await this.read(uri, { encoding })).content;
    return res;
  }

  // 编辑器触发保存 custom-resource 协议文本操作
  // 可以在此处调用服务端接口更新
  saveDocumentModel(uri: URI, content: string) {
    const { resourceId } = uri.getParsedQuery();
    this.customSchemeDocuments.set(resourceId, content);
    this._onDidChangeContent.fire(uri);
    return {
      state: SaveTaskResponseState.SUCCESS,
    }
  }

  isReadonly(): MaybePromise<boolean> {
    return false;
  }

  private _onDidChangeContent: Emitter<URI> = new Emitter();
  onDidChangeContent: Event<URI> = this._onDidChangeContent.event;

  preferLanguageForUri() {
    return 'plaintext';
  }
}
