import { Autowired, Injectable } from '@opensumi/di';
import { RPCService } from '@opensumi/ide-connection/lib/common/proxy';
import { IMessageService } from '@opensumi/ide-overlay';
import { Emitter, IQuickInputService } from '@opensumi/ide-core-browser';

import { ITodoConnectionServerPath, ITodoNodeService, ITodoService } from '../common';

@Injectable()
export class TodoService extends RPCService implements ITodoService {
  @Autowired(IMessageService)
  private readonly messageService: IMessageService;

  @Autowired(ITodoConnectionServerPath)
  private readonly todoNodeService: ITodoNodeService;

  @Autowired(IQuickInputService)
  private readonly quickInputService: IQuickInputService;

  private onDidChangeEmitter: Emitter<string> = new Emitter();

  addTodo = async () => {
    const param = await this.quickInputService.open({
      placeHolder: '输入你的计划',
      value: ''
    });
    if (param !== undefined && param !== null) {
      this.onDidChangeEmitter.fire(param);
    }
  };

  // 展示消息时调用后端服务
  showMessage = (message: string) => {
    this.messageService.info(message);
    this.todoNodeService.showMessage(message);
  };

  // 接收后端消息
  onMessage = (message: string) => {
    this.messageService.info(message);
  };
}
