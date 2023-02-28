import { Provider, Injectable } from '@opensumi/di';
import { BrowserModule } from '@opensumi/ide-core-browser';
import { CustomViewContribution } from './custom-view.contribution';

@Injectable()
export class CustomViewModule extends BrowserModule {
  providers: Provider[] = [
    CustomViewContribution,
  ];
}
