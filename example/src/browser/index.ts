import '@opensumi/ide-i18n/lib/browser';
import { defaultConfig } from '@opensumi/ide-main-layout/lib/browser/default-config';
import { renderApp } from './render-app';
import { CommonBrowserModules } from './common-modules';

import { SlotLocation } from '@opensumi/ide-core-browser';
import { TodoListModule } from 'modules/connection/browser';
import { TerminalEnvModule } from 'modules/terminal-env/browser';
import { ComponentsSampleModule } from 'modules/components/browser';
import { AntdComponentsSampleModule } from 'modules/use-antd/browser';
import { EditorTitleSampleModule } from 'modules/editor-title/browser';
import { WelcomeContentSampleModule } from 'modules/add-welcome-content/browser';
import { TogglePanelSampleModule } from 'modules/toggle-panel/browser';

import './i18n';
import './styles.less';

import '@opensumi/ide-core-browser/lib/style/index.less';
import '@opensumi/ide-core-browser/lib/style/icon.less';
import { CustomToolbarLayout } from 'modules/custom-toolbar/browser/custom-layout';
import { CustomToolbarModule } from 'modules/custom-toolbar/browser';
import { BuitinServicesSampleModule } from 'modules/builtin-services/browser';
import { CustomEditorEmptyComponentModule } from 'modules/editor-empty-component/browser';
import { CustomContextMenuModule } from 'modules/custom-context-menu/browser';
// import { DefaultLayout } from '@opensumi/ide-core-browser/lib/components';
import { CustomViewModule } from 'modules/custom-view/browser';

renderApp({
  modules: [
    ...CommonBrowserModules,
    TodoListModule,
    TerminalEnvModule,
    ComponentsSampleModule,
    AntdComponentsSampleModule,
    EditorTitleSampleModule,
    WelcomeContentSampleModule,
    TogglePanelSampleModule,
    CustomToolbarModule,
    BuitinServicesSampleModule,
    CustomEditorEmptyComponentModule,
    CustomViewModule,
    CustomContextMenuModule,
  ],
  layoutConfig: {
    ...defaultConfig,
    ...{[SlotLocation.top]: {
      modules: ['@opensumi/ide-menu-bar', 'test-toolbar'],
    }},
    'customAction': {
      modules: ['test-toolbar']
    },
  },
  useCdnIcon: false,
  useExperimentalShadowDom: false,
  defaultPreferences: {
    'general.theme': 'opensumi-dark',
    'general.icon': 'vscode-icons',
  },
  defaultPanels: {
    'bottom': '@opensumi/ide-terminal-next',
    'right': '',
  },
  // layoutComponent: DefaultLayout,
  // 引入 custom-toolbar 自定义视图时，需要自定义布局组件，可以基于 DefaultLayout 进行拓展
  layoutComponent: CustomToolbarLayout,
});
