# BookStack

## 项目介绍

    这是一个基于React的小说App，大部分基于番茄小说实现，但是还有一部分添加了我自己的创意

## 技术栈

- React全家桶
    - React组件
        1. 组件封装
        2. 第三方组件库React-vant
        3. 自定义hooks和内置hooks
    - React-Router-Dom 路由配置
        1. 路由守卫
        2. 路由懒加载
        3. 动态路由
        4. 嵌套路由
    - React状态管理
        1. Zustand 全局状态管理
        2. Mitt 发布-订阅模式，主要用来处理主题黑夜和白昼的切换
    - React动画
        1. framer-motion 组件动画

- Mockjs 模拟数据

- vite-plugin-mock 随机生成后端的数据

- axios 请求拦截和登录

- JWT 登录验证

- postcss + lib-flexible： 自动适配所有移动端，自动更改html的font-size

## 项目的架构

- mock     模拟数据
- public  公共文件
- api      接口
- assets    静态资源
- components   组件
- hooks    自定义hooks
- llm      用来连接大模型
- pages    页面
- store    状态管理
- utils    工具类
- App.jsx  入口文件
- main.jsx  主入口文件
- .env.local  环境变量配置文件
- index.html  根文件
- package.json  包管理文件
- postcss.config.js  postcss配置文件
- vite.config.ts  vite配置文件

## 开发前的准备

- 安装的依赖
    - 生产依赖(都用`pnpm i ...`进行安装)
        1. @react-vant/icons
        2. axios
        3. lib-flexible
        4. mitt
        5. mockjs
        6. react-router-dom
        7. react-vant
        8. zustand
    - 生产依赖(都用`pnpm i -D ...` 进行安装)
        1. jwt
        2. postcss
        3. postcss-pxtorem
        4. vite-plugin-mock

- vite配置
    - 配置postcss
        1. 安装postcss-pxtorem
        2. 配置postcss.config.js (该项目基于1rem=75px进行设计)
    - 配置vite-plugin-mock
        1. 安装vite-plugin-mock
        2. 配置vite.config.ts(进行全局配置，可以把mock当成后端获取数据)
    - 配置全局路径
        1. 将`src`替换成`@`方便之后不同文件之间的导入和导出

- user-scalable=no  移动端不缩放

- git 提交规范