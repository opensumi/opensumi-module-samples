import { Provider, Injectable } from '@opensumi/di';
import { BrowserModule } from '@opensumi/ide-core-browser';

import { TerminalEnvContribution } from './terminal-env.contribution';

@Injectable()
export class TerminalEnvModule extends BrowserModule {
  providers: Provider[] = [
    TerminalEnvContribution
  ];
}
