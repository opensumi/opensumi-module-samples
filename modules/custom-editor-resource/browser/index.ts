import { Provider, Injectable } from '@opensumi/di';
import { BrowserModule } from '@opensumi/ide-core-browser';

import { CustomEditorResourceContribution } from './custom-editor-resource.contribution';

@Injectable()
export class CustomEditorResourceModule extends BrowserModule {
  providers: Provider[] = [
    CustomEditorResourceContribution,
  ];
}
