import { Provider, Injectable } from '@opensumi/di';
import { BrowserModule } from '@opensumi/ide-core-browser';
import { BuiltinEventsContribution } from './builtin-events.contribution';
import { BuiltinEventService } from './builtin-events.service';


@Injectable()
export class BuitinEventsSampleModule extends BrowserModule {
  providers: Provider[] = [
    {
      token: BuiltinEventService,
      useClass: BuiltinEventService,
    },
    BuiltinEventsContribution,
  ];
}
