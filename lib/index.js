
var markdownParser = require('./markdownParser');
var program  = require('commander');
var config   = require('./config');
var Template = require('./tmpl'); 
var fs       = require('fs');
var path     = require('path');

program
  .version('0.0.1')
  .option('-u, --url', 'jsMind page location')
  .option('-i, --input  [filename]', 'input jsMind markdown')
  .option('-o, --output [filename]', 'output png path')
  .parse(process.argv);

var checkParams = function() {

    if(!program.input) {
        console.log('require input jsMind markdown');
        return false;
    }

    if(!program.output) {
        console.log('require output png path');
        return false;
    }

    return true;
}

var initialConfig = function() {
    config.url    = program.url ? program.url : config.url;
    config.input  = program.input;
    config.output = program.output;
}

var getTempJsCode = function() {
    var file = config.tempJs;
    return fs.readFileSync(file).toString();
}

var replaceTempJsCode = function(jsonStr) {
    var file = config.tempJsData;
    fs.writeFileSync(file,jsonStr);
}

var getExportSize = function(fileName , callback) {
  var exec = require('child_process').exec,
          child;

  var startPath = process.cwd();
  var execfile  = config.rasterizeSize;
  var renderUrl = config.url;
  var filePath  = path.resolve(startPath, fileName);
  var execCmd   = 'phantomjs ' + execfile + ' ' + renderUrl + ' ' + filePath;

  child = exec(execCmd ,
    function (error, stdout, stderr) {

      if (error !== null) {
        console.log('exec error: ' + error);
        callback(error);
      } else {
        var arr = stdout.split(' ');
        var width = arr[0].trim(), height = arr[1].trim();
        callback(null , width, height);
      }
  }); 
}

var generateRasterJs = function(width,height) {
  var file = config.rasterizeTmpl;
  var tempCode = fs.readFileSync(file).toString();
  var code = Template.parse(tempCode , {
    width:width,
    height:height
  });

  fs.writeFileSync(config.rasterJs, code);
}

var exportToPng = function(fileName) {

  getExportSize(fileName , function(error, width , height) {

    if(error == null) {

      //生成渲染脚本
      generateRasterJs(width , height);

      var exec = require('child_process').exec,
            child;

      var startPath = process.cwd();
      var execfile  = config.rasterJs;
      var renderUrl = config.url;
      var filePath  = path.resolve(startPath, fileName);
      var execCmd   = 'phantomjs ' + execfile + ' ' + renderUrl + ' ' + filePath;

      child = exec(execCmd ,
        function (error, stdout, stderr) {

          if (error !== null) {
            console.log('exec error: ' + error);
          } else {
            console.log('success export png');
          }
      });
    }
  });
     
}

if(checkParams(program)) {

    //初始化配置参数
    initialConfig();
    //解析json文件
    markdownParser.parse(config.input , function(jsonStr) {

      var tempCode = getTempJsCode();
      var code = Template.parse(tempCode , {
        jsonStr:jsonStr
      });

      replaceTempJsCode(code);
      exportToPng(config.output);
    });

} else {
    process.exit(0);
}