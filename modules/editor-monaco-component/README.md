## 在自定义编辑器组件中使用 OpenSumi 的 Monaco 编辑器

本示例通过一个在自定义编辑器组件中使用 OpenSumi 的 Monaco 编辑器的示例，来演示如何使用 OpenSumi 的 Monaco 编辑器。

## React中创建编辑器
使用 `EditorCollectionService.createCodeEditor` 方法创建编辑器，该方法接收一个 `HTMLElement` 对象作为参数，编辑器会被创建在该 `HTMLElement` 对象中。

```typescript
const editor2: ICodeEditor = editorCollectionService.createCodeEditor(
  editorHtmlRef.current,
  {
    value: "",
    automaticLayout: true,
    readOnly: false,
    minimap: {
      enabled: false,
    },
  }
);
```
方法返回 `ICodeEditor` 对象，该对象提供了编辑器相关的接口。不过需要注意的是，ICodeEditor 并不是 Monaco Editor。具体定义可以查阅相关代码。
```typescript
export interface ICodeEditor extends IEditor, IDisposable {
  layout(): void;

  /**
   * 打开一个 document
   * @param uri
   */
  open(documentModelRef: IEditorDocumentModelRef, range?: IRange): void;

  focus(): void;

  onCursorPositionChanged: Event<CursorStatus>;

  onRefOpen: Event<IEditorDocumentModelRef>;
}
```

## 使用 IEditorDocumentModelContentProvider 为编辑器提供数据
实现 IEditorDocumentModelContentProvider 即可为编辑器提供数据，其中可以使用：
```typescript
async provideEditorDocumentModelContent(uri: URI, encoding?: string | undefined): Promise<string> {
    // fetch data
  }
```
来异步获取数据，不同的数据可以通过不同的URI来区分，避免数据的相互干扰。

## 示例介绍
示例模拟了一个场景：

项目中存放了一些 jsonConfig 后缀的文件，内容是 json 格式的数据，这些 config 中存放了虚拟数据库的连接配置文件，比如说 UserName, Token 等。

然后在编辑器打开这个文件时，需要通过配置文件去请求远程数据，然后把远程返回的数据通过自定义 MonacoEditor 展示给用户。