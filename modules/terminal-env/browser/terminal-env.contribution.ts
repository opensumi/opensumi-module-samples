import {
  ClientAppContribution,
  Domain,
} from '@opensumi/ide-core-browser';
import { Autowired, INJECTOR_TOKEN, Injector } from '@opensumi/di';
import { ICreateTerminalOptions, ITerminalClientFactory2, ITerminalProfileInternalService, IWidget } from '@opensumi/ide-terminal-next';
import { TerminalClientFactory } from '@opensumi/ide-terminal-next/lib/browser/terminal.client';

export function createTerminalClientFactory(injector: Injector) {
  return async (widget: IWidget, options?: ICreateTerminalOptions) => {

    const defaultTerminalEnvironmentVariables = {
      CUSTOM_ENV_VARIABLE: 'CUSTOM_ENV_VARIABLE',
    };
    const terminalOptions: ICreateTerminalOptions = options || {};

    terminalOptions.config = {
      profileName: 'terminal.type',
      ...terminalOptions.config,
      env: {
        ...terminalOptions.config?.env,
        ...defaultTerminalEnvironmentVariables,
      },
    };

    return TerminalClientFactory.createClient2(injector, widget, terminalOptions);
  };
}

@Domain(ClientAppContribution)
export class TerminalEnvContribution implements ClientAppContribution {
  @Autowired(INJECTOR_TOKEN)
  private injector: Injector;

  initialize() {
    this.injector.overrideProviders(
      {
        token: ITerminalClientFactory2,
        useFactory: createTerminalClientFactory,
      },
    )
  }
}
