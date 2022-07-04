import { Provider, Injectable } from '@opensumi/di';
import { BrowserModule } from '@opensumi/ide-core-browser';

import { AntdComponentsContribution } from './components.contribution';

@Injectable()
export class AntdComponentsSampleModule extends BrowserModule {
  providers: Provider[] = [
    AntdComponentsContribution
  ];
}
