## 配置环境、搭建脚手架
### 1. 安装nvm
```
https://nvm.uihtm.com/
```
nvm一个nodejs版本管理工具！
安装nvm前需要卸载原有的node

### 2. 通过nvm安装node.js,node版本需要14以上
查看当前node版本
```
node -v
```


```
nvm install + 需要安装的node版本	
```
查看已经安装的node
```
nvm ls
```
切换到16版本的node(数字为版本号)			
```
nvm use 16
```			

### 3. 通过nvm安装@vue/cil ,vue3最低需要5.0以上的版本
查看@vue/cil 版本
```
vue -v
```
安装最新@vue/cil					
```
nvm install @vue/cli@latest
```
卸载@vue/cil
```
nvm uninstall vue-cli -g
```  		

### 4. 环境配置完毕,开始搭建vue3 + vite脚手架
搭建vue3 + vite脚手架
```
npm create vue@latest
```

Project name : [输入项目名称]

余下内容按需选择 Yes or No

本项目统一选No

### 5. 下载模块
```
cd + 项目文件
```
安装所需要的依赖
```
npm install
```	

### 6. 运行脚手架
运行
```
npm run dev
```
如果需要局域网访问项目,打开vite.config.js,引入
```server:{
    host: '你当前的局域网IP',
  },
```
