//8:24PM

class bulkDataStructure {
  constructor() {
    this.bulkDataMap = new Map(); // contains [node, [children , percentage relationship]]
    this.nodeChildPercentRelationship = new Map();
    this.currentNode = "";
  }

  /**
   * Insert the data in to the map to create relations/hierarchy of constituents
   * {
   *    nodeChildPercentRelationship = node => { { node: name, traversed: boolean, children: Map([...]) } }
   * }
   * @param {*} data - row data: main, child, percent
   *
   */

  parseFileToBranchStructure(data) {
    let node = data.main;
    if (this.nodeChildPercentRelationship.has(node)) {
      return null;
    }

    if (data.child === "results") {
      this.currentNode = "";
      return null;
    }

    const child = data.child;
    const percent = data.percent;
    let currentNode = this.nodeChildPercentRelationship.get(this.currentNode);

    // data.main.length > 0 case is when first encountering the node
    if (data.main.length > 0) {
      this.currentNode = node;
      // nodeObject = { node: data.main, traversed: false, children: new Map() };
      currentNode = new Node(node);
    }
    const childNode = new Node(child, currentNode, percent);

    currentNode.children.set(child, childNode);
    this.nodeChildPercentRelationship.set(this.currentNode, currentNode);
  }

  /**
   *  Do a BFS that recurses into each child node
   *
   *  nodes are in the format
   *
   */

  doBFS(node, nodeClass, parent) {
    if (nodeClass.traversed) {
      return null;
    }

    nodeClass.children.forEach((childNode, child) => {
      if (this.nodeChildPercentRelationship.has(child)) {
        // checks the top level to determine if the child is has children
        const childNodeClass = this.nodeChildPercentRelationship.get(child); // gets the class of the child to recurse into
        const recursedNodeClass = this.doBFS(child, childNodeClass, node);
        nodeClass.children.set(child, recursedNodeClass);
        nodeClass.predecessor = parent;
        nodeClass.percentToParent = childNode.percentToParent;
        this.nodeChildPercentRelationship.set(node, nodeClass);
      } else {
        return null;
      }
    });
    nodeClass.predecessor = parent;
    return nodeClass;
  }

  combineBranchesToFormTreeStructure() {
    /* 
     the current structure of this.nodeChildPercentRelationship is unconnected nodes. Perform BFS to traverse the children of the nodes, and then search if a child is present as a node. If the child is a node, recurse into the child until the child is has no children (leaf node).  
    */

    // check if the node has been traversed

    this.nodeChildPercentRelationship.forEach((nodeClass, node) => {
      this.doBFS(node, nodeClass);
    });
  }

  /**
   *
   * @param {array} array with the form [name, constituent, percentage]
   */
  addToNodeAndTreeMap(array) {
    const item = array[0];
    const dependents = array[1];

    if (!bulkDataMap.has(array[0])) {
      bulkDataMap.set();
    }
  }
}

class Node {
  constructor(node, predecessor = null, percent = null) {
    this.node = node;
    this.traversed = false;
    this.predecessor = predecessor;
    this.children = new Map();
    this.percentToParent = percent;
  }
}

module.exports = bulkDataStructure;

/* 



const node = array[0];

    // check if node exists in the bulkDataMap, if it does, exit

    if (bulkDataMap.has(node)) return null;

    const child = array[1];
    const percentage = array[2];

    if (children === "results") {
      // termination condition is if array[1] === "results"
      // add mini tree into bulkDataMap
      bulkDataMap.set(node, nodeChildRelationship);
    } else {
      if (!node.isEmpty()) {
        nodeChildRelationship[0] = node;
      }
      nodeChildRelationship[1].set(child, percentage);
    }
    
    */
