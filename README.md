# React Native APP Template

这是一份开箱即用，采用最新 React Native 版本 并且包含一些常用依赖的 APP 模版。

主要目的是为了能够统一并且快速构造出基本的 APP 应用

## 主要功能

- 热更新，采用 react native code push v5.6.2，并且做了一些 hack，应该不支持 Hermes
- 基本路由，采用 react navigation v5
- 友盟移动统计
- TypeScript 类型定义，并且会在 git commit 前进行检查
- 本地开发时， 数据 mock
- 一定程度上的自定义主题
- 诸多常用组件，并且部分组件已支持 dark mode
- 数据状态本地持久化，搭配 usePersistAlert 可以进行时限校验
- 根据设备屏幕大小，进行尺寸适配的 utils

## 关于路由

根据 React Navigation v5 文档，总结出了一种这个路由框架的使用方式：

- 每个 screen 的路由地址，都需要在 routes 中进行配置(Routes)，并且需要定义这个路由的参数类型(ParamList)
- 一个包含诸多 screen 的模块，在 pages 里体现为一个文件夹，并导出包含这些 screen 的 StackNavigation 配置数组

## 关于组件

部分组件是根据@ant-design/react-native 改造完成，大部分组件已经支持主题色，主题定义在 Theme 中，已有 demo

## TODO

- 构造合理得用于布局的公用组件，类似 ant design Space，但希望比它更实用
- 继续完成未完成组件
- 完善主题自定义, 目前最好不要使用 config/theme.ts
- 引入 ESLint
- 发布公用组件到 npm 上
