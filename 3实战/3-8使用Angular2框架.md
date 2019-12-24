
# 3-8 使用 Angular2 框架

## 认识 Angular2

[Angular2](https://angular.io) 是 [AngularJS](https://angularjs.org) 的下一个版本，它继承了 AngularJS 中的部分思想又加入了一些新的改进。
Angular2 相比于 React 和 Vue 来说要复杂很多，这三者的出发点都是组件化和数据驱动视图，但 Angular2 多出了以下概念：

- 模块（NgModule）这里的模块不是指 JavaScript 或者其它编程语言里的模块化，而是指 Angular2 里提出的独有的用法。
- 注解（Decorator）通过注解语法 `@XXX` 来给一个 Class 附加元数据。
- 服务（Service）按照功能划分，把项目中可复用的重复代码封装成一个个服务以方便给其它模块使用。服务可以包含函数、常值等，常见的有日志服务、数据服务、应用程序配置等。
- 依赖注入（Dependency Injection）也叫控制反转（Inversion of Control），是面向对象编程中的一种设计原则，可以用来减低代码之间的耦合度。

Angular2 引入的这些思想都是为了分解和简化大型项目的难度，但对于开发小项目来说这些可能都是累赘，对于初学者来说可能会难以掌握。
在语言选择上虽然 Angular2 官方对 TypeScript 和 JavaScript 都提供了支持，但通常选择 Angular2 的项目都会使用 TypeScript，
原因在于 Angular2 本身就是使用 TypeScript 开发，在项目中使用 TypeScript 相比 JavaScript 开发体验会好很多。



想深入学习 Angular2，推荐《迈向Angular 2：基于TypeScript的高性能SPA框架》：



看到这你可能会被 Angular2 的复杂所吓到，先来看看如何用 Angular2 来开发 `Hello,Webpack`。

这个应用只有一个视图组件 `AppComponent` 用于渲染 `Hello,Webpack`，组件代码如下：

```
import {Component} from &amp;apos@angular/core&amp;apos;

// 通过注解的方式描述清楚了这个视图组件所需的模版、样式、数据、逻辑。
@Component({
  // 标签名称
  selector: &amp;aposapp-root&amp;apos,
  // HTML 模版
  template: &amp;apos&lt;h1&gt;{{msg}}&lt;/h1&gt;&amp;apos,
  // CSS 样式
  styles: [&amp;aposh1{ color:red; }&amp;apos]
})
export class AppComponent {
  msg = &amp;aposHello,Webpack&amp;apos;
}

```

光有组件还不够，还需要实例化 `AppComponent` 视图组件，并把它渲染到 DOM 中去。Angular2 规定可运行的应用至少有一个 NgModule 也就是需要一个根 NgModule。
这个根 NgModule 描述了如何启动应用，代码如下：

```
// 让 Angular2 正常运行需要的 polyfill
import &amp;aposcore-js/es6/reflect&amp;apos;
import &amp;aposcore-js/es7/reflect&amp;apos;
import &amp;aposzone.js/dist/zone&amp;apos;
// Angular2 框架核心模块
import {NgModule} from &amp;apos@angular/core&amp;apos;
import {BrowserModule} from &amp;apos@angular/platform-browser&amp;apos;
import {platformBrowserDynamic} from &amp;apos@angular/platform-browser-dynamic&amp;apos;
// 项目自定义视图组件
import {AppComponent} from &amp;apos./app.component&amp;apos;

@NgModule({
  // 声明该 NgModule 所依赖的组件、指令、管道
  declarations: [AppComponent],
  // 该 NgModule 所依赖的其它 NgModule
  imports: [BrowserModule],
  // 应用的根视图组件，只有根 NgModule 需要设置
  bootstrap: [AppComponent]
})
class AppModule {
}

// 从 AppModule 启动应用
platformBrowserDynamic().bootstrapModule(AppModule);

```

Angular2 应用启动后会去解析当前 DOM 树，找出名叫 `app-root` 的 HTML 标签，然后以这个找出的标签为 Angular2 应用的运行容器。
为此还需要改造 `index.html` 文件，插入 `app-root` HTML 标签，代码如下：

```
&lt;html&gt;
&lt;head&gt;
  &lt;meta charset="UTF-8"&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;app-root&gt;&lt;/app-root&gt;
&lt;!--导入 Webpack 输出的 JavaScript 文件--&gt;
&lt;script src="./dist/bundle.js"&gt;&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;

```

要让 `Hello,Webpack` 跑起来，需要安装以下模块：

```
# Angular2 框架基础核心模块
npm i -S @angular/core @angular/common
# Angular2 框架浏览器环境运行库，类似于 react-dom
npm i -S @angular/platform-browser 
# 要让 Angular2 正常跑起来所依赖的运行环境和 polyfill
npm i -S core-js rxjs zone.js 
# 在浏览器里运行过程中动态的编译 HTML 模版
npm i -S @angular/platform-browser-dynamic @angular/compiler

```

以上是一个最小的能正常运行的 Angular2 应用，可见 Angular2 的依赖很多，使用繁杂。

## 接入 Webpack

由于 Angular2 应用采用 TypeScript 开发，构建和前面讲过的[(3.2 使用 TypeScript 语言](3-2使用TypeScript语言.html) 类似，不同在于 `tsconfig.json` 配置。
由于 Angular2 项目中采用了注解的语法，而且 `@angular/platform-browser` 源码中有许多 DOM 操作，配置需要修改为如下：

```
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "sourceMap": true,
    // 开启对 注解 的支持
    "experimentalDecorators": true,
    // Angular2 依赖新的 JavaScript API 和 DOM 操作
    "lib": [
      "es2015",
      "dom"
    ]
  },
  "exclude": [
    "node_modules/*"
  ]
}

```

其它配置保持和在[3.2 使用 TypeScript 语言](3-2使用TypeScript语言.html)的一致，安装好前面提到的 Angular2 框架依赖的模块后，重新执行构建打开网页，你会看到由 Angular2 渲染出来的 `Hello,Webpack`。

> 
本实例[提供项目完整代码](http://webpack.wuhaolin.cn/3-8使用Angular2框架.zip)


#  results matching ""

# No results matching ""
