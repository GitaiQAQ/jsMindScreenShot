
将jsMind的类似markdown语法的描述文件转为jsMind支持的jsonMind数据格式，并基于 phantomjs进行截图保存

![示例](https://raw.github.com/hpf1908/jsMindScreenShot/master/test/test.png)

依赖项：

phantomjs: http://phantomjs.org/
jsMind   : https://github.com/hpf1908/jsMind

使用方法：

1. 安装phantomjs并设置为全局命令
2. 下载jsMind放到jsMindScreenShot目录下
3. npm install line-reader
4. npm install commander

命令行参数: node jsMindScreenShot -i ./jsMindScreenShot/test/test.md -o ./jsMindScreenShot/test/test.png

@todo:

1. jsMind的页面读取指定的文件temp.json作为渲染数据
2. 解析描述文件为自定义的json保存在第一步指定的位置并命名
3. 生成即时的phantomjs渲染脚本
4. 调用渲染脚本生成图片

 
