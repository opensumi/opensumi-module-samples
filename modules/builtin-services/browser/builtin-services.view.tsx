import * as React from 'react';
import { Dropdown } from '@opensumi/ide-components/lib/dropdown';
import { Button } from '@opensumi/ide-components'

import * as styles from './builtin-services.module.less';
import { MessageType, ProgressLocation, useInjectable } from '@opensumi/ide-core-browser';
import { IDialogService, IMessageService } from '@opensumi/ide-overlay';
import { IProgressService } from '@opensumi/ide-core-browser/lib/progress';


const Drop = Dropdown as any;

export const BuiltinServicesView = () => {
  const messageService = useInjectable<IMessageService>(IMessageService);
  const progressService = useInjectable<IProgressService>(IProgressService);
  const dialogService = useInjectable<IDialogService>(IDialogService);

  const showProgress = React.useCallback(async () => {
    console.log('showProgress => ');
    progressService.withProgress(
      { location: ProgressLocation.Notification },
      (progress) => new Promise<void>((resolve) => {
        let step = 0;
        progress.report({ message: 'Waiting ...', increment: 0, total: 100 });

        const timer = setInterval(() => {
          progress.report({ message: 'Resolving ...', increment: 10, total: 100 });
          step+=10;
          
          if (step === 100) {
            resolve();
            clearInterval(timer);
          }
        }, 1000);
      }),
    );

  }, [progressService]);

  const showDialog = React.useCallback(async () => {
    const res = await dialogService.open('Hello', MessageType.Info, ['Cancel', 'OK']);
    console.log(`Click ${res}`);
  }, [dialogService])

  const showMessage = React.useCallback((message: string, type: MessageType) => {
    switch(type) {
      case MessageType.Info:
        messageService.info(message);
        break;
      case MessageType.Error:
        messageService.error(message);
        break;
      case MessageType.Warning:
        messageService.warning(message);
        break;
      default:
        messageService.info(message);
        break;
    }
  }, [messageService]);
  
  return (
    <div className={styles.components_wrap}>
      <h1 className={styles.title}>IMessageService: Show Message</h1>
      <Button style={{marginRight: 10}} onClick={() => showMessage('hello', MessageType.Info)}>Show Info Message</Button>
      <Button style={{marginRight: 10}} onClick={() => showMessage('hello', MessageType.Error)}>Show Error Message</Button>
      <Button onClick={() => showMessage('hello', MessageType.Warning)}>Show Warning Message</Button>
      <h1 className={styles.title}>IDialogSerice: Show Dialog</h1>
      <Button onClick={() => showDialog()}>Show Dialog</Button>
      <h1 className={styles.title}>IProgressService: Show Progress</h1>
      <Button onClick={() => showProgress()}>Show Progress</Button>
    </div>
  );
};
