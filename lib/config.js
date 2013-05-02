var path     = require('path');

//返回相关的配置参数
module.exports = {
    url           : path.resolve(__dirname,'../jsMind/render/index.html'),
    tempJsData    : path.resolve(__dirname,'../jsMind/render/temp.js'),
    tempJs        : path.resolve(__dirname,'./data/temp.js'),
    rasterJs      : path.resolve(__dirname,'./data/rasterize.js'),
    rasterizeSize : path.resolve(__dirname,'./data/rasterizeSize.js'),
    rasterizeTmpl : path.resolve(__dirname,'./data/rasterizeTmpl.js'),
    input         : '',
    output        : ''
}