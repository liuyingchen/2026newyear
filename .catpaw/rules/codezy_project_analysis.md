# Codezy 项目分析报告

## 1. 项目基本信息

- **项目名称**: 2026newyear
- **项目类型**: 前端
- **项目语言**: HTML/JavaScript/CSS
- **项目框架**: 原生JavaScript（无框架依赖）
- **项目描述**: 一个基于马年主题的新年祝福卡片生成H5应用，包含视频播放和随机祝福卡片生成功能

## 2. 业务依赖及作用

**说明**: 项目未使用package.json文件，无业务依赖

本项目采用纯原生开发，未引入任何第三方库或框架，所有功能均通过原生JavaScript实现。

## 3. Node.js版本要求

**说明**: 项目未配置Node.js版本要求

项目为纯前端静态应用，不需要Node.js环境运行。

## 4. 启动、构建等命令

**说明**: 项目未配置scripts命令

由于项目为静态HTML应用，无需构建或启动命令，直接在浏览器中打开index.html即可访问。

## 5. 目录树及对应文件描述

```
2026newyear/
├── .catpaw/
│   └── mcp.json                      # Catpaw编辑器配置文件
├── .git/                             # Git版本控制目录
├── .vscode/
│   └── settings.json                 # VS Code编辑器配置
├── images/                           # 卡片图片资源目录
│   ├── .gitkeep
│   ├── README.md                     # 图片资源说明文档
│   ├── card-1.jpg                    # 马到成功主题卡片
│   ├── card-2.jpg                    # 龙马精神主题卡片
│   ├── card-3.jpg                    # 金马报喜主题卡片
│   ├── card-4.jpg                    # 马年大吉主题卡片
│   └── card-5.jpg                    # 福马迎春主题卡片
├── js/                               # JavaScript脚本目录
│   └── main.js                       # 主逻辑文件，包含视频播放、卡片生成等功能
├── styles/                           # 样式文件目录
│   └── main.css                      # 主样式文件，包含响应式设计和动画
├── videos/                           # 视频资源目录
│   ├── .gitkeep
│   ├── README.md                     # 视频资源说明文档
│   └── horse-year-intro.mp4          # 马年串词视频
├── .gitignore                        # Git忽略文件配置
└── index.html                        # 应用入口HTML文件
```

### 主要目录说明
- **images**: 存放5张马年主题祝福卡片图片（800x1067像素）
- **js**: 存放JavaScript主逻辑代码
- **styles**: 存放CSS样式文件
- **videos**: 存放马年串词视频文件（horse-year-intro.mp4）

### 主要文件说明
- **index.html**: 应用主页面，包含视频容器、生成按钮、卡片弹窗等UI元素
- **js/main.js**: 核心业务逻辑，包括视频播放控制、卡片随机生成、图片保存和分享功能
- **styles/main.css**: 完整样式系统，包含CSS变量、响应式设计、动画效果

## 6. 常量及说明

### JavaScript常量
- **cardTemplates** (js/main.js:2-33): 包含5张马年祝福卡片模板的数组，每张卡片包含id、image、title和message四个属性

### CSS常量
- **--primary-color** (styles/main.css:3): 主色调 #c41e3a（中国红）
- **--secondary-color** (styles/main.css:4): 次要色调 #ffd700（金色）
- **--accent-color** (styles/main.css:5): 强调色 #8b4513（棕色）
- **--dark-color** (styles/main.css:6): 深色 #2c1810
- **--light-color** (styles/main.css:7): 浅色 #fff5e6
- **--transition-base** (styles/main.css:21): 基础过渡效果 all 0.3s cubic-bezier(0.4, 0, 0.2, 1)

## 7. 公共方法及说明

### 视频播放功能
- **initVideoPlayer** (
js/main.js:51-75): 初始化视频播放器，监听播放、暂停和结束事件
  - 参数: 无
  - 返回值: void
  - 说明: 设置视频播放相关的事件监听器，控制播放覆盖层的显示隐藏

- **playVideo** (js/main.js:77-109): 播放视频
  - 参数: 无
  - 返回值: void
  - 说明: 检查视频状态并尝试播放，处理各种播放错误情况

- **showGenerateButton** (js/main.js:111-120): 显示生成卡片按钮
  - 参数: 无
  - 返回值: void
  - 说明: 延迟显示生成按钮并添加滑入动画效果

### 卡片生成功能
- **generateRandomCard** (js/main.js:123-128): 随机生成卡片
  - 参数: 无
  - 返回值: object
  - 说明: 从cardTemplates数组中随机选择一张卡片

- **displayCard** (js/main.js:130-138): 显示卡片
  - 参数: card: object
  - 返回值: void
  - 说明: 将卡片内容渲染到页面显示区域

- **showCardModal** (js/main.js:155-171): 显示卡片弹窗
  - 参数: 无
  - 返回值: Promise
  - 说明: 显示加载动画，生成随机卡片后显示弹窗

- **hideCardModal** (js/main.js:173-175): 隐藏卡片弹窗
  - 参数: 无
  - 返回值: void
  - 说明: 隐藏卡片显示弹窗

- **regenerateCard** (js/main.js:177-189): 重新生成卡片
  - 参数: 无
  - 返回值: Promise
  - 说明: 重新生成随机卡片并显示

### 卡片保存功能
- **saveCard** (js/main.js:192-254): 保存卡片为图片
  - 参数: 无
  - 返回值: void
  - 说明: 使用Canvas绘制卡片并导出为PNG图片下载

### 卡片分享功能
- **shareCard** (js/main.js:257-275): 分享卡片
  - 参数: 无
  - 返回值: void
  - 说明: 使用Web Share API分享卡片，不支持则使用降级方案

- **fallbackShare** (js/main.js:277-291): 降级分享方案
  - 参数: 无
  - 返回值: void
  - 说明: 复制分享内容到剪贴板或使用alert提示

### 提示框功能
- **showToast** (js/main.js:294-321): 显示提示信息
  - 参数: message: string
  - 返回值: void
  - 说明: 显示临时提示信息，2秒后自动消失

### 事件监听功能
- **initEventListeners** (js/main.js:324-352): 初始化事件监听
  - 参数: 无
  - 返回值: void
  - 说明: 设置所有按钮和交互元素的事件监听器

### 初始化功能
- **init** (js/main.js:355-380): 应用初始化
  - 参数: 无
  - 返回值: void
  - 说明: 初始化视频播放器、事件监听器，预加载图片资源

- **handleImageError** (js/main.js:141-153): 图片加载错误处理
  - 参数: img: HTMLImageElement
  - 返回值: void
  - 说明: 图片加载失败时使用SVG占位图替代

## 8. 项目总结

这是一个马年主题的H5祝福卡片生成应用，采用纯原生JavaScript开发，无需依赖任何第三方框架。项目核心功能包括视频开场播放、随机祝福卡片生成、卡片图片保存和分享，适配移动端和PC端浏览，使用CSS变量实现主题统一，响应式设计确保多设备兼容性。整体架构简洁清晰，适合作为节日营销或祝福场景的快速实现方案。

