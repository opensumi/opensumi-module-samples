import { Provider, Injectable, Autowired } from '@opensumi/di';

import {
  BrowserModule,
  CommandContribution,
  CommandRegistry,
  Domain,
  isWindows,
} from '@opensumi/ide-core-browser';
import { IMessageService } from '@opensumi/ide-overlay';

import { ITerminalController } from '@opensumi/ide-terminal-next';

@Domain(CommandContribution)
class TerminalContribution implements CommandContribution {
  @Autowired(ITerminalController)
  protected readonly terminalController: ITerminalController;

  @Autowired(IMessageService)
  private readonly messageService: IMessageService;

  async echoHelloWorld() {
    const client = await this.terminalController.createTerminalWithWidget({
      config: {
        name: 'Something',
        executable: 'bash',
        args: ['-c', 'echo Hello World'],
      },
    });

    client.onOutput(output => {
      console.log(output);
    });
    client.onExit(exit => {
      this.messageService.info(`Terminal exited with code ${exit.code}`);
      client.term.writeln('Terminal exited with code ' + exit.code);
      client.term.writeln('Hello from the other side.');
    });
  }

  async installDependencies() {
    const client = await this.terminalController.createTerminal({
      config: { name: 'Install Dependencies' },
    });

    this.terminalController.showTerminalPanel();

    await client.attached.promise;
    const returnChar = isWindows ? '\r\n' : '\n';
    const command = 'npm install' + returnChar;

    await client.sendText(command);
    client.onOutput(output => {
      console.log(output);
    });
  }

  registerCommands(commands: CommandRegistry): void {
    commands.registerCommand(
      {
        id: 'opensumi-terminal-usage:echo-hello-world',
        label: "Echo 'Hello World' In Terminal",
      },
      {
        execute: () => {
          this.echoHelloWorld();
        },
      }
    );
    commands.registerCommand(
      {
        id: 'opensumi-terminal-usage:install-dependencies',
        label: 'Install Dependencies In Terminal',
      },
      {
        execute: () => {
          this.installDependencies();
        },
      }
    );
  }
}

@Injectable()
export class TerminalBasicUsageModule extends BrowserModule {
  providers = [TerminalContribution];
}
