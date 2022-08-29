import { Domain } from '@opensumi/ide-core-common';

import { ComponentContribution, ComponentRegistry, ComponentRegistryInfo, SlotLocation, SlotRendererContribution, SlotRendererRegistry } from '@opensumi/ide-core-browser';
import { TestToolbar } from './test.view';
import { TopSlotRenderer } from './top-slot';

@Domain(ComponentContribution)
export class TestContribution implements ComponentContribution {
  registerComponent(registry: ComponentRegistry) {
    registry.register(
      'test-toolbar',
      [
        {
          id: 'test-toolbar',
          component: TestToolbar,
          name: '测试'
        }
      ],
      {
        containerId: 'test-toolbar'
      }
    );
  }
}

// 通过 SlotRendererContribution 替换顶部的 SlotRenderer，将默认的上下平铺模式改成横向的 flex 模式：
@Domain(SlotRendererContribution)
export class TestToolbarSlotContribution implements SlotRendererContribution {
  registerRenderer(registry: SlotRendererRegistry) {
    registry.registerSlotRenderer(SlotLocation.top, TopSlotRenderer);
  }
}
