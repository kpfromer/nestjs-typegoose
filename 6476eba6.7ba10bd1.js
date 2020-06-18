(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{146:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return c})),n.d(t,"metadata",(function(){return i})),n.d(t,"rightToc",(function(){return s})),n.d(t,"default",(function(){return p}));var o=n(1),a=n(9),r=(n(0),n(156)),c={id:"usage",title:"Basic Usage"},i={id:"usage",isDocsHomePage:!1,title:"Basic Usage",description:"Check out this example project if you need help.",source:"@site/docs/usage.md",permalink:"/nestjs-typegoose/docs/usage",editUrl:"https://github.com/kpfromer/nestjs-typegoose/edit/master/website/docs/usage.md",sidebar:"someSidebar",previous:{title:"Installation",permalink:"/nestjs-typegoose/docs/install"},next:{title:"Testing",permalink:"/nestjs-typegoose/docs/testing"}},s=[{value:"Connecting to the MongoDB database",id:"connecting-to-the-mongodb-database",children:[]},{value:"Creating a Database Model",id:"creating-a-database-model",children:[]},{value:"Creating the service",id:"creating-the-service",children:[]},{value:"Connecting with the API",id:"connecting-with-the-api",children:[]},{value:"Providing the model for our services",id:"providing-the-model-for-our-services",children:[]}],l={rightToc:s};function p(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(r.b)("wrapper",Object(o.a)({},l,n,{components:t,mdxType:"MDXLayout"}),Object(r.b)("div",{className:"admonition admonition-note alert alert--secondary"},Object(r.b)("div",Object(o.a)({parentName:"div"},{className:"admonition-heading"}),Object(r.b)("h5",{parentName:"div"},Object(r.b)("span",Object(o.a)({parentName:"h5"},{className:"admonition-icon"}),Object(r.b)("svg",Object(o.a)({parentName:"span"},{xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"}),Object(r.b)("path",Object(o.a)({parentName:"svg"},{fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"})))),"note")),Object(r.b)("div",Object(o.a)({parentName:"div"},{className:"admonition-content"}),Object(r.b)("p",{parentName:"div"},"Check out this ",Object(r.b)("a",Object(o.a)({parentName:"p"},{href:"https://github.com/kpfromer/nestjs-typegoose/tree/master/example"}),"example project")," if you need help."))),Object(r.b)("p",null,"You can check out the ",Object(r.b)("inlineCode",{parentName:"p"},"example")," project for more details."),Object(r.b)("p",null,"We will be creating a ",Object(r.b)("inlineCode",{parentName:"p"},"CatsModule"),", a ",Object(r.b)("inlineCode",{parentName:"p"},"Cat")," database model, a ",Object(r.b)("inlineCode",{parentName:"p"},"CatsService"),", and a ",Object(r.b)("inlineCode",{parentName:"p"},"CatsController"),"."),Object(r.b)("h2",{id:"connecting-to-the-mongodb-database"},"Connecting to the MongoDB database"),Object(r.b)("p",null,"First, we will connect to the mongo database using ",Object(r.b)("inlineCode",{parentName:"p"},"TypegooseModule.forRoot"),". We will import the ",Object(r.b)("inlineCode",{parentName:"p"},"CatsModule")," that we will create shortly."),Object(r.b)("p",null,"If you want to have more connections to different databases read about how to do that ",Object(r.b)("a",Object(o.a)({parentName:"p"},{href:"/nestjs-typegoose/docs/multiple-connections"}),"here"),"."),Object(r.b)("p",null,Object(r.b)("strong",{parentName:"p"},"app.module.ts")),Object(r.b)("pre",null,Object(r.b)("code",Object(o.a)({parentName:"pre"},{className:"language-typescript"}),'import { Module } from "@nestjs/common";\nimport { TypegooseModule } from "nestjs-typegoose";\nimport { CatsModule } from "./cat.module.ts";\n\n@Module({\n  imports: [\n    TypegooseModule.forRoot("mongodb://localhost:27017/nest", {\n      useNewUrlParser: true\n    }),\n    CatsModule\n  ]\n})\nexport class ApplicationModule {}\n')),Object(r.b)("p",null,"Here we are connecting to ",Object(r.b)("inlineCode",{parentName:"p"},"mongodb://localhost:27017/nest"),". To learn more about MongoDB URI's see the official ",Object(r.b)("a",Object(o.a)({parentName:"p"},{href:"https://docs.mongodb.com/manual/reference/connection-string/"}),"mongodb article"),"."),Object(r.b)("h2",{id:"creating-a-database-model"},"Creating a Database Model"),Object(r.b)("p",null,"We now need to create a database model that describes the data we want to store. In this case, it will be cats with names. Read more about typegoose ",Object(r.b)("a",Object(o.a)({parentName:"p"},{href:"https://github.com/typegoose/typegoose"}),"here"),"."),Object(r.b)("p",null,Object(r.b)("strong",{parentName:"p"},"cat.model.ts")),Object(r.b)("pre",null,Object(r.b)("code",Object(o.a)({parentName:"pre"},{className:"language-typescript"}),'import { prop } from "@typegoose/typegoose";\n\nexport class Cat {\n  @prop({ required: true })\n  name: string;\n}\n')),Object(r.b)("h2",{id:"creating-the-service"},"Creating the service"),Object(r.b)("p",null,"We need to create a service to handle the business logic of creating, reading, updating, and deleting (CRUD) entires, or cats, in the database."),Object(r.b)("p",null,Object(r.b)("strong",{parentName:"p"},"cats.service.ts")),Object(r.b)("pre",null,Object(r.b)("code",Object(o.a)({parentName:"pre"},{className:"language-typescript"}),'import { Injectable } from "@nestjs/common";\nimport { InjectModel } from "nestjs-typegoose";\nimport { Cat } from "./cat.model";\nimport { ReturnModelType } from "@typegoose/typegoose";\n\n@Injectable()\nexport class CatsService {\n  constructor(\n    @InjectModel(Cat) private readonly catModel: ReturnModelType<typeof Cat>\n  ) {}\n\n  async create(createCatDto: { name: string }): Promise<Cat> {\n    const createdCat = new this.catModel(createCatDto);\n    return await createdCat.save();\n  }\n\n  async findAll(): Promise<Cat[] | null> {\n    return await this.catModel.find().exec();\n  }\n}\n')),Object(r.b)("h2",{id:"connecting-with-the-api"},"Connecting with the API"),Object(r.b)("p",null,"Now we have the service created we need to connect this with the actual API calls. The ",Object(r.b)("inlineCode",{parentName:"p"},"CatsController")," will receive GET and POST requests on the URL ",Object(r.b)("inlineCode",{parentName:"p"},"/cats")," and will get and create cats respectively."),Object(r.b)("p",null,Object(r.b)("strong",{parentName:"p"},"cats.controller.ts")),Object(r.b)("pre",null,Object(r.b)("code",Object(o.a)({parentName:"pre"},{className:"language-typescript"}),'import { Controller, Get, Post, Body } from "@nestjs/common";\nimport { CatsService } from "./cats.service";\nimport { Cat } from "./cats.model.ts";\n\n@Controller("cats")\nexport class CatsController {\n  constructor(private readonly catsService: CatsService) {}\n\n  @Get()\n  async getCats(): Promise<Cat[] | null> {\n    return await this.catsService.findAll();\n  }\n\n  @Post()\n  async create(@Body() cat: Cat): Promise<Cat> {\n    return await this.catsService.create(cat);\n  }\n}\n')),Object(r.b)("h2",{id:"providing-the-model-for-our-services"},"Providing the model for our services"),Object(r.b)("p",null,"We have to make sure we provide the needed models to our service with ",Object(r.b)("inlineCode",{parentName:"p"},"TypegooseModule.forFeature")," for the ",Object(r.b)("inlineCode",{parentName:"p"},"InjectModel")," to work. This helps prevents unauthorized access to other models."),Object(r.b)("p",null,Object(r.b)("strong",{parentName:"p"},"cat.module.ts")),Object(r.b)("pre",null,Object(r.b)("code",Object(o.a)({parentName:"pre"},{className:"language-typescript"}),'import { Module } from "@nestjs/common";\nimport { TypegooseModule } from "nestjs-typegoose";\nimport { Cat } from "./cat.model";\nimport { CatsController } from "./cats.controller";\nimport { CatsService } from "./cats.service";\n\n@Module({\n  imports: [TypegooseModule.forFeature([Cat])],\n  controllers: [CatsController],\n  providers: [CatsService]\n})\nexport class CatsModule {}\n')),Object(r.b)("p",null,"That's it, you have created a simple working api with ",Object(r.b)("inlineCode",{parentName:"p"},"nestjs-typegoose"),"!"))}p.isMDXComponent=!0},156:function(e,t,n){"use strict";n.d(t,"a",(function(){return b})),n.d(t,"b",(function(){return u}));var o=n(0),a=n.n(o);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,o,a=function(e,t){if(null==e)return{};var n,o,a={},r=Object.keys(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=a.a.createContext({}),p=function(e){var t=a.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i({},t,{},e)),n},b=function(e){var t=p(e.components);return a.a.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},m=Object(o.forwardRef)((function(e,t){var n=e.components,o=e.mdxType,r=e.originalType,c=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),b=p(n),m=o,u=b["".concat(c,".").concat(m)]||b[m]||d[m]||r;return n?a.a.createElement(u,i({ref:t},l,{components:n})):a.a.createElement(u,i({ref:t},l))}));function u(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=n.length,c=new Array(r);c[0]=m;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i.mdxType="string"==typeof e?e:o,c[1]=i;for(var l=2;l<r;l++)c[l]=n[l];return a.a.createElement.apply(null,c)}return a.a.createElement.apply(null,n)}m.displayName="MDXCreateElement"}}]);