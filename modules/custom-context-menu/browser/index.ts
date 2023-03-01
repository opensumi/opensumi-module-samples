import { Provider, Injectable } from '@opensumi/di';
import { BrowserModule } from '@opensumi/ide-core-browser';
import { CustomContextMenuContribution } from './index.contribution';

@Injectable()
export class CustomContextMenuModule extends BrowserModule {
  providers: Provider[] = [
    CustomContextMenuContribution,
  ];
}
