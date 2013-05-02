
将jsMind的类似markdown语法的描述文件转为jsMind支持的jsonMind数据格式，并基于 phantomjs进行截图保存

    #前端工程师

    --------------------------

    - 安全
      - csrf,xss
      - sandbox
    - 前沿技术社区
      - jsConf
      - qcon、velocity
      - D2
    - 移动终端
    - 开发流程、部署
    - 前端框架库
      - jQuery
      - YUI
      - Kissy
      - seajs
    - 浏览器兼容性

    --------------------------

    - 切页面
      - html
      - css
      - photoShop
    - 编程语言
    - 调试工具
    - 开发工具

![示例](https://raw.github.com/hpf1908/jsMindScreenShot/master/test/test.png)

依赖项：

1. phantomjs: http://phantomjs.org/
2. jsMind   : https://github.com/hpf1908/jsMind

使用方法：

1. 安装phantomjs并设置为全局命令
2. 下载jsMind放到jsMindScreenShot目录下
3. npm install line-reader
4. npm install commander

命令行参数: node jsMindScreenShot -i ./jsMindScreenShot/test/test.md -o ./jsMindScreenShot/test/test.png

 
