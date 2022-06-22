import { Provider, Injectable } from '@opensumi/di';
import { BrowserModule } from '@opensumi/ide-core-browser';

import { ComponentsContribution } from './components.contribution';

@Injectable()
export class ComponentsSampleModule extends BrowserModule {
  providers: Provider[] = [
    ComponentsContribution
  ];
}
