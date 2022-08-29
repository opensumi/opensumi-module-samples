import { Provider, Injectable } from '@opensumi/di';
import { BrowserModule } from '@opensumi/ide-core-browser';
import { TestContribution, TestToolbarSlotContribution } from './test.contribution';

@Injectable()
export class CustomToolbarModule extends BrowserModule {
  providers: Provider[] = [
    TestContribution,
    TestToolbarSlotContribution,
  ];
}
