import { Provider, Injectable } from '@opensumi/di';
import { BrowserModule } from '@opensumi/ide-core-browser';
import { CustomEditorDocumentContentProvider, TokenCustomEditorDocumentContentProvider } from './custom-document-provider';

import { CustomEditorMonacoContribution } from './monaco-services.contribution';

@Injectable()
export class CustomMonacoEditorServicesSampleModule extends BrowserModule {
  providers: Provider[] = [
    CustomEditorMonacoContribution,
    {
      token: TokenCustomEditorDocumentContentProvider,
      useClass: CustomEditorDocumentContentProvider,
    }
  ];
}
