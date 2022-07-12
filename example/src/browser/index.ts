import '@opensumi/ide-i18n/lib/browser';
import { defaultConfig } from '@opensumi/ide-main-layout/lib/browser/default-config';
import { renderApp } from './render-app';
import { CommonBrowserModules } from './common-modules';

import '@opensumi/ide-core-browser/lib/style/index.less';
import '@opensumi/ide-core-browser/lib/style/icon.less';
import { SlotLocation } from '@opensumi/ide-core-browser';

import './styles.less';
import { TodoListModule } from 'modules/connection/browser';
import { TerminalEnvModule } from 'modules/terminal-env/browser';
import { ComponentsSampleModule } from 'modules/components/browser';
import { AntdComponentsSampleModule } from 'modules/use-antd/browser';
import { EditorTitleSampleModule } from 'modules/editor-title/browser';
import { WelcomeContentSampleModule } from 'modules/add-welcome-content/browser';

renderApp({
  modules: [
    ...CommonBrowserModules,
    TodoListModule,
    TerminalEnvModule,
    ComponentsSampleModule,
    AntdComponentsSampleModule,
    EditorTitleSampleModule,
    WelcomeContentSampleModule,
  ],
  layoutConfig: {
    ...defaultConfig,
    ...{[SlotLocation.top]: {
      modules: ['@opensumi/ide-menu-bar', 'toolbar'],
    }},
    ...{[SlotLocation.action]: {
      modules: ['@opensumi/ide-toolbar-action'],
  }},
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
});
