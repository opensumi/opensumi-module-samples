## Using OpenSumi's Monaco Editor in a Custom Editor Component

This example demonstrates how to use OpenSumi's Monaco Editor in a custom editor component through an example of using OpenSumi's Monaco Editor in a custom editor component.

## Creating the Editor in React

Use the `EditorCollectionService.createCodeEditor` method to create the editor. This method accepts an `HTMLElement` object as a parameter, and the editor will be created within that `HTMLElement` object.

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

The method returns an `ICodeEditor` object, which provides interfaces related to the editor. However, it is worth noting that ICodeEditor is not Monaco Editor. The specific definition can be found in the relevant code.

```typescript
export interface ICodeEditor extends IEditor, IDisposable {
  layout(): void;

  /**
   * Open a document
   * @param uri
   */
  open(documentModelRef: IEditorDocumentModelRef, range?: IRange): void;

  focus(): void;

  onCursorPositionChanged: Event<CursorStatus>;

  onRefOpen: Event<IEditorDocumentModelRef>;
}
```

## Using IEditorDocumentModelContentProvider to Provide Data for the Editor

To provide data for the editor, implement the IEditorDocumentModelContentProvider, which can use:

```typescript

async provideEditorDocumentModelContent(uri: URI, encoding?: string | undefined): Promise<string> {
    // fetch data
  }
```

to asynchronously fetch data. Different data can be distinguished by different URIs to avoid interference with each other.

## Example Introduction

The example simulates a scenario:

Some jsonConfig files are stored in the project, and the content is in json format. These configs store connection configuration files for the virtual database, such as UserName, Token, etc.

When the editor opens this file, it needs to request remote data through the configuration file, and then display the data returned by the remote through the custom MonacoEditor to the user.
