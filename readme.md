
将jsMind的类似markdown语法的描述文件转为jsMind支持的jsonMind数据格式，并基于 phantomjs进行截图保存

@todo:

1. jsMind的页面读取指定的文件temp.json作为渲染数据
2. 解析描述文件为自定义的json保存在第一步指定的位置并命名
3. 生成即时的phantomjs渲染脚本
4. 调用渲染脚本生成图片

命令行参数: node jsMindScreenShot -i ./jsMindScreenShot/test/test.md -o ./jsMindScreenShot/test/test.png 

deps:phantomjs、jsMind