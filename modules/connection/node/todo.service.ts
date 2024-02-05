import { Injectable } from '@opensumi/di';
import { RPCService } from '@opensumi/ide-connection';

import { ITodoNodeService } from '../common';

@Injectable()
export class TodoNodeService extends RPCService implements ITodoNodeService {
  showMessage = (message: string) => {
    // 这里的 client 可以直接获取到通信通道下的 proxy 实例
    this.client.onMessage(`I got you message, echo again. ${message}`);
  };
}
