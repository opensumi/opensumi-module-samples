import { Autowired } from '@opensumi/di';
import { ClientAppContribution } from '@opensumi/ide-core-browser';
import {
  Domain,
} from '@opensumi/ide-core-common';

import { BuiltinEventService } from './builtin-events.service';

@Domain(ClientAppContribution)
export class BuiltinEventsContribution implements ClientAppContribution {
  @Autowired(BuiltinEventService)
  protected readonly eventService: BuiltinEventService;

  async onStart() {
    this.eventService.init();
  }
}
