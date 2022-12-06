import { Autowired, Injectable } from '@opensumi/di';
import { RPCService } from '@opensumi/ide-connection/lib/common/proxy';
import { IMessageService } from '@opensumi/ide-overlay';
import { Emitter, IContextKeyService, IQuickInputService } from '@opensumi/ide-core-browser';

import { ITodo, ITodoConnectionServerPath, ITodoNodeService, ITodoService, TODO_CONTEXT_MENU_ID } from '../common';
import { AbstractContextMenuService, ICtxMenuRenderer } from '@opensumi/ide-core-browser/lib/menu/next';

@Injectable()
export class TodoService extends RPCService implements ITodoService {
  @Autowired(IMessageService)
  private readonly messageService: IMessageService;

  @Autowired(ITodoConnectionServerPath)
  private readonly todoNodeService: ITodoNodeService;

  @Autowired(IQuickInputService)
  private readonly quickInputService: IQuickInputService;

  @Autowired(AbstractContextMenuService)
  private readonly contextMenuService: AbstractContextMenuService;

  @Autowired(IContextKeyService)
  private readonly contextKeyService: IContextKeyService;

  @Autowired(ICtxMenuRenderer)
  private readonly ctxMenuRenderer: ICtxMenuRenderer;

  private onDidChangeEmitter: Emitter<string> = new Emitter();

  get onDidChange() {
    return this.onDidChangeEmitter.event;
  }

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

  handleContextMenu = (ev: React.MouseEvent, item?: ITodo) => {
    ev.stopPropagation();
    ev.preventDefault();

    const menus = this.contextMenuService.createMenu({
      id: TODO_CONTEXT_MENU_ID,
      contextKeyService: this.contextKeyService,
    });
    const menuNodes = menus.getMergedMenuNodes();
    menus.dispose();

    const { x, y } = ev.nativeEvent;

    this.ctxMenuRenderer.show({
      anchor: { x, y },
      menuNodes,
      args: [item],
    });
  };
}
