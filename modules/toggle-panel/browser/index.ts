import { Provider, Injectable } from '@opensumi/di';
import { BrowserModule } from '@opensumi/ide-core-browser';

import { TogglePanelSampleContribution } from './toggle-panel.contribution';

@Injectable()
export class TogglePanelSampleModule extends BrowserModule {
  providers: Provider[] = [
    TogglePanelSampleContribution
  ];
}
