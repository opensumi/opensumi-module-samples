import { Provider, Injectable } from '@opensumi/di';
import { BrowserModule } from '@opensumi/ide-core-browser';

import { EditorTitleSampleContribution } from './editor-title.contribution';

@Injectable()
export class EditorTitleSampleModule extends BrowserModule {
  providers: Provider[] = [
    EditorTitleSampleContribution
  ];
}
