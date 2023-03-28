# opensumi-modue-samples

Sample code illustrating the OpenSumi modules.

## Run
```shell
npm i
npm run start
```
open [http://localhost:8080/](http://localhost:8080/).

## LAN Connect
Need to modify example/configs/webpack.browser.config.js
``` javascript
{
  host: '0.0.0.0',
  disableHostCheck: true,
}
```

## Samples

| Sample | API & Documentation |
| ------ | ----- |
|[Connection Sample](https://github.com/opensumi/opensumi-modue-samples/tree/main/modules/connection) | [connection-between-browser-and-node](https://opensumi.com/en/docs/develop/sample/connection-between-browser-and-node) |
|[Custom Terminal Env Sample](https://github.com/opensumi/opensumi-modue-samples/tree/main/modules/terminal-env) | Add custom Terminal enviroment variables |
|[Use Antd Components](https://github.com/opensumi/opensumi-modue-samples/tree/main/modules/use-antd) | [Use OpenSumi antd theme](https://github.com/opensumi/antd-theme) |
|[Welcome page](https://github.com/opensumi/opensumi-modue-samples/tree/main/modules/use-antd) | Create your welcome page |
|[Editor Title Actions](https://github.com/opensumi/opensumi-modue-samples/tree/main/modules/editor-title) | Create Editor Title Actions |
|[Use OutputChannel](https://github.com/opensumi/opensumi-modue-samples/tree/main/modules/editor-title) | Logging message on Output panel |
|[Register Menu on EditorTitle](https://github.com/opensumi/opensumi-modue-samples/tree/main/modules/editor-title) | Register Menu on EditorTitle |
|[Add Welcome Content](https://github.com/opensumi/opensumi-modue-samples/tree/main/modules/add-welcome-content) | How to add new welcome content |
|[i18n in modules](https://github.com/opensumi/opensumi-modue-samples/tree/main/example/src/browser/i18n/setup.ts) | How to custom i18n text |
|[Toggle Panel or Sidebar](https://github.com/opensumi/opensumi-modue-samples/tree/main/modules/toggle-panel/browser/toggle-panel.contribution.ts) | Toggle Panel or Sidebar |
|[Custom Extension Marketplace entrypoint](https://github.com/opensumi/opensumi-modue-samples/tree/main/example/src/node/start-server.ts#L18) | Custom Extension Marketplace entrypoint |
|[Custom Layout](https://github.com/opensumi/opensumi-modue-samples/tree/main/modules/custom-toolbar) | [Custom Layout View](https://opensumi.com/zh/docs/integrate/universal-integrate-case/custom-view) |
|[File Opened With Custom Component](https://github.com/opensumi/opensumi-modue-samples/tree/main/modules/use-antd) | - |
|[Basic TreeView](https://github.com/opensumi/opensumi-modue-samples/tree/main/modules/components) | - |
|[Modal API](https://github.com/opensumi/opensumi-module-samples/blob/main/modules/builtin-services/README.md)| How to use IMessageService/IDialogService/IProcessService |
|[Use Custom Menu ID](https://github.com/opensumi/opensumi-module-samples/blob/main/modules/connection/README.md)| - |
|[Add Toolbar Menu](https://github.com/opensumi/opensumi-module-samples/blob/main/modules/connection/README.md)| - |
|[Custom Editor Empty Component](https://github.com/opensumi/opensumi-module-samples/blob/main/modules/editor-empty-component/README.md)| Custom Editor Empty Component |
|[Add Custom View](https://github.com/opensumi/opensumi-module-samples/blob/main/modules/custom-view/README.md)| - |
|[Custom ContextMenu Or Menubar Menu](https://github.com/opensumi/opensumi-module-samples/blob/main/modules/custom-context-menu/README.md)| [Custom Menu](https://opensumi.com/en/docs/integrate/universal-integrate-case/custom-menu) |
|[Use Buitin Components](https://github.com/opensumi/opensumi-modue-samples/tree/main/modules/components) | - |
|[Use Buitin Services](https://github.com/opensumi/opensumi-modue-samples/tree/main/modules/builtin-services) | - |
|[Use Buitin Events](https://github.com/opensumi/opensumi-modue-samples/tree/main/modules/builtin-events) | - |
|[Use Monaco in Custom Editor Components](https://github.com/opensumi/opensumi-modue-samples/tree/main/modules/editor-monaco-component) | - |
