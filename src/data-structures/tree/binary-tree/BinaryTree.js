const BinaryTreeNode = require('./BinaryTreeNode');
const Queue = require('../../queue/Queue');
class BinaryTree {
  constructor() {
    this.root = null;
  }

  /**
   * True if supplied node is leaf node.
   * @param {*} node
   */
  static isLeaf(node) {
    return !!node && node.left === null && node.right === null;
  }

  /**
   * Tells whether both nodes are mirror of each other or not.
   * @param {*} rootA
   * @param {*} rootB
   */
  static isMirror(rootA, rootB) {
    if (rootA === null && rootB === null) {
      return true;
    }
    if (rootA === null || rootB === null) {
      // one of the root is null
      return false;
    }
    if (rootA.value === rootB.value) {
      return true;
    }
    return (
      BinaryTree.isMirror(rootA.left, rootB.right) &&
      BinaryTree.isMirror(rootA.right, rootB.left)
    );
  }

  /**
   *
   * @param {*} root
   */
  static isSymmetric(root) {
    if (root === null || BinaryTree.isLeaf(root)) {
      return true;
    }
    return BinaryTree.isMirror(root, root);
  }

  /**
   * Size of a tree is the number of elements present in the tree.
   *@return {number} number of nodes in tree.
   */
  size(node = this.root) {
    if (node === null) {
      return 0;
    }
    return this.size(node.left) + 1 + this.size(node.right);
  }

  /**
   * Height of the tree.
   */
  height() {
    return this.root !== null ? this.root.height : 0;
  }

  static isLeafNode(node) {
    return !!node && !node.left && !node.right;
  }

  /**
   * Traverse a tree in Level order that is BFS.
   * @return {Array}
   */
  traverseInLevelOrder() {
    if (this.root === null) {
      return [];
    }
    const array = [];
    const queue = new Queue();
    queue.enqueue(this.root);
    while (!queue.isEmpty()) {
      const node = queue.dequeue();
      array.push(node.value);
      if (node.left !== null) {
        queue.enqueue(node.left);
      }
      if (node.right !== null) {
        queue.enqueue(node.right);
      }
    }
    return array;
  }

  /**
   * Insert the value into the binary tree at first position available in level order.
   * https://www.geeksforgeeks.org/insertion-binary-tree/
   */
  insertInLevelOrder(value) {
    const node = new BinaryTreeNode(value);
    if (this.root === null) {
      this.root = node;
      return this;
    }
    const queue = new Queue();
    queue.enqueue(this.root);
    while (!queue.isEmpty()) {
      const _node = queue.dequeue();
      if (_node.left === null) {
        _node.setLeft(node);
        break;
      }
      queue.enqueue(_node.left);
      if (_node.right === null) {
        _node.setRight(node);
        break;
      }
      queue.enqueue(_node.right);
    }
    return this;
  }

  /**
   *
   *
   * @returns {Array}
   */
  traverseInOrder() {
    return this.root ? this.root.traverseInOrder() : [];
  }

  /**
   *
   *
   * @returns {Array}
   */
  traversePreOrder() {
    return this.root ? this.root.traversePreOrder() : [];
  }

  /**
   *
   *
   * @returns {Array}
   */
  traversePostOrder() {
    return this.root ? this.root.traversePostOrder() : [];
  }
}

module.exports = BinaryTree;
