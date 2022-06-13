## 预览效果

![preview](https://img.alicdn.com/imgextra/i4/O1CN01nXhvXs1w1dNdDHaGO_!!6000000006248-2-tps-1250-881.png)

需要注意的是，这里通过 `ClientAppContribution` 声明周期的去修改终端环境变量的方式在终端恢复场景下可能会有时序问题导致失效，最佳的方式还是在应用启动前将相关环境变量逻辑进行覆盖，合适的代码位置如[render-app.ts#L11](https://github.com/opensumi/opensumi-module-samples/blob/main/example/src/browser/render-app.ts#L11)

可以在下面的位置追加如下逻辑：

```ts
injector.overrideProviders(
  {
    token: ITerminalClientFactory2,
    useFactory: createTerminalClientFactory,
  },
)
```