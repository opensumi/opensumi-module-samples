import { Provider, Injectable } from '@opensumi/di';
import { NodeModule } from '@opensumi/ide-core-node';

import { ITodoNodeService, ITodoConnectionServerPath } from '../common';
import { TodoNodeService } from './todo.service';

@Injectable()
export class TodoListModule extends NodeModule {
  providers: Provider[] = [
    {
      token: ITodoNodeService,
      useClass: TodoNodeService,
    },
  ];

  backServices = [
    {
      servicePath: ITodoConnectionServerPath, // 双端通信通道唯一路径
      token: ITodoNodeService, // 关联后端服务
    },
  ];
}
