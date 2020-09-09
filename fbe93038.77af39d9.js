(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{71:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return c})),n.d(t,"metadata",(function(){return s})),n.d(t,"rightToc",(function(){return i})),n.d(t,"default",(function(){return p}));var o=n(1),r=n(6),a=(n(0),n(75)),c={id:"testing",title:"Testing"},s={unversionedId:"testing",id:"testing",isDocsHomePage:!1,title:"Testing",description:"Like @nestjs/mongoose (see the testing section) nestjs-typegoose's forFeature and forRoot rely on a database connection to work. To unit test your CatService without connecting to a mongo database you need to create a fake model using a custom provider.",source:"@site/docs/testing.md",slug:"/testing",permalink:"/nestjs-typegoose/docs/testing",editUrl:"https://github.com/kpfromer/nestjs-typegoose/edit/master/website/docs/testing.md",version:"current",sidebar:"someSidebar",previous:{title:"Basic Usage",permalink:"/nestjs-typegoose/docs/usage"},next:{title:"FAQ",permalink:"/nestjs-typegoose/docs/faq"}},i=[],u={rightToc:i};function p(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(a.b)("wrapper",Object(o.a)({},u,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,"Like ",Object(a.b)("a",Object(o.a)({parentName:"p"},{href:"https://docs.nestjs.com/v5/techniques/mongodb"}),"@nestjs/mongoose")," (see the testing section) nestjs-typegoose's ",Object(a.b)("inlineCode",{parentName:"p"},"forFeature")," and ",Object(a.b)("inlineCode",{parentName:"p"},"forRoot")," rely on a database connection to work. To unit test your ",Object(a.b)("inlineCode",{parentName:"p"},"CatService")," without connecting to a mongo database you need to create a fake model using a ",Object(a.b)("a",Object(o.a)({parentName:"p"},{href:"https://docs.nestjs.com/fundamentals/custom-providers"}),"custom provider"),"."),Object(a.b)("pre",null,Object(a.b)("code",Object(o.a)({parentName:"pre"},{className:"language-typescript"}),"import { getModelToken } from \"nestjs-typegoose\";\n\n@Module({\n  ProductService,\n  {\n    provide: getModelToken('Product'),\n    useValue: fakeProductModel\n  }\n})\n")),Object(a.b)("p",null,"In a spec file this would look like:"),Object(a.b)("pre",null,Object(a.b)("code",Object(o.a)({parentName:"pre"},{className:"language-typescript"}),'\nconst fakeProductModel = jest.fn();\n\nconst module: TestingModule = await Test.createTestingModule({\n  providers: [\n    {\n      provide: getModelToken("Product"),\n      useValue: fakeProductModel\n    },\n    ProductService\n  ]\n}).compile();\n')),Object(a.b)("p",null,"The string given to ",Object(a.b)("inlineCode",{parentName:"p"},"getModelToken")," function should be the class name of the typegoose model that you are testing."))}p.isMDXComponent=!0},75:function(e,t,n){"use strict";n.d(t,"a",(function(){return l})),n.d(t,"b",(function(){return m}));var o=n(0),r=n.n(o);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var u=r.a.createContext({}),p=function(e){var t=r.a.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):s({},t,{},e)),n},l=function(e){var t=p(e.components);return r.a.createElement(u.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},b=Object(o.forwardRef)((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,c=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),l=p(n),b=o,m=l["".concat(c,".").concat(b)]||l[b]||d[b]||a;return n?r.a.createElement(m,s({ref:t},u,{components:n})):r.a.createElement(m,s({ref:t},u))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,c=new Array(a);c[0]=b;var s={};for(var i in t)hasOwnProperty.call(t,i)&&(s[i]=t[i]);s.originalType=e,s.mdxType="string"==typeof e?e:o,c[1]=s;for(var u=2;u<a;u++)c[u]=n[u];return r.a.createElement.apply(null,c)}return r.a.createElement.apply(null,n)}b.displayName="MDXCreateElement"}}]);