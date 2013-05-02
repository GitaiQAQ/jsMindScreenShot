var lineReader = require('line-reader');
var path = require('path');

var Status = {
    begin             : 0,
    didFindTopic      : 1,
    didFindLeftSplit  : 2,
    didFindRightSplit : 3,
    didFindEndLine    : 4  
}

var DirectionEnum = {
    none  : -1,
    left  : 0,
    right : 1
}

var findTopicTitle = function(str) {

    if(str.charAt(0) === '#') {
        return {
            index : 0 ,
            title : str.slice(1)
        }
    } else {
        return false;
    }
}

var findSplitLine = function(str) {

    return str.indexOf('-----') > -1;
}

var findNodeTitle = function(str) {

    var index = str.indexOf('- ');

    if(index >= 0) {
        return {
            index  : index,
            title  : str.slice(index + 2)
        }
    } else {
        return false;
    }
}

var findNodeFromStack = function(index , stack) {

    for (var i = stack.length - 1; i >= 0; i--) {
        var nodeInfo = stack[i];

        if(nodeInfo.index < index) {
            return nodeInfo.node;
        } else {
            stack.splice(i , 1);
        }
    }

    return null;
}

exports.parse = function(fileName , callback) {
    
    var startPath = process.cwd();
    var filePath = path.resolve(startPath, fileName);
    var status = Status.begin;
    var nodeStack = [];
    var nodes = [];
    var rootNode = null;
    var idIncrement = -1;

    lineReader.eachLine(filePath, function(line, last) {

        switch(status) {
            case Status.begin          : {

                var rel = findTopicTitle(line);

                if(rel) {

                    rootNode = {
                        id          : ++idIncrement,
                        title       : rel.title,
                        direction   : DirectionEnum.none,
                        parent      : null,
                        isRootChild : false,
                        isRoot      : true
                    }
                    nodes.push(rootNode);
                    status = Status.didFindTopic;
                }
            } break;
            case Status.didFindTopic      : {

                var rel = findSplitLine(line);

                if(rel) {
                    status = Status.didFindLeftSplit;
                }

            } break;
            case Status.didFindLeftSplit  : {

                var rel = findNodeTitle(line);

                if(findSplitLine(line)) {
                    status = Status.didFindRightSplit;
                    nodeStack = [];
                } else if(rel) {

                    var lastParentNode = findNodeFromStack(rel.index , nodeStack);
                    var node = null;

                    if(lastParentNode) {
                        node = {
                            id          : ++idIncrement,
                            title       : rel.title,
                            direction   : DirectionEnum.left,
                            parent      : lastParentNode.id,
                            isRootChild : false
                        }
                    } else {
                        node = {
                            id          : ++idIncrement,
                            title       : rel.title,
                            direction   : DirectionEnum.left,
                            parent      : rootNode.id,
                            isRootChild : true
                        }
                    }

                    nodeStack.push({
                        index : rel.index,
                        node  : node
                    });
                    nodes.push(node);
                }

            } break;
            case Status.didFindRightSplit : {

                var rel = findNodeTitle(line);

                if(findSplitLine(line)) {
                    status = Status.didFindEndLine;
                    nodeStack = [];
                } else if(rel) {

                    var lastParentNode = findNodeFromStack(rel.index , nodeStack);
                    var node = null;

                    if(lastParentNode) {
                        node = {
                            id          : ++idIncrement,
                            title       : rel.title,
                            direction   : DirectionEnum.right,
                            parent      : lastParentNode.id,
                            isRootChild : false
                        }
                    } else {
                        node = {
                            id          : ++idIncrement,
                            title       : rel.title,
                            direction   : DirectionEnum.right,
                            parent      : rootNode.id,
                            isRootChild : true
                        }
                    }

                    nodeStack.push({
                        index : rel.index,
                        node  : node
                    });
                    nodes.push(node);
                }
            } break;
            case Status.didFindEndLine  : {
                // console.log('end');
            } break;
        }

    }).then(function () {
        callback && callback(JSON.stringify(nodes));
    });
}