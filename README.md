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

- 瀑布屏 + 无限滚动 + 图片懒加载
    类型小红书和番茄小说的特点，每个书籍的高度不一致，给人一种视差的效果，所以我就使用了瀑布屏的效果
    一开始是直接编号为奇数的图片放在左边，编号为偶数的图片放在右边，这样就可以实现瀑布屏的效果了，但是这样会出现一个问题，就是当左边一直都是高的，右边一直都是矮的，这样就会当没有新的图片加载的时候右边部分会有残缺。
    解决方法：
        我是用了useState分别记录他们的高度和对应的书籍的相关内容，当我加载新的图片的时候，我就判断一下当前图片的高度和之前图片的高度，这样就可以知道当前图片是放在左边还是右边了，然后我就可以将当前图片的高度和书籍存储在对应的useState中，这样就可以实现瀑布屏的效果了。
    无限滚动和图片懒加载都是使用了IntersectionObserver来监听对应的元素
    无限滚动是监听页面最下面的元素，当它进入视口的时候，就会触发回调函数，然后就会加载新的图片
    图片懒加载是监听图片元素，当图片元素进入视口的时候，就会触发回调函数，然后就会将图片的src属性设置为图片的真实地址，这样就可以显示图片了
    组件卸载时，直接使用disconnect 释放资源，防止内存泄漏



## 性能优化

- 图片懒加载
    1. 优化点：当我刷新页面的时候，图片会加载不出来，因为图片是懒加载的，所以当我刷新页面的时候，图片还没有加载出来，所以会显示不出来
    2. 使用方法：使用IntersectionObserver，在图片加载完成之后，将图片的src属性设置为图片的真实地址，这样就可以显示图片了

## 用户体验



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

- Tabbar 组件遮挡页面内容
    从React-vant的Tabbar组件的文档中可以知道，Tabbar组件是固定在底部的，所以当页面内容比较多的时候，会遮挡页面内容，解决方法是：
    1. 给Tabbar组件添加一个`fixed={true}` 和`placeholder="true"`
    2. 给Outlet组件添加一个`overflow: auto;`这样就不会出现遮挡的问题了

- "Too many re-renders"（过多重新渲染）
    直接在渲染过程中使用了setState，导致了无限循环的问题，然后一直在加载数据
    解决方法：
    1. 避免在渲染过程中直接调用setState
    2. 使用useEffect来处理副作用

- unobserve 与 disconnect
    1. unobserve 取消对图片的监听，防止内存泄漏
    2. disconnect 取消对所有图片的监听，防止内存泄漏
    所以在合适的位置选择合适的函数，比如监听加载更多时，使用disconnect，图片加载完成后，使用unobserve


- Mock.Random.image生成的图片是随机的但是他总是会有水印
    解决方法：
    1. 不使用Mock.Random.image生成图片
    2. 使用Lorem Picsum服务生成图片