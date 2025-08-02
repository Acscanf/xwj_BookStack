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
        5. jsonwebtoken

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

## 功能模块

- Login组件 登录注册
    1. 登录页面
    2. 登录接口
    3. 登录状态管理
    4. 由于没有真实的后端所以用户名和密码固定为：admin 和 123

- Loading组件 加载中
    当页面加载缓慢的时候，会显示loading页面，当页面加载完成之后，会隐藏loading页面，用的是路由中的Suspense的fallback属性

- MainLayout组件 主布局
    有一个Tabbar组件，有四个选项卡，分别是书城、书架、AI助手、我的，这样对于APP里面可以动态切换路由

- BlankLayout组件 空白布局，没有Tabbar组件




## 项目亮点

- 刷新不跳转
    当我在这个页面刷新之后不会跳转到首页去，在会在当前的页面
    在MainLayout中， useLocation() 监听路由变化

- CSS原子化
    直接在App.css中定义一些常用的CSS样式这样就不用在每个组件中都写了

- CSS模块化
    对于前端来说，我们其实每个组件的样式基本是独立的，除非是全局的样式写在App.css或者是index.css中。所以我们应该将对应的组件的css模块化，命名为`name.module.css` 这样对应组件引入时写`import styles from "./name.modules.css"`就好了，name是你组件对应的名字，然后在对应的div、p、span...里面写`className={styles.name}`就可以引入对应的样式了，这样也不会发生不同组件之间因为命名相同的问题出现样式冲突了。


- 自动适配所有移动端
    使用了postcss + lib-flexible这两个技术
    1. postcss-pxtorem 自动将px转换为rem
    2. lib-flexible 自动根据屏幕宽度设置html的font-size

- 使用了JWT完成了用户登录鉴权
    1. 登录成功后，将token存储在localStorage中
    2. 每次请求都在请求头中携带token
    3. 然后创建了useUserStore保存了用户是否登录的状态
    4. 登录状态管理中，使用了Zustand的中间件，将状态存储在localStorage中
    

## 自定义hooks

- 自定义useTitle
    1. 问题描述：当我刷新页面的时候，页面的标题会变成默认的标题
    2. 问题原因：当我刷新页面的时候，页面的标题会变成默认的标题，因为我没有在刷新页面的时候改变页面的标题
    3. 解决方法：使用useTitle自定义hooks，在每个页面的组件中使用useTitle，传入页面的标题，这样就可以在刷新页面的时候改变页面的标题了


## 项目遇到过什么问题

- Zustand 状态丢失问题
    1. 问题描述：当我刷新页面的时候，Zustand 中的状态会丢失
    2. 问题原因：Zustand 中的状态是存储在内存中的，当页面刷新的时候，内存中的状态就会丢失
    3. 解决方法：使用 Zustand 中的 persist 中间件，将状态存储在 localStorage 中(或者在useUserStore状态管理中直接判断是否存在token，不要固定使用false)