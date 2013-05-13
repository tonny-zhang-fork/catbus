function Node() {
    this.tagName = null;
    this.attrs = {};
    this.selfClose = false;
    this.index = 0;
    this.lastIndex = 0;
    this.innerHTML = '';
    this.childNodes = [];
    this.parentNode = null;
}

Node.prototype.hasAttribute = function(name){
    return this.attrs.hasOwnProperty(name);
};
Node.prototype.setAttribute = function(name, value){
    this.attrs[name] = value;
};
Node.prototype.getAttribute = function(name){
    return this.hasAttribute(name) ? this.attrs[name] : null;
};
Node.prototype.removeAttribute = function(name){
    this.attrs[name] = null;
    delete this.attrs[name];
};
Node.prototype.attributes = function(){
    var a = [];
    for(var k in this.attrs){
        if(this.attrs.hasOwnProperty(k)){
            a.push(k);
        }
    }
    return a;
};
Node.prototype.appendChild = function(node){
    if(!(node instanceof Node)){throw new TypeError("required Node object.");}
    node.parentNode = this;
    this.childNodes.push(node);
};

Node.prototype.getElementsByTagName = function(tagName) {
    var elements = [];
    var nodeList = iteration(this);
    console.log('getElementsByTagName');
    console.log('tagName: ' + tagName)
    console.log('nodeList: ' + nodeList)
    console.log('nodeList length: ' + nodeList.length)

    for (var i = 0; i < nodeList.length; i++) {
        // console.log('node tagName: ' + nodeList[i].tagName)
        if (nodeList[i].tagName === tagName) {
            elements.push(nodeList[i]);
        }
    }
    return elements;
}

Node.prototype.getElementById = function(id) {
    var elements = [];
    var nodeList = iteration(this);
    console.log('getElementById');
    console.log('nodeList length: ' + nodeList.length)

    for (var i = 0; i < nodeList.length; i++) {
        // console.log('node id: ' + nodeList[i].getAttribute('id'))
        if (nodeList[i].getAttribute('id') && 
                nodeList[i].getAttribute('id') === id) {
            elements.push(nodeList[i]);
        }
    }
    return elements;
}

Node.prototype.getElementsByClassName = function(className) {
    var elements = [];
    var nodeList = iteration(this);
    console.log('getElementsByClassName');
    console.log('nodeList length: ' + nodeList.length)

    for (var i = 0; i < nodeList.length; i++) {
        // console.log(nodeList[i])
        // console.log('node class: ' + nodeList[i].getAttribute('class'))
        if (nodeList[i].getAttribute('class') && 
                nodeList[i].getAttribute('class').indexOf(className) > -1) {
            elements.push(nodeList[i]);
        }
    }
    return elements;
}

function iteration(node) {
    var nodeList = [];
    nodeList.push(node);

    for (var i = 0; i < node.childNodes.length; i++) {
        // console.log('iteration, length: ' + node.childNodes.length)
        nodeList = nodeList.concat(iteration(node.childNodes[i]))
    }
    return nodeList;
}

exports.htmlnode = Node;