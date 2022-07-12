import { Provider, Injectable } from '@opensumi/di';
import { BrowserModule } from '@opensumi/ide-core-browser';

import { WelcomeContentSampleContribution } from './welcome-content.contribution';

@Injectable()
export class WelcomeContentSampleModule extends BrowserModule {
  providers: Provider[] = [
    WelcomeContentSampleContribution
  ];
}
